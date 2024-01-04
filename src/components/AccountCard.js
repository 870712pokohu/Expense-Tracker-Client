import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function AccountCard({account}){

  const currency_code = account.balances.iso_currency_code;
  const available = account.balances.available;
  const amount = currency_code + "$ " + available;
  return(
    <Card sx={{minWidth: 200, marginRight:'20px', marginBottom:'20px'}}>
      <CardActionArea>
        <CardContent>
          <Typography variant='h5' component="div" sx={{mb:1}}>
            {account.name}
          </Typography>
          <Typography>
            {amount}  
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}