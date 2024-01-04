import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AccountCard from "../components/AccountCard";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";
import { useAccountContext } from "../hooks/useAccountContext";
import { Link, useNavigate } from "react-router-dom";
import Transaction from "../components/Transaction";
import useLogout from "../hooks/useLogout";
import ChartForCategory from "../components/ChartForCategory";



const HomePage = () =>{

  const user = JSON.parse(localStorage.getItem('user'));
  const email = user.email;
  const [account, setAccount] = useState(null);
  const [transaction, setTransaction] = useState(null);
  const {logout} = useLogout();

  useEffect(()=>{
    const fetchAPI = async () =>{
      try{
        const response = await fetch('/api/accounts/info',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify({email}),
        });
        if(response.ok){
          const data = await response.json();
          //dispatch({ type: 'SET_ACCOUNT_INFO', payload: data })
          setAccount(data.accountInfo)
          setTransaction(data.transaction)
        }else{
          // redirect to login page and logout the user if the jwt token is expired
          if(response.status === 401){
            logout();
          }else{
            console.log('can not get the account info');
          }
        }
      }catch(error){
        console.error(error)
      }
    }
    fetchAPI();
  }, []);



  const convertAmount = () =>{
    transaction.map((detail)=>{
      if(Math.sign(detail.amount) === -1){
        detail.amount = Math.abs(detail.amount);
      }
    })
  }

  if(transaction === null || account === null){
    return(
      <div>loading...</div>
    )
  }else{
    convertAmount();
    return(
      <div>
      <Navbar/>
      <Stack container sx={{padding:'20px'}}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
            Account Overview 
        </Typography>
        <Stack direction='row' alignItems='center'>
          {/* account info */}
          {account && account.map((singleAccount)=>(
              <AccountCard key={singleAccount.account_id} account={singleAccount}/>  
          ))}
        </Stack>
        {/*  */}
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>
          Monthly Transaction Overview
        </Typography>
        {transaction && (
          <ChartForCategory transactions={transaction}/>
        )}
        {/* transaction table */}
          {transaction && (
            <Transaction transactions={transaction} accounts={account}/> 
          )}
      </Stack>
      </div>
    )
  }

};


export default HomePage