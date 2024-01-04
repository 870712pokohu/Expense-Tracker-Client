import { useAccountContext } from "./useAccountContext";
import { useAuthContext } from "./useAuthContext";

const useHomePage = () =>{
  const {user} = useAuthContext();
  const {dispatch} = useAccountContext();
  const email = user.email; 
  const fetchAPI = async () => {
    try {
      const response = await fetch('/api/accounts/info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({email}),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data)
      } else {
        console.log('can not get the account info');
      }
    } catch (error) {
      console.error(error)
    }
  }

  return {fetchAPI}
};

export default useHomePage