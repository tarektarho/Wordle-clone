import { render, screen } from "@testing-library/react"
import App from "./App"

test("Renders game name", () => {
  render(<App />)
  const linkElement = screen.getByText(/Wordle/i)
  expect(linkElement).toBeInTheDocument()
})

test("Validate the game class is exisit", () => {
  const { container } = render(<App />)
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const gameEleemnt = container.getElementsByClassName("game")[0]
  expect(gameEleemnt.className).toBe("game")
})

test("Validate the board class is exisit", () => {
  const { container } = render(<App />)
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const linkElement = container.getElementsByClassName("board")[0]
  expect(linkElement.className).toBe("board")
})
