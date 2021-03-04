import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
      fetch(`/app/showsearch/${e.target.value}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          const showOptions = res.slice(0, 8);
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

export default Navbar;