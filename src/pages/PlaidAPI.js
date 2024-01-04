import { useCallback, useEffect, useState, useContext } from "react";
import { usePlaidLink } from 'react-plaid-link';
import { useNavigate } from "react-router-dom";

import Link from "../components/linkToken";

const PlaidAPI = () =>{
  const [linkToken, setLinkToken] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;
  const navigate = useNavigate();

  useEffect(()=>{

    // validate if the user has logged in
    const generateToken = async() =>{
      const response = await fetch('/api/create_link_token',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({email}),
      });
      const json = await response.json();
      if(response.ok){
        setLinkToken(json);
      }
    };
    generateToken();
  },[]);
  
  const onSuccess = useCallback(
    async (public_token, metadata) => {
      const response = await fetch('/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ public_token, email }),
      });
      const json = await response.json();
      if(response.ok){
        if(json.accessToken !== "false"){
          navigate('/');
        }
      }
    }, [email, user]);

  const onEvent = useCallback(
    async (eventName, metadata) => {
      console.log(metadata);
      console.log(eventName);
      // redirect to other page when the link is hand off
      if (eventName === 'HANDOFF') {
        
      }
    }, []);

  const onExit = useCallback(
    async (error, metadata) => {
      if (error != null) {
        console.log(error);
      }
    }, []);

  const config = {
    token: linkToken,
    onSuccess: onSuccess,
    onEvent: onEvent,
    onExit: onExit
  };

  const { open, ready } = usePlaidLink(config);
  
  if(linkToken != null){
    if (ready) {
      open();
    }
  }

  }
  

export default PlaidAPI