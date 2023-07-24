import { ACTION_TYPES } from "./actions"
import { StateModel, ActionModel } from "./store-models"

export const storeReducer = (
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
  