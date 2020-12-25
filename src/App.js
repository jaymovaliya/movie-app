import React, { useCallback, useEffect, useState } from "react";
import './App.scss';
import { Header, MovieList } from "./components";

let callingAPI;

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState(null);

  const handleScroll = async() =>{
    const elem = document.getElementById("main");
    const bottomListner =  elem.getBoundingClientRect().bottom;
    const compareListner = window.innerHeight;
    if(!callingAPI && movies && bottomListner < compareListner){
      if(movies.hasNextPage){
        callingAPI = true;
        const options = {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({page: movies.nextPage})
        } 
        console.log("api called...", movies.nextPage)
        const res = await fetch(`/movies/fetch`, options);
        if(res.ok){
          const data = await res.json();
          const newDocs = [...movies.docs, ...data.data.docs]
          setMovies({
            docs: newDocs,
            nextPage: data.nextPage,
            hasNextPage: data.hasNextPage
          });
          callingAPI = false;
        } else {
          alert("Error");
        } 
      }
    }
  };

  useEffect(()=>{
    console.log("attaching new listner");
    window.addEventListener('scroll', handleScroll , true);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  },[movies])

  useEffect(async()=>{
    try{
      const token = localStorage.getItem('token');
      const options = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        }
      } 
      const res = await fetch(`/movies/fetch`, options);
      if(res.ok){
        const data = await res.json();
        setMovies(data.data);
      }
      if(token){
        setLoggedIn(true);
      }
    } catch(e){
      alert("error")
    }
  },[])

  const refetch = async () => {
    try {
        const options = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            }
        } 
        const res = await fetch(`/movies/fetch`, options);
        if(res.ok){
            const data = await res.json();
            setMovies(data.data);
        }
    } catch(err){
        alert("Error")
    }
}

  return (
    <div className="App" id="main">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setMovies={setMovies} refetch={refetch}/>
      {
        movies && (
          <div>
            <MovieList data={movies.docs} loggedIn={loggedIn} refetch={refetch}/>
          </div>
        )
      }
    </div>
  );
}

export default App;
