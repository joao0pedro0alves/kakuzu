import { Calculator } from '@/components/layout/Calculator'
import { TransactionList } from '@/components/layout/TransactionList'
import { TransactionForm } from '@/components/forms/TransactionForm'
import { TransactionsActionKind, useTransactionsContext } from '@/contexts/Transactions'
import { Transaction } from '@/@types/dto'
import { usePersistedState } from '@/hooks/usePersistedState'
import { isFuture, isToday } from 'date-fns'
import { CALCULATOR_INCLUDED_LISTS } from '@/constants/storage'
import { confirm } from '@/services/confirm'

type CalculatorListId = 'last' | 'scheduled'
type CalculatorOption = Record<CalculatorListId, Transaction[]>

export function Transactions() {
  const [{ data, current }, dispatch] = useTransactionsContext()
  const [calculatorIncludedLists, setCalculatorIncludedLists] = usePersistedState<CalculatorListId[]>(CALCULATOR_INCLUDED_LISTS, ['last'])

  const isScheduled = (date: Date) => !isToday(date) && isFuture(date)

  const scheduledTransactions = data.filter(
    ({ scheduledAt }) => isScheduled(scheduledAt)
  )

  const lastTransactions = data.filter(
    ({ scheduledAt }) => !isScheduled(scheduledAt)
  )

  const calculatorList: CalculatorOption = {
    last: lastTransactions,
    scheduled: scheduledTransactions
  }

  function getActiveCalculatorList() {
    return Object.entries(calculatorList)
      .filter(([key]) => calculatorIncludedLists.includes(key as CalculatorListId))
      .flatMap(([, transactions]) => transactions)
  }

  function handlePlus(calculatorListId: CalculatorListId) {
    setCalculatorIncludedLists(
      previousList => previousList.concat(calculatorListId)
    )
  }

  function handleMinus(calculatorListId: CalculatorListId) {
    setCalculatorIncludedLists(
      previousList => previousList.filter(clid => clid !== calculatorListId)
    )
  }

  function getListProps(calculatorListId: CalculatorListId) {
    return {
      includedOnCalculator: calculatorIncludedLists.includes(calculatorListId),
      onClickPlus: () => handlePlus(calculatorListId),
      onClickMinus: () => handleMinus(calculatorListId),
    }
  }

  function handleSave(data: Transaction) {
    if (current?.id) {
      dispatch({
        type: TransactionsActionKind.Update,
        payload: { transaction: data, id: data.id },
      })
    } else {
      dispatch({
        type: TransactionsActionKind.Create,
        payload: { transaction: data },
      })
    }
  }

  async function handleRemove(id: Transaction['id']) {
    if (await confirm("Remover transação ?")) {
      dispatch({
        type: TransactionsActionKind.Delete,
        payload: { id }
      })
    }
  }

  function handlePrepare(transaction: Transaction | null) {
    dispatch({
      type: TransactionsActionKind.Prepare,
      payload: { transaction }
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <TransactionList 
          title="Últimas transações" 
          data={lastTransactions}
          onRemoveItem={handleRemove}
          onChangeItem={handlePrepare}
          {...getListProps('last')}
        />
        <TransactionList 
          title="Transações agendadas" 
          data={scheduledTransactions}
          onRemoveItem={handleRemove}
          onChangeItem={handlePrepare}
          {...getListProps('scheduled')}
        />
      </div>

      <TransactionForm 
        current={current} 
        onSave={handleSave}
        onNew={() => handlePrepare(null)}
      />
      <Calculator 
        transactions={getActiveCalculatorList()} 
      />
    </div>
  )
}
