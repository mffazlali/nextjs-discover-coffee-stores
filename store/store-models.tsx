import { Dispatch } from "react"

export class StateModel {
    latLang: string
    coffeeStores: any[]
    constructor() {
      this.latLang = ''
      this.coffeeStores = []
    }
  }
  
  export class ActionModel<s> {
    type: string
    payload: s
    constructor(payload: s) {
      this.type = ''
      this.payload = payload
    }
  }
  
  export class contextModel<s> {
    state: s
    dispatch: Dispatch<ActionModel<StateModel>>
    constructor(state: s, dispatch: Dispatch<ActionModel<StateModel>>) {
      this.state = state
      this.dispatch = dispatch
    }
  }
  