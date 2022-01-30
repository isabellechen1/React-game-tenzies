
import React from 'react'

export default function Leaderboard(props) {
    const diff = (props.endTime - props.startTime) / 1000;
    const timeArray = localStorage.getItem('Times') ? JSON.parse(window.localStorage.getItem('Times')) : [];
    timeArray.push(diff.toFixed(2));

    
    React.useEffect(() => {
        window.localStorage.setItem("Times",JSON.stringify(timeArray))
    })

    return (
        <div className='board'>
            <span>Time: {diff.toFixed(2)} Sec </span>
            <span>Moves: {props.moves}</span>
            <span></span>
        </div>
    )
}
