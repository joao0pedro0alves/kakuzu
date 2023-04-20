export function Calculator() {
  return (
    <footer className="rounded-md bg-gray-100 dark:bg-gray-700 p-4 grid grid-cols-3">
      <div className="flex flex-col">
        <span>Receives</span>
        <span className="font-black text-3xl">R$ 0.00</span>
      </div>
      <div className="flex flex-col">
        <span>Expenses</span>
        <span className="font-black text-3xl">R$ 0.00</span>
      </div>
      <div className="flex flex-col">
        <span>Balance</span>
        <span className="font-black text-3xl">R$ 0.00</span>
      </div>
    </footer>
  )
}