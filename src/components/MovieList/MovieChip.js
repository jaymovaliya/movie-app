import React, { memo } from 'react';
import "./styles.scss";

function MovieChip(props){
    const chips = [...new Set(props.data.map(d => d.genre).flat())];
    return (
        <div className="chips">
            {
                chips.map((d,i)=>{
                    return (
                        <div className="genre-chip">{d}</div>
                    )
                })
            }
        </div>
    );
};

export default memo(MovieChip);