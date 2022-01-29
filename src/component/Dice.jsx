import React from "react"
import {nanoid} from "nanoid"

export default function Dice(props){

    const styles = {
        backgroundColor: props.isHeld ? "#17B169" : "white"
    }        

    //dice dot
    const dotElement = [];
    for (let i = 0; i < props.value; i++) {
        dotElement.push(<span key={nanoid()} className='dot'></span>)
    }

    function createDots() {
        switch (props.value) {
            case 1:
                return (
                    <div className='one die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                        {dotElement}
                    </div>
                )
            case 2:
                return (
                    <div className='two die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                        {dotElement}
                    </div>
                )
            case 3:
                return (
                    <div className='three die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                        {dotElement}
                    </div>
                    )
            case 4:
                return (
                    <div className='four die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                        <div className='column'>{ dotElement.slice(2)}</div>
                        <div className='column'>{ dotElement.slice(2,4)}</div>
                    </div>
                )
            case 5:
                return (
                    <div className='five die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                    <div className='column'>{ dotElement.slice(0,2)}</div>
                    <div className='column'>{ dotElement.slice(2,3)}</div>
                    <div className='column'>{ dotElement.slice(3,5)}</div>
                    </div>
                )
            default:
                return (
                    <div className='six die-container' style={styles} onClick={() => props.holdDice(props.id)}>
                    <div className='column'>{ dotElement.slice(3)}</div>
                    <div className='column'>{ dotElement.slice(3,6)}</div>
                    </div>
                )
        }
    }

    return (
        <>
        {createDots()}
        </>
        )
}