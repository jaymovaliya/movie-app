import React, { useEffect, useState } from "react";
import './App.scss';
import { Header, MovieList } from "./components";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState(null);

  useEffect(async()=>{
    try{
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token 
        }
      } 
      const res = await fetch(`/movies/fetch`, options);
      if(res.ok){
        const data = await res.json();
        setMovies(data.data)
      }
      if(token){
        setLoggedIn(true);
      }
    } catch(e){
      alert("error")
    }

  },[])

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      {
        movies && <MovieList data={movies}/>
      }
    </div>
  );
}

export default App;
