"use client"

import { fetchTransactions, Transaction } from "@/services/api"
import { useEffect, useState } from "react"

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"All" | "Stake" | "Borrow" | "Lend">("All")
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const filteredTransactions = filter === "All" ? transactions : transactions.filter(transaction => transaction.type === filter)

  useEffect(() => {
    fetchTransactions().then((data) => {
      setTransactions(data)
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Recent Transactions</h1>
      <div className="mb-4 space-x-4">
        {(["All", "Stake", "Borrow", "Lend"] as const).map(option => (
          <button
            className={`px-3 py-1 rounded-md text-sm font-medium border ${option === filter ? 'border-primary' : 'border-transparent'}`}
            onClick={() => setFilter(option)}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary text-white">
            <tr>
              <th>User Name</th>
              <th>Transaction Type</th>
              <th>Token</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredTransactions.map((transaction, index) => (
              <tr key={transaction.id} className={index % 2 === 0 ? 'bg-neutral-100' : 'bg-neutral-300'}>
                <td className="text-left">{transaction.userName}</td>
                <td>{transaction.type}</td>
                <td>{transaction.token}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}