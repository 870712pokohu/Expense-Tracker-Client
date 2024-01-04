import { createContext, useEffect, useReducer } from "react";

export const AccountContext = createContext();

export const accountReducer = (state, action) =>{
  switch (action.type){
    case 'SET_ACCOUNT_INFO':
      return {account: action.payload}
    default:
      return state
  }
}

export const AccountContextProvider = ({children}) =>{
  const [state, dispatch] = useReducer(accountReducer,{account:null});
  useEffect(()=>{
    console.log(state)
  },[state])
  return(
    <AccountContext.Provider value={{...state, dispatch}}>
      {children}
    </AccountContext.Provider>
  )
};

