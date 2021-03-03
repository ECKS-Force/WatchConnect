import React, { useState } from 'react';

const AddShowModal = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchCache, setSearchCache] = useState({});
  const [options, setOptions] = useState([]);
  const [errMessage, setErrMessage] = useState('');

  const updateResults = (e) => {
    const inputVal = e.target.value;
    setSearchInput(inputVal);

    if (!inputVal.length) return;
    if (searchCache[inputVal]) {
      setOptions(searchCache[inputVal]);
    } else {
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=7aa2b16005c07560a7d963bc9f6982dc&language=en-US&include_adult=false&query=${e.target.value}`)
        .then(res => res.json())
        .then(res => {
          const showOptions = res.results.slice(0, 8);
          setOptions(showOptions);
          
          setSearchCache({
            ...searchCache,
            [inputVal]: showOptions
          });
        });
    }
  };

  const addShow = (e) => {
    e.preventDefault();

    const selectedOption = shows.options.namedItem(searchInput);
    if (selectedOption === null) {
      setErrMessage('Show not found. Please try again.');
      return;
    }

    const showId = selectedOption.dataset.id;
    // add movie to queue
    // close modal
  };

  return <div className="modal">
    <form onSubmit={addShow}>
      <input
        list="shows"
        placeholder="Enter show name"
        autoFocus
        onChange={updateResults}
      />
      <datalist id="shows">
        {options.map(option => {
          return <option
            value={option.name}
            name={option.name}
            data-id={option.id}
          />;
        })}
      </datalist>
      <input type="submit" value="Add Show" />
      {errMessage.length > 0 && <div>{errMessage}</div>}
    </form>
  </div>
};

export default AddShowModal;