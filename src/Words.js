import wordBank from "./wordle-bank.txt"

// Initialize the default game board
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
]

// Generate a word set asynchronously
export const generateWordSet = async () => {
  let wordSet
  let todaysWord

  try {
    // Fetch the content of the word bank file
    const response = await fetch(wordBank)
    const result = await response.text()

    // Split the result into an array of words using new line separator
    const wordArr = result.split("\n")

    // Select a random word from the array as today's word
    todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]

    // Create a Set from the array of words for efficient membership checking
    wordSet = new Set(wordArr)
  } catch (error) {
    // Handle any errors that occurred during fetch or processing
    console.error("Error fetching or processing word bank:", error)
    // Return an empty word set and null for today's word
    return { wordSet: new Set(), todaysWord: null }
  }

  // Return the generated word set and today's word
  return { wordSet, todaysWord }
}
