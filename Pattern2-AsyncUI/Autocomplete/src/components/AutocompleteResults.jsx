import '../App.css';
import React from 'react';
const AutocompleteResults = ({ results, value, setValue }) => {
  // Highlight matching text
  function highlightText(text) {
    const parts = text.split(new RegExp(`(${value})`, "gi"));

    return parts.map((part, index) =>
      part.toLowerCase() === value.toLowerCase() ? (
        <strong key={index} className="part">
          {part}
        </strong>
      ) : (
        part
      ),
    );
  }
  function onListItemClick (item){
    setValue(item.title);
  }
  return (
    <ul className="autocomplete_container__list">
      {results?.map((item) => (
        <li className="autocomplete_container__list_item" onClick={()=>onListItemClick(item)}>
          {highlightText(item.title)}
        </li>
      ))}
    </ul>
  );
};
export default React.memo(AutocompleteResults);
