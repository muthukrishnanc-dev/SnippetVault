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

30/08/26

what i built : add from and submit logic for add snippet
error: first is setSnippet({}) not using curly brace inside state
"Content-Type" instead of this i using this Content:Type"
Tomorrow: add search handle and logic if i had time add edit logic as well

31/08/26 :

what i built : add search and edit
error: 1.const data = await res.json();
      setSnippets(data.snippet);
      here data return object so i store in setState as data it gives error because object cannot map so i figured in backend it return as object so i destucture as data.snippet

      2.for edit i use boolean so it false all snippet so i added id based conditional rendering