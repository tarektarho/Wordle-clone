import { useCallback, useContext, useEffect, useMemo } from "react"
import Key from "../key/Key"
import { AppContext } from "../../App"
import "./style.css"

export default function Keyboard() {
  // Destructuring values from the context
  const { onDelete, onEnter, onSelectLetter, disabledLetters } = useContext(AppContext)

  // Memoized arrays of keyboard keys to prevent unnecessary re-creation
  const keys1 = useMemo(() => ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"], [])
  const keys2 = useMemo(() => ["A", "S", "D", "F", "G", "H", "J", "K", "L"], [])
  const keys3 = useMemo(() => ["Z", "X", "C", "V", "B", "N", "M"], [])

  // Using useCallback to prevent redefinition of the function on each render
  const handleKeyboard = useCallback(
    (event) => {
      const eventKey = event.key.toLowerCase()
      if (event.key === "Enter") {
        onEnter()
      } else if (event.key === "Backspace") {
        onDelete()
      } else {
        // Consolidating the key mapping logic using a single loop
        const allKeys = [...keys1, ...keys2, ...keys3]
        allKeys.forEach((key) => {
          if (eventKey === key.toLowerCase()) {
            onSelectLetter(key)
          }
        })
      }
    },
    [onDelete, onEnter, onSelectLetter, keys1, keys2, keys3] // Dependencies for useCallback
  )

  // Attaching and detaching the event listener using useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])

  return (
    <div className="keyboard">
      <div className="line1">
        {keys1.map((key) => (
          <Key key={`line1-${key}`} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key) => (
          <Key key={`line2-${key}`} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey />
        {keys3.map((key) => (
          <Key key={`line3-${key}`} keyVal={key} disabled={disabledLetters.includes(key)} />
        ))}
        <Key keyVal={"DELETE"} bigKey />
      </div>
    </div>
  )
}
