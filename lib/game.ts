export type Player = "X" | "O"
export type Cell = Player | null
export type Board = Cell[]

// Tất cả các đường thắng: 3 hàng ngang, 3 cột dọc, 2 đường chéo
export const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export type GameResult = {
  winner: Player | null
  line: number[] | null
  isDraw: boolean
}

export function getResult(board: Board): GameResult {
  for (const line of WIN_LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line, isDraw: false }
    }
  }
  const isDraw = board.every((cell) => cell !== null)
  return { winner: null, line: null, isDraw }
}

export function createEmptyBoard(): Board {
  return Array(9).fill(null)
}
