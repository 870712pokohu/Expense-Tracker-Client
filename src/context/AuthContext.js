import {createContext, useEffect, useReducer } from 'react'


export const AuthContext = createContext()


export const authReducer = (state, action) => {
  switch  (action.type){
    case 'LOGIN':
      return {user: action.payload}
    case 'LOGOUT':
      return {user: null}
    default: 
      return state  
  }
}


export const AuthContextProvider = ({ children }) =>{
  // register the state
  const [state, dispatch] = useReducer(authReducer,{ user: null });
  // prevent reloading action will log out the user
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('auth user: ', user)
    // if we can find user info in the local storage then update the state to login
    if(user){
      dispatch({type:'LOGIN', payload: user});
    }
  },[])
  // keep track of state
  console.log('AuthContext state: ', state)
  // provide state value to all components
  return(
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}