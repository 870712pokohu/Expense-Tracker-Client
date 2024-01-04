import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableFooter, TablePagination, TableSortLabel } from '@mui/material';



const Transaction = ({transactions, accounts}) =>{
  
  const accountType = new Map();
  
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  
  accounts.map((account)=>(
    accountType.set(account.account_id, account.subtype )
    ));
    
  const emptyRows = page > 0 ? Math.max(0, (1+page) * rowsPerPage - transactions.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
    
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  transactions.map((transaction)=>(
    transaction.account_name = accountType.get(transaction.account_id)
  ))


    return(
      <Paper sx={{ width: '100%', mb:2}}>
        <TableContainer component={Paper}>
            <Table sx={{ width:'100%' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>
                    <TableSortLabel direction=''>
                      Date    
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Account Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* slice function's first argument is the starting index and the second argument is the ending index */}
                {transactions && transactions.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage).map((transaction)=>(
                  <TableRow>
                    <TableCell>{transaction.merchant_name? transaction.merchant_name:"Transaction"}</TableCell>
                    <TableCell>{transaction.category[0]}</TableCell>
                    <TableCell>{transaction.authorized_date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.pending? "true":"approved"}</TableCell>
                    <TableCell>{transaction.account_name}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5,10,25]}
                    count={transactions.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>

        </TableContainer>
      </Paper>
    )
 };

 export default Transaction