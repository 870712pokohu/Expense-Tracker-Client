import { useState } from "react";
import validator from 'validator';
import { useAuthContext } from "./useAuthContext";


const useLogin = () => {

  const { dispatch } = useAuthContext();

  // error message
  const [errorMessage, setErrorMessage] = useState('');

  const login = async (user) => {
    const userName = user.userName;
    const password = user.password;
    // check if any field is empty
    if (!userName || !password) {
      setErrorMessage('Incorrect username or password');
    }
    // check if the string is an email
    else if (!validator.isEmail(userName)) {
      setErrorMessage('Please check your email format');
    } 
    else {
      const user = { userName, password }
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const json = await response.json();

      if (response.ok) {
        console.log(json.token)
        setErrorMessage('');
        // store the user information in local storage
        localStorage.setItem('user', JSON.stringify(json))
        // update the user state
        dispatch({
          type: 'LOGIN',
          payload: json
        });
        return true
      }
      else {
        // error message for post request
        setErrorMessage(json.error)
      }
    }
  };
  return { login, errorMessage }
};

export default useLogin