import  { useContext, useEffect } from "react"
import { AppContext } from "../../App"
import PropTypes from "prop-types" // Import PropTypes with the correct name

function Letter({ letterPos, attemptVal }) {
   // Extracting values from the context using destructuring
  const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(AppContext)

  // Retrieving the letter at the given position and attempt value
  const letter = board[attemptVal][letterPos];

   // Checking if the letter is correct at the current position
  const correct = correctWord.toUpperCase()[letterPos] === letter

  // Checking if the letter is almost correct (present in the correct word but not in the correct position)
  const almost = !correct && letter !== "" && correctWord.toUpperCase().includes(letter)

   // Determining the state of the letter (correct, almost, or error)
  const letterState = currentAttempt.attempt > attemptVal && (correct ? "correct" : almost ? "almost" : "error")

  useEffect(() => {
    // Adding the letter to the disabled letters list if it's incorrect and not almost correct
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttempt.attempt]);

  return (
    <div className={`letter ${letterState}`} id={letterState.toString()}>
      {letter}
    </div>
  );
}

Letter.propTypes = {
  letterPos: PropTypes.number.isRequired, 
  attemptVal: PropTypes.number.isRequired,
};

export default Letter
