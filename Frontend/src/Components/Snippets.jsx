import React from "react";

function Snippets({ snippets }) {
  return (
    <div className="snippet__body">
      <div className="search__snippet">
        <form>
          <input type="text" name="search" id="search" />
          <button>Search</button>
        </form>
      </div>
      <div className="all__snippets">
        {snippets.map((snippet) => (
          <div className="snippet__card" key={snippet._id}>
            <div className="snippet__list">
              <li>Keyword:{snippet.keyWord}</li>
              <li>type:{snippet.type}</li>
              <li style={{ whiteSpace: "pre-wrap" }}>
                snippet:{snippet.snippet}
              </li>
            </div>
            <div className="snippet__action">
              <button>Summarize</button>
              <button>Favorite</button>
              <button>Copy</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button>Add Snippet</button>
      </div>
    </div>
  );
}

export default Snippets;
