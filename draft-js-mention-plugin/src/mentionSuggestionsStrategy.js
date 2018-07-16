/* @flow */

import escapeRegExp from 'lodash.escaperegexp';
import getTypeByTrigger from './utils/getTypeByTrigger';

const findMentionEntities = (trigger, contentBlock, contentState) => {
  const mentions = [];

  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (entityKey !== null && contentState.getEntity(entityKey).getType() === getTypeByTrigger(trigger));
  }, (start, end) => {
    mentions.push({ start, end });
  });

  return mentions;
};

const findWithRegex = (regex, contentBlock, callback, mentions) => {
  // Get the text from the contentBlock
  const text = contentBlock.getText();
  let matchArr;
  let start; // eslint-disable-line
  let end;

  // Go through all matches in the text and return the indizes to the callback
  while ((matchArr = regex.exec(text)) !== null) { // eslint-disable-line
    if (matchArr.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    start = matchArr.index;
    end = start + matchArr[0].length;

    // If theorical end is inside a mention entity, change it to the entity beginning
    // Fix bug when `@` trigger is just before a mention
    for (let i = 0; i < mentions.length; ++i) {
      if (end >= mentions[i].start && end <= mentions[i].end) {
        end = mentions[i].start;
        break;
      }
    }

    callback(start, end);
  }
};

export default (trigger: string, regExp: string) => (contentBlock: Object, callback: Function, contentState: Object) => {
  const mentions = findMentionEntities(trigger, contentBlock, contentState);
  const reg = new RegExp(String.raw({
    raw: `\\s?${escapeRegExp(trigger)}${regExp}` // eslint-disable-line no-useless-escape
  }), 'g');
  findWithRegex(reg, contentBlock, callback, mentions);
};
