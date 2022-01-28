import React from "react"

export default function Dice(props){

const style = {
    backgroundColor: props.isHeld ? "#32CD32" : "white"
}        
    

    return(
        <div 
            className="dice-face" 
            style={style} 
            onClick={props.holdDice}
        >
            <h2>{props.value}</h2>
        </div>
    )
}