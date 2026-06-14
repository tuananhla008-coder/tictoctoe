"use client"

import type { Cell } from "@/lib/game"
import { cn } from "@/lib/utils"

type SquareProps = {
  value: Cell
  index: number
  isWinning: boolean
  disabled: boolean
  onClick: (index: number) => void
}

export function Square({ value, index, isWinning, disabled, onClick }: SquareProps) {
  return (
    <button
      type="button"
      aria-label={`Ô ${index + 1}${value ? `, đã đánh ${value}` : ", trống"}`}
      disabled={disabled || value !== null}
      onClick={() => onClick(index)}
      className={cn(
        "flex aspect-square items-center justify-center rounded-xl border-2 text-5xl font-bold transition-all sm:text-6xl",
        "border-border bg-card",
        !value && !disabled && "hover:border-primary/50 hover:bg-secondary cursor-pointer",
        value === "X" && "text-primary",
        value === "O" && "text-accent",
        isWinning && "border-transparent bg-primary text-primary-foreground",
        isWinning && value === "O" && "text-primary-foreground",
      )}
    >
      <span className={cn(value && "animate-in zoom-in-50 duration-200")}>{value}</span>
    </button>
  )
}
