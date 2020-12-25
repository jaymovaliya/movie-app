import React, { memo, useCallback, useEffect, useState } from "react";
import { Icon, Button, Modal } from "../../Core-UI";
import LogIn from "./LogIn";
import AddEditMovie from "./AddEditMovie";
import { useDebounce } from "./Hooks";
import "./styles.scss";

function Header(props){
    const { loggedIn, setLoggedIn, setMovies, refetch } = props;
    const [str, setStr] = useState("");
    const debounceVal = useDebounce(str, 500);

    const [login, setLogin] = useState(false);
    const [isAdd, setIsAdd] = useState(false);

    const closeLogIn = useCallback(()=>{
        setLogin(false);
    },[])

    const closeAdd = useCallback(()=>{
        setIsAdd(false);
    },[]);

    const doLogIn = useCallback(async(username, password)=>{
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        }
        try {
            const res = await fetch(`/user/login`, options);
            if(res.ok){
                const data = await res.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', data.username);
                setLogin(false);
                setLoggedIn(true);
            } else {
                alert("Invalid credentials")
            }
        } catch(e){
            console.log(e)
        }
    },[setLoggedIn, setLogin])

    const addMovie = useCallback(async(data)=>{
        const token = localStorage.getItem('token');
        const options = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(data)
        }
        try {
            const res = await fetch(`/movies/add`, options);
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setIsAdd(false)
                refetch()
            } else {
                alert("Error")
            }
        } catch(e){
            console.log(e)
        }
    },[])

    useEffect(async()=>{
        const options = {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: str
            })
        } 
        const res = await fetch(`/movies/fetch`, options);
        if(res.ok){
            const data = await res.json();
            setMovies(data.data)
        }else{
            alert("Error");
        }
    },[debounceVal])

    const handleSearch = (value) => {
        setStr(value);
    }

    return(
        <div className="header">
            <div>Movie-App</div>
            <div className="header-search">
                <input
                    className="header-search-input"
                    type="text"
                    placeholder="Search here"
                    value={str}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Icon icon="ICON_SEARCH" className="movie-action-icon" />
            </div>
            <Button text={loggedIn ? "Add New Movie" : "Login"} onClick={()=> loggedIn ? setIsAdd(true) : setLogin(true)}/>
            {
                login && <LogIn login={login} onClose={closeLogIn} doLogIn={doLogIn}/>
            }
            {
                isAdd && <AddEditMovie isAdd={isAdd} onClose={closeAdd} addMovie={addMovie}/>
            }
        </div>
    )
}

export default memo(Header)
