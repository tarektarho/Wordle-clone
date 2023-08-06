import { useContext } from "react" // Importing necessary modules from React
import { AppContext } from "../../App" // Importing AppContext from a relative path

export default function GameOver() {
  const { gameOver, correctWord, currentAttempt } = useContext(AppContext) // Accessing context values using useContext hook

  return (
    <div className="gameOver">
      {/* Render a div with CSS class "gameOver" */}
      <h3>{gameOver.guessedWord ? "You Correctly Guessed the Wordle" : "You Failed to Guess the Word"}</h3>
      {/* Display a heading with a dynamic message based on whether the word was correctly guessed */}
      <h1> Correct: {correctWord}</h1>
      {/* Display the correct word */}
      {gameOver.guessedWord && <h3>You guessed in {currentAttempt.attempt} attempts</h3>}
      {/* Display a heading with the number of attempts if the word was guessed */}
    </div>
  )
}
