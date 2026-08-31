import React, { useEffect, useState } from "react";
import "./App.css";
import Snippets from "./Components/Snippets";
function App() {
  const [snippets, setSnippets] = useState([]);
  useEffect(() => {
    async function getSnippets() {
      const snippets = await fetch("http://localhost:3000");
      const res = await snippets.json();
      console.log(res);
      setSnippets(res);
    }
    getSnippets();
  }, []);
  return (
    <div className="container">
      <Snippets snippets={snippets} setSnippets={setSnippets} />
    </div>
  );
}
export default App;
