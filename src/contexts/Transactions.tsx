import { useReducer, useEffect, useContext, createContext, ReactElement, Reducer } from 'react'
import { Transaction } from '@/@types/dto'
import * as storage from '@/constants/storage'
import { toDate } from 'date-fns'

// State
interface TransactionsState {
  data: Transaction[];
  current: Transaction | null;
}

// An enum with all the types of actions to use in our reducer
export enum TransactionsActionKind {
  Load = 'Load',
  Prepare = 'Prepare',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  ToogleActive = 'ToogleActive',
}

// An interface for our actions
interface TransactionAction {
  type: TransactionsActionKind
  payload: {
    data?: Transaction[]
    transaction?: Transaction | null
    id?: Transaction['id']
  }
}

// An interface for our state
interface TransactionsContextProps {
  state: TransactionsState
  dispatch: React.Dispatch<TransactionAction>
  getExpenses: (transactions?: Transaction[]) => Transaction[]
  getReceives: (transactions?: Transaction[]) => Transaction[]
}

interface TransactionsProviderProps {
  children: ReactElement
}

const initialState: TransactionsState = {
  data: [],
  current: null
}

// Our reducer function that uses a switch statement to handle our actions
function transactionsReducer(state: TransactionsState, action: TransactionAction) {
  switch (action.type) {
    case TransactionsActionKind.Load:
      return {
        ...state,
        data: action.payload.data!,
      }
    case TransactionsActionKind.Create:
      return {
        ...state,
        data: [...state.data].concat(action.payload.transaction!),
      }
    case TransactionsActionKind.Update:
      return {
        ...state,
        data: [...state.data].map((transaction) =>
          action.payload.id === transaction.id
            ? action.payload.transaction!
            : transaction
        ),
      }
    case TransactionsActionKind.Delete:
      return {
        ...state,
        data: [...state.data].filter(({ id }) => id !== action.payload.id),
      }
    case TransactionsActionKind.Prepare:
      return {
        ...state,
        current: action.payload.transaction!
      }
    case TransactionsActionKind.ToogleActive:
      return {
        ...state,
        data: [...state.data].map((transaction) => {
          let payloadTransaction = action.payload.transaction!

          return payloadTransaction.id === transaction.id
            ? { ...payloadTransaction, active: !payloadTransaction.active }
            : transaction
        }),
      }
    default:
      return state
  }
}

// Our reducer initializer function
function transactionsInitializer(): TransactionsState {
  try {
    const storagedTransactions: Transaction[] =
      JSON.parse(localStorage.getItem(storage.TRANSACTIONS) as string) ?? []

    return {
      current: null,
      data: storagedTransactions.map((item) => ({
        ...item,
        scheduledAt: toDate(new Date(item.scheduledAt)),
      })),
    }
  } catch (error) {
    console.log(error)
    return initialState
  }
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
)

export function useTransactionsContext() {
  return useContext(TransactionsContext)
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [state, dispatch] = useReducer<
    Reducer<TransactionsState, TransactionAction>,
    TransactionsState
  >(transactionsReducer, initialState, transactionsInitializer)

  useEffect(() => {
    function store() {
      localStorage.setItem(storage.TRANSACTIONS, JSON.stringify(state.data))
    }

    store()
  }, [state.data])

  function getExpenses(transactions = state.data) {
    return transactions.filter(item => item.type === 'SAIDA')
  }

  function getReceives(transactions = state.data) {
    return transactions.filter(item => item.type === 'ENTRADA')
  }

  return (
    <TransactionsContext.Provider
      value={{
        state,
        dispatch,
        getExpenses,
        getReceives
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
