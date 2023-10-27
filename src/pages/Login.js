import { useEffect, useState, useContext } from "react";
import { usePlaidLink } from 'react-plaid-link';
import Link from "../components/linkToken";

const Login = () =>{

  const [linkToken, setLinkToken] = useState(null);

  
  useEffect(()=>{
    const generateToken = async() =>{
      const response = await fetch('/api/create_link_token');
      const data = await response.json();
      if(response.ok){
        setLinkToken(data);
      }
    };
    generateToken();
  },[]);

    if(linkToken != null){
       return(
      <div className="createLinkToken">
        <Link linkToken={linkToken}/>
      </div>
      )
    }else{
      return(
        <div className="createLinkToken">
          {linkToken}
        </div>
      )
    }   
  }
  

export default Login