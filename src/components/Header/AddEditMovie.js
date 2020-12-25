import React, { memo, useCallback, useState } from 'react';
import { Button, Modal } from "../../Core-UI";
import "./styles.scss";

function AddEditMovie(props){
    const { isAdd, isEdit, onClose, addMovie, onEdit, editData } = props;

    const [ name, setName] = useState(editData ? editData.name : "");
    const [ imdb, setImdb] = useState(editData ? editData.imdb_score : "");
    const [ genre, setGenre] = useState("");
    const [ director, setDirector] = useState(editData ? editData.director : "");
    const [ popularity, setPopularity] = useState(editData ? editData.popularity : "");

    const [genreList, setGenreList] = useState(editData ? editData.genre : []);

    const handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            const newGenre = [...genreList, genre];
            setGenreList(newGenre)
            setGenre("");
        }
    }

    const removeGenre = (i) => {
        const newGenre = [...genreList];
        newGenre.splice(i,1);
        setGenreList(newGenre)
    }

    const addNewMovie = useCallback(()=>{
        if(name && imdb && genreList.length > 0 && director && popularity){
            addMovie({
                name,
                imdb_score: +imdb,
                genre: genreList,
                director,
                popularity: +popularity
            })
        } else {
            alert("All Fields are required");
        }
    },[addMovie, name, imdb, genreList, director, popularity])

    const editMovie = useCallback(()=>{
        if(name && imdb && genreList.length > 0 && director && popularity){
            onEdit({
                imdb_score: +imdb,
                genre: genreList,
                director,
                popularity: +popularity
            })
        } else {
            alert("All Fields are required");
        }
    },[onEdit, name, imdb, genreList, director, popularity])

    return (
        <div>
            <Modal isOpen={isAdd || isEdit} onClose={onClose}>
                    <div className="login-modal">
                        <div className="login-header">{`${isAdd ? 'Add': 'Edit'} a Movie`}</div>
                        <div className="form-label">
                            Name
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Enter movie name"
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                readOnly={isEdit ? true : false}
                            />
                        </div>
                        <div className="form-label">
                            IMDB Score
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Enter IMDB Score"
                                value={imdb}
                                onChange={(e)=> setImdb(e.target.value)}
                            />
                        </div>
                        <div className="form-label">
                            Genre
                        </div>
                        <div className="genre-wrapper">
                            {
                                genreList.map((d,i)=> {
                                    return (
                                        <div className="genre-chip-no-hover" onClick={()=> removeGenre(i)}>{d}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Type Genre and press enter"
                                value={genre}
                                onChange={(e)=> setGenre(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                        <div className="form-label">
                            Director
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Enter director name"
                                value={director}
                                onChange={(e)=> setDirector(e.target.value)}
                            />
                        </div>
                        <div className="form-label">
                            Popularity
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Enter popularity"
                                value={popularity}
                                onChange={(e)=> setPopularity(e.target.value)}
                            />
                        </div>
                        <div className="form-button">
                            <Button text={"Submit"} onClick={isEdit ? editMovie : addNewMovie}/>
                        </div>
                    </div>
                </Modal>
        </div>
    );
};

export default AddEditMovie;