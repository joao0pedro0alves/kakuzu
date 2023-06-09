import { Calculator } from '@/components/layout/Calculator'
import { TransactionList } from '@/components/layout/TransactionList'
import { TransactionForm } from '@/components/forms/TransactionForm'
import { TransactionsActionKind, useTransactionsContext } from '@/contexts/Transactions'
import { Transaction } from '@/@types/dto'
import { usePersistedState } from '@/hooks/usePersistedState'
import { CALCULATOR_INCLUDED_LISTS } from '@/constants/storage'
import { confirm } from '@/services/confirm'
import { isScheduled } from '@/utils/date-fns'
import { copy } from '@/utils/copy'

type CalculatorListId = 'last' | 'scheduled'
type CalculatorOption = Record<CalculatorListId, Transaction[]>

export function TransactionsPage() {
  const { state: { data, current }, dispatch } = useTransactionsContext()
  const [calculatorIncludedLists, setCalculatorIncludedLists] = usePersistedState<CalculatorListId[]>(CALCULATOR_INCLUDED_LISTS, ['last'])

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
    if (await confirm("Deseja remover a transação?" + "<br/>" + "Essa ação não poderá ser revertida")) {
      dispatch({
        type: TransactionsActionKind.Delete,
        payload: { id }
      })
    }
  }

  function handlePrepare(transaction: Transaction | null) {
    dispatch({
      type: TransactionsActionKind.Prepare,
      payload: { transaction: copy(transaction) }
    })
  }
  
  function handleToogleActive(transaction: Transaction) {
    dispatch({
      type: TransactionsActionKind.ToogleActive,
      payload: { transaction }
    })
  }

  function handleReset() {
    handlePrepare(null)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 flex flex-col md:flex-row gap-4">
        <TransactionList 
          title="Últimas transações" 
          data={lastTransactions}
          onRemoveItem={handleRemove}
          onChangeItem={handlePrepare}
          onToogleActiveItem={handleToogleActive}
          {...getListProps('last')}
        />
        <TransactionList 
          title="Transações agendadas" 
          data={scheduledTransactions}
          onRemoveItem={handleRemove}
          onChangeItem={handlePrepare}
          onToogleActiveItem={handleToogleActive}
          {...getListProps('scheduled')}
        />
      </div>
      <TransactionForm 
        current={current} 
        onSave={handleSave}
        onReset={handleReset}
      />
      <Calculator 
        transactions={getActiveCalculatorList()} 
      />
    </div>
  )
}
