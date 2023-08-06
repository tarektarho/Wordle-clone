// Import necessary dependencies and components
import React, { createContext, useEffect, useState } from "react"
import "./App.css"
import Board from "./components/board/Board"
import Keyboard from "./components/keyboard/Keyboard"
import { boardDefault, generateWordSet } from "./Words"
import GameOver from "./components/gameOver/GameOver"

// Create a context for sharing state between components
export const AppContext = createContext()

function App() {
  // Initialize state variables using useState hook
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })
  const [correctWord, setCorrectWord] = useState("")

  // Load word set and today's word from the word bank on component mount
  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])

  // Handle letter selection in the current attempt
  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal
    setBoard(newBoard)

    setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1 })
  }

  // Handle letter deletion in the current attempt
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return

    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = ""
    setBoard(newBoard)

    setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos - 1 })
  }

  // Handle word submission when Enter is pressed
  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return

    let currentWord = ""
    for (let i = 0; i < 5; i++) {
      currentWord += board[currentAttempt.attempt][i]
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 })
    } else {
      alert("Word Not Found")
    }

    if (currentWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true })
      return
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false })
    }
  }

  // Render the app UI
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      {/* Provide context values to child components */}
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onEnter,
          onDelete,
          onSelectLetter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          gameOver,
          setGameOver,
        }}
      >
        <div className="game">
          {/* Display the game board and keyboard components */}
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>
      </AppContext.Provider>
    </div>
  )
}

export default App
