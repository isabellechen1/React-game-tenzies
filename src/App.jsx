import React, {useState, useEffect} from "react"
import Dice from "./component/Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import Leaderboard from "./component/Leaderboard"


export default function App(){
  // const { width, height } = useWindowSize();

// control the dice
  const [arrayDice, setArrayDice] = useState(allNewDice())
// control when to win
  const [tenzies, setTenzies] = useState(false)
// control moves  
  const [moves, setMoves] = useState(1)
//control the time the game started
  const [start, setStartTime] = useState('');
//control when the game started
  const [hasStarted, setHasStarted] = useState(false);
//control the time the game ended
  const [end, setEndTime] = useState('');
// control best record board
  const [showBoard, setShowBoard] = useState(false)



//test if it is won

  useEffect(() => {
    const allHeld = arrayDice.every(dice => dice.isHeld)
    const allSame = arrayDice.every(dice => dice.value === arrayDice[0].value)
    if (allHeld && allSame){
      let date = new Date();

      setEndTime(date.getTime());
      setHasStarted(false)
      setTenzies(true)
    }
  }, [arrayDice]
  )

 // generate random dice

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const randomDice = []
    for (let i=0; i<10; i++){
      randomDice.push(generateNewDice())
    }
    return randomDice
  }

//dice dot


//keep rolling if tenzies not all the same, restart game if won

  function roll(){
    let date = new Date();

    if (hasStarted === false) {
        setHasStarted(true);
        setStartTime(date.getTime())
    }

    if (!tenzies){
      setArrayDice(oldArrayDice => oldArrayDice.map(dice => {
        return dice.isHeld ? 
            dice :
            generateNewDice()
        })
      )
      setMoves(prevMoves => prevMoves +1)
    } else {
      setTenzies(false)
      setArrayDice(allNewDice())
      setMoves(1)
    }
  }

  function Moves({value}){
    return <div className="moves">{`Moves: ${value}`}</div>
  }

  //click dice with same value

  function holdDice(id) {
    setArrayDice(oldArrayDice => oldArrayDice.map(dice => {
        return dice.id === id ? 
            {...dice, isHeld: !dice.isHeld} :
            dice
    }))
  }

  const diceElements = arrayDice.map(dice => (
    <Dice 
      key={dice.id} 
      value={dice.value} 
      isHeld={dice.isHeld} 
      holdDice = {() => holdDice(dice.id)}
    />
  ))

// loop over local storage to render best time for leaderboard 

  const bestTimes = localStorage.getItem("Times") ?
  JSON.parse(localStorage.getItem("Times")) : [];

  let bestElements = [];
  bestElements = bestTimes.slice(0,3).sort((a, b) => a - b).map((time, idx) => {
  return (
      <span key={idx}>{time}</span>
  )
  })

  function showRecord() {
      setShowBoard( prev => !prev)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h2>Tenzies</h2>
      <Moves value={moves}/>
      <h4 className="object">Object: Try to be the first person to get all ten of your dice to the same number.</h4>
      <p className="instruction">Players hold all 10 dice. <br />
      Rolling 10 dice, then decides upon a "match number." <br />
      Have all 10 dice matching and you that win that round!
      </p>
      <div className="dice-main">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <Leaderboard moves={moves} startTime={start} endTime={end}/>}
      <button onClick={showRecord}>Show Record</button>
      {showBoard && <div className="record"> {bestElements} </div>}
    </main>
  )
}