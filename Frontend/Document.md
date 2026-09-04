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

1/09/26
const [EditSnippet, setEditSnippet] = useState({
Edit**keyword: "",
Edit**type: "",
Edit\_\_snippet: "",
}); here create state for edit values

const handleUpdate = async (e, startEdit) => {
// dont call imeadiately first call via function call (e)=>handleupdate(e,startEdit)
try {
e.preventDefault();
const res = await fetch(`http://localhost:3000/edit/${startEdit}`, {
method: "PATCH",
<!-- i used wrong method first POST -->
headers: { "Content-Type": "application/json" },
<!--  "Content-Type: application/json" first use like this -->
body: JSON.stringify({
keyWord: EditSnippet.Edit**keyword,
type: EditSnippet.Edit**type,
snippet: EditSnippet.Edit\_\_snippet,
}),

<!-- here in a stringfy first use EditSnippet it gives error so i destructure it -->

      });
      const data = await res.json();
      console.log(data.existing_snippet);
      setSnippets((prev) =>
        prev.map((snippet) =>
          snippet._id === data.existing_snippet._id
            ? data.existing_snippet
            : snippet,
        ),
        <!-- first didn't know know how to upadte specific snippet update via map and conditional rendering -->
      );
      setStartEdit(null);
    } catch (error) {
      console.log(error.message);
    }

};
<button onClick={() => {
setStartEdit(snippet.\_id);
setEditSnippet({
Edit**keyword: snippet.keyWord,
Edit**type: snippet.type,
Edit\_\_snippet: snippet.snippet,
});
}}
to get a particular edit details use like this this gives populated edit value

2/9/26
built : add copy and delete functions and some fixed
onClick={() =>
navigator.clipboard.writeText(snippet.snippet)
}
03/9/26
built : add favoiete field in mongodb schema

04/9/26
built : favorite function completely
const handleFav = async (e, snippet) => {
e.preventDefault();
try {
const res = await fetch(`http://localhost:3000/edit/${snippet._id}`, {
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ isFavorite: !snippet.isFavorite }),
});
const data = await res.json();
setSnippets((prev) =>
prev.map((snippet) =>
snippet.\_id === data.existing_snippet.\_id
? data.existing_snippet
: snippet,
),
);
} catch (error) {
console.log(error);
}
};
const favoriteSnippets = snippets.filter((snippet) => snippet.isFavorite);
{ snippet: req.body.snippet, isFavorite: req.body.isFavorite },
