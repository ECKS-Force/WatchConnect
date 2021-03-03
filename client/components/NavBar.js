import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchCache, setSearchCache] = useState({});
  const [options, setOptions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedOption = shows.options.namedItem(searchInput);
    if (selectedOption === null) {
      alert('Show not found. Please try again.');
      return;
    }

    const showId = selectedOption.dataset.id;
    window.location = `/shows/${showId}`;
  };

  const updateOptions = (e) => {
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

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/my-list">My Shows</Link>
        </li>
      </ul>
      {/* <form>
        <input type="text" />
        <input type="submit" value="Search" />
      </form> */}
      <form onSubmit={handleSubmit}>
        <input
          list="shows"
          placeholder="Enter show name"
          autoFocus
          onChange={updateOptions}
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
        <input type="submit" value="Search" />
      </form>
    </nav>
  );
};

export default NavBar;