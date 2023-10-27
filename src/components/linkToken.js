import { useCallback, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";

const Link = ({linkToken}) =>{

  const config = {
    token: linkToken, 
    onSuccess: async (public_token, metadata) => {
      console.log(public_token)
      console.log(metadata)
      const response = await fetch('/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({public_token}),
      });
      console.log(response.body)
    }
  }


  const {open, ready} = usePlaidLink(config);
  
  return(
    <button onClick={()=>open()} disabled={!ready}>
      Link Account
    </button>
  )


}

export default Link;