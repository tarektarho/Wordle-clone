import React, { useContext } from "react" // Importing necessary modules from React
import { AppContext } from "../../App" // Importing AppContext from a relative path
import PropTypes from "prop-types" // Importing PropTypes for prop type validation

function Key({ keyVal, bigKey, disabled }) {
  // Destructuring the props: keyVal, bigKey, and disabled
  const { onDelete, onEnter, onSelectLetter } = useContext(AppContext) // Accessing context values using useContext hook

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      // Check if the key value is "ENTER"
      onEnter() // If true, invoke the onEnter function from context
    } else if (keyVal === "DELETE") {
      // Check if the key value is "DELETE"
      onDelete() // If true, invoke the onDelete function from context
    } else {
      onSelectLetter(keyVal) // If neither "ENTER" nor "DELETE", invoke the onSelectLetter function from context with the keyVal
    }
  }

  return (
    <div className={`key ${disabled ? "disabled" : ""} ${bigKey ? "big" : ""}`} onClick={selectLetter}>
      {/* Render a div with appropriate CSS classes based on props and an onClick event handler */}
      {keyVal} {/* Display the key value inside the div */}
    </div>
  )
}

Key.propTypes = {
  keyVal: PropTypes.string, // Specify that keyVal should be a string
  bigKey: PropTypes.bool, // Specify that bigKey should be a boolean
  disabled: PropTypes.bool, // Specify that disabled should be a boolean
}

export default Key // Export the Key component as default
