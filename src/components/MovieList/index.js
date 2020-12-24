import React, { memo, useCallback, useState } from "react";
import MovieChip from "./MovieChip";
import DeleteCard from "./DeleteCard";
import AddEditMovie from "../Header/AddEditMovie";
import { Icon, Modal } from "../../Core-UI";
import "./styles.scss";

function MovieList(props){
    const { data } = props;
    const [delInd, setDelInd] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    const [editInd, setEditInd] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const deleteMovie = (i) => {
        setDelInd(i);
        setIsDelete(true);
    }

    const editMovie = (i) => {
        setEditInd(i);
        setIsEdit(true);
    }

    const onCloseDelete = useCallback(()=>{
        setDelInd("");
        setIsDelete(false);
    },[setDelInd, setIsDelete])

    const onCloseEdit = useCallback(()=>{
        setEditInd("");
        setIsEdit(false);
    },[setEditInd, setIsEdit])

    const onDelete = useCallback(async()=>{
        const token = localStorage.getItem('token');
        const options = {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: data[delInd]._id
            })
        }
        try {
            const res = await fetch(`/movies/delete`, options);
            if(res.ok){
                const data = await res.json();
                console.log(data);
                setIsDelete(false);
                setDelInd("")
            } else {
                alert("Error")
            }
        } catch(e){
            console.log(e)
        }
    },[data, delInd])

    const onEdit = useCallback(async(editData)=>{
        const token = localStorage.getItem('token');
        const options = {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                id: data[editInd]._id,
                data: editData
            })
        }
        try {
            const res = await fetch(`/movies/update`, options);
            if(res.ok){
                const output = await res.json();
                console.log(output);
                setIsEdit(false);
                setEditInd("")
            } else {
                alert("Error")
            }
        } catch(e){
            console.log(e)
        }
    },[data, editInd])

    return(
        <div className="movie-list">
            <div className="movie-chips">
                <MovieChip data={data}/>
            </div>
            <div className="movie-cards">
            {
                data.map((d, i) => {
                    return (
                        <div key={i} className="box">
                        <div className="strip">
                            {Array(16)
                            .fill(0)
                            .map((d, i) => {
                                return <div key={i} className="strib-box"></div>;
                            })}
                        </div>
                        <div className="content">
                            <div className="movie-title-wrapper">
                                <div className="movie-title">{d.name}</div>
                                <div className="movie-actions">
                                    <div onClick={() => editMovie(i)}>
                                        <Icon icon="ICON_EDIT" className="movie-action-icon" />
                                    </div>
                                    <div onClick={() => deleteMovie(i)}>
                                        <Icon icon="ICON_DELETE" className="movie-action-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="rating-info">
                            <div className="background-bar">
                                <div
                                className="bar-fill"
                                style={{ width: `${d.imdb_score * 10}%` }}
                                ></div>
                            </div>
                            <div className="rating">{`${d.imdb_score} / 10`}</div>
                            </div>
                            <div className="direction">{`Directed By:- ${d.director}`}</div>
                            <div className="genre nice-scroll">
                            {d.genre.map((item, i) => {
                                return (
                                <div className="genre-chip" key={i}>
                                    {item}
                                </div>
                                );
                            })}
                            </div>
                        </div>
                        <div className="strip">
                            {Array(16)
                            .fill(0)
                            .map((d, i) => {
                                return <div key={i} className="strib-box"></div>;
                            })}
                        </div>
                        </div>
                    );
                })
            }
            </div>
            {
                isDelete && <DeleteCard isDelete={isDelete} onClose={onCloseDelete} onDelete={onDelete}/>
            }
            {
                isEdit && <AddEditMovie isEdit={isEdit} onClick={onCloseEdit} onEdit={onEdit} editData={data[editInd]}/>
            }
        </div>
    )
}

export default memo(MovieList)