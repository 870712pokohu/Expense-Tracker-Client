import { FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack } from "@mui/material";
import { useState } from "react";
import PieChartForCategory from "./chart/PieChartForCategory";
import BarChartForCategory from "./chart/BarChartForCategory";

const ChartForCategory = ({transactions}) =>{
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth()+1);

  const monthExpense = transactions.reduce((result, transaction) => {
    let date = new Date(transaction.authorized_date);
    const key = date.getFullYear() + '-' + (parseInt(date.getMonth()) + 1);

    if (!result[key]) {
      result[key] = [];
    }

    result[key].push({ category: transaction.category[0], amount: transaction.amount });
    return result
  }, {});

  // transaction amount within a month
  const MonthSeriesData = (year, month) =>{
    // add a zero in front of the month number if the value is lower than 10
    if(month<10){
      month = '0' + String(month);
    }
    let dateFormat = year + '-' + month+'-';

    let matchingMonth = transactions.filter((transaction)=>transaction.authorized_date.includes(dateFormat));

    let AmountInCategory = matchingMonth.reduce((result, transaction)=>{
      const key = transaction.category[0];

      if(!result[key]){
        result[key] = {
          totalAmount: 0
        };
      }
      result[key].totalAmount += transaction.amount;

      return result; 
    },{});

    return AmountInCategory;
  }
  const keys = Object.keys(monthExpense).sort((a, b) => {
    const [aYear, aMonth] = a.split('-');
    const [bYear, bMonth] = b.split('-');
    // Compare years
    if (aYear !== bYear) {
      return aYear - bYear;
    }

    // If years are the same, compare months
    return aMonth - bMonth;
  })

  const yearDuplicate = keys.map((key) => {
    let date = new Date(key)
    return date.getFullYear()
  })

  const yearSet = [...new Set(yearDuplicate)];

  const months = (year) =>{
    return keys
      .filter((key)=>key.includes(year))
      .map((key)=>key.split('-')[1])
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) =>{
    setMonth(event.target.value);
  }


  return(
    <Paper sx={{
      margin: 'auto',
      width: '100%', 
      mb: 2, 
      spacing: 1 }}>
      <div>
          {/* select year */}
          <FormControl sx={{m:2, marginRight:'10px',  minWidth: 100 }}>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                {yearSet && yearSet.map((years) => (
                  <MenuItem value={years}>{years}</MenuItem>
                ))}
              </Select>
          </FormControl>
          {/* select month */}
          <FormControl sx={{ mt:2, minWidth: 100 }}>
              <InputLabel id="month">Month</InputLabel>
              <Select 
                labelId="month"
                id="month"
                label="Month"
                value={month}
                onChange={handleMonthChange}
              >
                {months(year) && months(year).map((month) => (
                  <MenuItem value={month}>{month}</MenuItem>
                ))}
              </Select>
          </FormControl>
      </div>
      <Stack direction='row' alignItems='center' container spacing={1} sx={{paddingBottom:'10px'}}>
        {/* pie chart */}
        {year && month &&
          <PieChartForCategory data={MonthSeriesData(year, month)}  />
        }
        {/* bar chart */}
        {year && month &&
          <BarChartForCategory data={MonthSeriesData(year, month)} />
        }
      </Stack>
      <Stack direction='row' alignItems='center' container spacing={1} sx={{paddingBottom:'10px'}}>

      </Stack>
    </Paper>
  )
};

export default ChartForCategory