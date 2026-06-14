import { TicTacToe } from "@/components/tic-tac-toe"

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 py-10">
      <header className="text-center">
        <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Cờ Caro 3x3</h1>
        <p className="mt-2 text-pretty text-muted-foreground">
          Hai người chơi lần lượt đánh X và O. Ai có 3 ký hiệu thẳng hàng (ngang, dọc hoặc chéo) sẽ thắng.
        </p>
      </header>

      <TicTacToe />

      <footer className="text-center text-sm text-muted-foreground">Người chơi X luôn đi trước.</footer>
    </main>
  )
}
