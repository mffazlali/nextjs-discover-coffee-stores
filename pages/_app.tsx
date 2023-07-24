import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Dispatch, createContext, useReducer } from 'react'

type Action = {
  SET_LAT_LANG: string
  SET_COFFEE_STORES: string
}

export const ACTION_TYPES: Action = {
  SET_LAT_LANG: 'SET_LAT_LANG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES',
}

class StateModel {
  latLang: string
  coffeeStores: any[]
  constructor() {
    this.latLang = ''
    this.coffeeStores = []
  }
}

class ActionModel<s> {
  type: string
  payload: s
  constructor(payload:s) {
    this.type = ''
    this.payload=payload
  }
}

class contextModel<s> {
  state: s
  dispatch: Dispatch<ActionModel<StateModel>>
  constructor(state: s,dispatch: Dispatch<ActionModel<StateModel>>){
    this.state=state
    this.dispatch=dispatch
  }
}

export const StoreContext = createContext<contextModel<StateModel>>(new contextModel(new StateModel(),()=>new ActionModel(new StateModel())))
interface StoreProviderProps {
  children: React.ReactNode
}

const storeReducer = (
  state: StateModel,
  action: ActionModel<StateModel>
): Required<StateModel> => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LANG:
      return { ...state, latLang: action.payload.latLang }
    case ACTION_TYPES.SET_COFFEE_STORES:
      return { ...state, coffeeStores: action.payload.coffeeStores }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const initialState: StateModel = new StateModel()

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
