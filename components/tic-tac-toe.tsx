"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Square } from "@/components/square"
import { type Board, type Player, createEmptyBoard, getResult } from "@/lib/game"
import { cn } from "@/lib/utils"

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(createEmptyBoard())
  const [xIsNext, setXIsNext] = useState(true)
  const [scores, setScores] = useState({ X: 0, O: 0, draw: 0 })

  const result = useMemo(() => getResult(board), [board])
  const gameOver = result.winner !== null || result.isDraw

  function handleClick(index: number) {
    if (board[index] || gameOver) return
    const next = board.slice()
    const current: Player = xIsNext ? "X" : "O"
    next[index] = current
    setBoard(next)

    const r = getResult(next)
    if (r.winner) {
      setScores((s) => ({ ...s, [r.winner as Player]: s[r.winner as Player] + 1 }))
    } else if (r.isDraw) {
      setScores((s) => ({ ...s, draw: s.draw + 1 }))
    }
    setXIsNext(!xIsNext)
  }

  function newRound() {
    setBoard(createEmptyBoard())
    setXIsNext(true)
  }

  function resetAll() {
    newRound()
    setScores({ X: 0, O: 0, draw: 0 })
  }

  const status = result.winner
    ? `Người chơi ${result.winner} thắng!`
    : result.isDraw
      ? "Hòa rồi!"
      : `Lượt của ${xIsNext ? "X" : "O"}`

  return (
    <div className="w-full max-w-md">
      {/* Bảng điểm */}
      <div className="mb-4 grid grid-cols-3 gap-3">
        <ScoreCard label="Người chơi X" value={scores.X} active={!gameOver && xIsNext} tone="primary" />
        <ScoreCard label="Hòa" value={scores.draw} active={false} tone="muted" />
        <ScoreCard label="Người chơi O" value={scores.O} active={!gameOver && !xIsNext} tone="accent" />
      </div>

      {/* Trạng thái */}
      <div
        className={cn(
          "mb-4 rounded-xl border bg-card px-4 py-3 text-center text-lg font-semibold",
          result.winner && "border-primary text-primary",
          result.isDraw && "text-muted-foreground",
        )}
        aria-live="polite"
      >
        {status}
      </div>

      {/* Bàn cờ */}
      <div className="grid grid-cols-3 gap-3">
        {board.map((cell, i) => (
          <Square
            key={i}
            index={i}
            value={cell}
            isWinning={result.line?.includes(i) ?? false}
            disabled={gameOver}
            onClick={handleClick}
          />
        ))}
      </div>

      {/* Điều khiển */}
      <div className="mt-5 flex gap-3">
        <Button onClick={newRound} className="flex-1" size="lg">
          Ván mới
        </Button>
        <Button onClick={resetAll} variant="outline" className="flex-1 bg-transparent" size="lg">
          Đặt lại điểm
        </Button>
      </div>
    </div>
  )
}

function ScoreCard({
  label,
  value,
  active,
  tone,
}: {
  label: string
  value: number
  active: boolean
  tone: "primary" | "accent" | "muted"
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card px-2 py-3 text-center transition-colors",
        active && tone === "primary" && "border-primary ring-2 ring-primary/30",
        active && tone === "accent" && "border-accent ring-2 ring-accent/30",
      )}
    >
      <div
        className={cn(
          "text-2xl font-bold",
          tone === "primary" && "text-primary",
          tone === "accent" && "text-accent",
          tone === "muted" && "text-muted-foreground",
        )}
      >
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
