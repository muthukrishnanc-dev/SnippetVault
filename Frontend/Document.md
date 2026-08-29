29/08/26 
what i built : create snippets componets and fetch data from backend;
error:
1. in use effect i call async directly like this 
 useEffect(async () => {
    const snippets = await fetch("http://localhost:3000");
    const res = "await" snippets.json();
    console.log(res);
  }, []); because effect return nothing or cleaup not promise
  correct version
   useEffect(() => {
    async function getSnippets() {
      const snippets = await fetch("http://localhost:3000");
      const res = await snippets.json();
      console.log(res);
    }
    getSnippets();
  }, []);
  i failed to use await in response so await important

  2. <li style={{ whiteSpace: "pre-wrap" }}>
                snippet:{snippet.snippet}
              </li> here that style is help me with format i expect to