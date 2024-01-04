import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useLogout = () =>{

  const navigate = useNavigate();
  
  const { dispatch } = useAuthContext();

  const logout = () =>{
    // remove user from the local storage
    localStorage.removeItem('user');
    // set the state of user to logout
    dispatch({type:'LOGOUT'});
    // redirect to the login page
    navigate('/');
  }

  return {logout}
};

export default useLogout