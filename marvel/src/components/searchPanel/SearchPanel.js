import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import useDebounce from "../../hooks/debounce.hook";

import "./searchPanel.scss";

const SearchPanel = () => {
  const [char, setChar] = useState("");
  const [results, setResults] = useState([]);
  const [displayResults, setDisplayResults] = useState(false);

  const { loading, error, getCharacterNameStartWith } = useMarvelService();

  const debouncedData = useDebounce(char, 400);

  useEffect(() => {
    if (char === "") {
      setResults([]);
    }
    loadCharacters(debouncedData);
    // eslint-disable-next-line
  }, [debouncedData]);

  const loadCharacters = (name) => {
    if (!name) {
      return;
    }
    getCharacterNameStartWith(name).then((results) => setResults(results));
  };

  const initialName = (e) => {
    setChar(e.target.value);
  };

  const onBlur = () => {
    setTimeout(() => setDisplayResults(true), 150);
  };
  const onFocus = () => {
    setDisplayResults(false);
  };

  const renderResults = useMemo(
    () =>
      results.map(({ id, name, thumbnail }) => (
        <Link
          to={`characters/${id}`}
          key={id}
          className="search__panel-form-results-wrapper"
        >
          <img src={thumbnail} alt={name} />
          <div className="search__panel-form-results-desc">{name}</div>
        </Link>
      )),
    [results]
  );

  const noDisplay = displayResults || !char ? "none" : "block";

  return (
    <>
      <div className="search__panel">
        <label className="search__panel-label" htmlFor="charName">
          Find a character:
        </label>
        <div className="search__panel-form">
          <form>
            <input
              className="search__panel-form-input"
              value={char}
              name="charName"
              id="charName"
              type="text"
              placeholder="Type the name here..."
              autoComplete="off"
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={initialName}
            />
            {results.length === 0 ? null : (
              <div
                className="search__panel-form-results"
                style={{ animation: `fadeIn .4s`, display: noDisplay }}
              >
                {loading ? "loading..." : renderResults}
              </div>
            )}
          </form>
        </div>
        {error ? <div className="search__panel-error">Error</div> : null}
      </div>
      {displayResults ? null : <div className="findCharacter__overlay"></div>}
    </>
  );
};

export default SearchPanel;
