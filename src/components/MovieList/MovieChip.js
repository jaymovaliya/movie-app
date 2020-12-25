import React, { memo } from 'react';
import "./styles.scss";

function MovieChip(props){
    const { data, selectedChips, setSelectedChips} = props;
    const chips = [...new Set(data.map(d => d.genre).flat())];

    const handleChipSelect = (d) => {
        const chipIndex = selectedChips.indexOf(d);
        const newChips = [...selectedChips];
        if(chipIndex > -1){
            newChips.splice(chipIndex, 1);
        } else {
            newChips.push(d);
        }
        setSelectedChips(newChips);
    }

    return (
        <div className="chips">
            {
                chips.map((d,i)=>{
                    return (
                        <div className={`genre-chip ${selectedChips.indexOf(d) > -1 ? 'selected' : ''}` } onClick={() => handleChipSelect(d)}>{d}</div>
                    )
                })
            }
        </div>
    );
};

export default memo(MovieChip);