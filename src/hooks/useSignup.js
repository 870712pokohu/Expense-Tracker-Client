import { useState } from "react";
import validator from 'validator';
import { useAuthContext } from "./useAuthContext";


const useSignUp = () =>{
  const { dispatch } = useAuthContext();
  // error message
  const [errorMessage, setErrorMessage] = useState('');
  // validation for password
  const inputValidation = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };
  // password option
  const passwordOption = {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
    returnScore: false,
  };
  
  const signup = async(user) =>{
    const name = user.name;
    const email =  user.email;
    const password = user.password;
    // check if any field is empty
    if (!name || !email || !password || !user.confirmPassword) {
      setErrorMessage('Please fill out all fields');
    }
    // check if the string is an email
    else if (!validator.isEmail(email)) {
      setErrorMessage('Please check your email format');
    }
    // check if the password is same as the confirmed password
    else if (!inputValidation(password, user.confirmPassword)) {
      setErrorMessage('The password does not matched');
    }
    // check if the password is strong enough
    else if (!validator.isStrongPassword(password, passwordOption)) {
      setErrorMessage('The password is not strong enough');
    }else{
      
      const user = {name, email, password};
      const response = await fetch('/user/register', {
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
        localStorage.setItem('user',JSON.stringify(json))
        // update the user state
        dispatch({
          type:'LOGIN',
          payload:json
        });
        return true
      } 
      else {
        // error message for post request
        setErrorMessage(json.error)
        return false
      }
    }
  };
  return {signup, errorMessage}
};

export default useSignUp