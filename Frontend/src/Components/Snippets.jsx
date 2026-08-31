import React, { useState } from "react";

function Snippets({ snippets, setSnippets }) {
  const [addSnippet, setAddSnippet] = useState({
    keyword: "",
    type: "",
    snippet: "",
  });
  const [searchTxt, setSearchtxt] = useState("");
  const [startEdit, setStartEdit] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addSnippet),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/snippet?search=${searchTxt}`,
      );
      const data = await res.json();
      setSnippets(data.snippet);
      setSearchtxt("");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="snippet__body">
      <div className="search__snippet">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            id="search"
            value={searchTxt}
            onChange={(e) => setSearchtxt(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="all__snippets">
        {snippets.map((snippet) => (
          <div className="snippet__card" key={snippet._id}>
            {startEdit === snippet._id ? (
              <div>hello</div>
            ) : (
              <>
                <div className="snippet__list">
                  <li>Keyword:{snippet.keyWord}</li>
                  <li>type:{snippet.type}</li>
                  <li style={{ whiteSpace: "pre-wrap" }}>
                    snippet:{snippet.snippet}
                  </li>
                </div>
                <div className="snippet__action">
                  <button onClick={() => setStartEdit(snippet._id)}>
                    Edit
                  </button>
                  <button>Summarize</button>
                  <button>Favorite</button>
                  <button>Copy</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="add__snippet">
        <form onSubmit={handleSubmit}>
          <label htmlFor="keyword">
            <input
              type="text"
              name="keyword"
              id="keyword"
              placeholder="Keyword"
              value={addSnippet.keyword}
              onChange={(e) =>
                setAddSnippet({
                  ...addSnippet,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>
          <label htmlFor="type">
            <input
              type="text"
              name="type"
              id="type"
              placeholder="Type of Snippet"
              value={addSnippet.type}
              onChange={(e) =>
                setAddSnippet({
                  ...addSnippet,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>{" "}
          <label htmlFor="snippet">
            <textarea
              type="text"
              name="snippet"
              id="snippet"
              placeholder="Place Snippet Here"
              value={addSnippet.snippet}
              onChange={(e) =>
                setAddSnippet({
                  ...addSnippet,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </label>
          <button type="submit">Load Snippet</button>
        </form>
      </div>
    </div>
  );
}

export default Snippets;
