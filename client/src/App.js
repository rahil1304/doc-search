import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState(null);

  const [inputText, setInputText] = useState("");
  let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  let handleSetData = (newData) => {
    setData(data.concat(newData));
  };

  let handleKeyword = (newKeyword) => {
    newKeyword = newKeyword.slice(1, newKeyword.length);
    setKeyword(newKeyword);
  };

  let searchForWord = () => {
    handleSetData([]);
    console.log("SW", data.length);
    console.log("INPUT TEXT", inputText);
    callBackendAPI(inputText)
      .then((res) => {
        let searchLinks = res.searchResults.organic_results;
        console.log(searchLinks);
        handleSetData(searchLinks);
        handleKeyword(res.searchResults.search_parameters.q);
      })
      .catch((err) => console.log(err));
  };

  // fetching the GET route from the Express server which matches the GET route from server.js
  async function callBackendAPI(searchWord) {
    const response = await fetch("/search/:" + searchWord);
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  return (
    <div className="main">
      <header className="App-header">
        <h1 className="App-title">Welcome to DocSearch</h1>
      </header>
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Enter word"
        />
        <button onClick={searchForWord}>Search</button>
      </div>
      {keyword && (
        <h2 className="App-title">Displaying results for {keyword} </h2>
      )}
      {console.log(inputText)}
      {data && console.log("UPDATED data", data)}
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          return (
            // <p className="App-intro" key={item.position}>
            //   {item.title}
            // </p>

            <div key={index}>
              <a href={item.link} key={index} target="_blank">
                {item.title}
              </a>
            </div>
          );
        })}
    </div>
  );
}

export default App;
