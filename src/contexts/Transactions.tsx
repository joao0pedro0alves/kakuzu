import { useReducer, useContext, createContext, ReactElement, Reducer } from 'react'
import { Transaction } from '@/@types/dto'
import { transactions } from '@/sample/transactions'

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
}

interface TransactionsProviderProps {
  children: ReactElement
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
    default:
      return state
  }
}

const initialState: TransactionsState = {
  data: transactions,
  current: null
}

const TransactionsContext = createContext<TransactionsContextProps>(
  {} as TransactionsContextProps
)

export function useTransactionsContext(): [
  TransactionsContextProps['state'],
  TransactionsContextProps['dispatch']
] {
  const { state, dispatch } = useContext(TransactionsContext)
  return [state, dispatch]
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [state, dispatch] = useReducer<Reducer<TransactionsState, TransactionAction>>(transactionsReducer, initialState)

  return (
    <TransactionsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
