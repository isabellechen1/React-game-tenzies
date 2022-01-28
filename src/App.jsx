import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){
  
  const [arrayDice, setArrayDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

//test if it is won

  React.useEffect(() => {
    const allHeld = arrayDice.every(dice => dice.isHeld)
    const allSame = arrayDice.every(dice => dice.value === arrayDice[0].value)
    if (allHeld && allSame){
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

//keep rolling if tenzies not all the same, restart game if won

  function roll(){
    if (!tenzies){
      setArrayDice(oldArrayDice => oldArrayDice.map(dice => {
        return dice.isHeld ? 
            dice :
            generateNewDice()
        })
      )
    } else {
      setTenzies(false)
      setArrayDice(allNewDice())
    }
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


  return (
    <main>
      {tenzies && <Confetti />}
      <h2>Tenzies</h2>
      <h4 className="object">Object: Try to be the first person to get all ten of your dice to the same number.</h4>
      <p className="instruction">Players hold all 10 dice. <br />
      Rolling ten dice, then decides upon a "match number." <br />
      Have all 10 dice matching and you that win that round!
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-dice" onClick={roll}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}