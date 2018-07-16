// Get the first 10 suggestions that match

const defaultSuggestionsFilter = (searchValue, suggestions) => {
  const value = searchValue.toLowerCase();
  const filteredSuggestions = suggestions.filter((suggestion) => (
    !value || suggestion.name.toLowerCase().indexOf(value) > -1
  ));
  const length = filteredSuggestions.length < 10 ? filteredSuggestions.length : 10;
  return filteredSuggestions.slice(0, length);
};

export default defaultSuggestionsFilter;
