import { useCallback, useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";

const Link = ({linkToken}) =>{

  const [linkOpen, setLinkOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;

  const onSuccess = useCallback( 
    async (public_token, metadata)=>{
      await fetch('/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({public_token, email}),
      });
  },[email, user]);

  const onEvent = useCallback(
    async(eventName, metadata)=>{
      console.log(metadata);
      console.log(eventName);
      // redirect to other page when the link is hand off
      if(eventName === 'HANDOFF'){
        setLinkOpen(true);
      }
    },[])

  const onExit = useCallback(
    async(error, metadata)=>{
      if(error != null){
        console.log(error);
      }
  },[])

  const config = {
    token: linkToken, 
    onSuccess: onSuccess,
    onEvent: onEvent,
    onExit: onExit
  };
  
  const {open, ready} = usePlaidLink(config);
  
  if(ready){
    open();
  }
  

  // if(linkOpen === true){
  //   navigate('/')
  // }else{
  //   return(
  //     <div>loading...</div>
  //   )
  // }

}

export default Link;