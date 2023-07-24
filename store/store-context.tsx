import { createContext, useReducer } from 'react'
import { storeReducer } from './reducer'
import { contextModel, StateModel, ActionModel } from './store-models'

export const StoreContext = createContext<contextModel<StateModel>>(
  new contextModel(new StateModel(), () => new ActionModel(new StateModel()))
)
interface StoreProviderProps {
  children: React.ReactNode
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

export default StoreProvider
