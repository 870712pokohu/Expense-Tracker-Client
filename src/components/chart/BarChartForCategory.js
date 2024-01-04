import { Paper, Stack } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const BarChartForCategory = ({data}) =>{ 
  if (data){
    const categoryDetail = [];
    for(const key of Object.keys(data)){
      categoryDetail.push({ category: key, amount: parseFloat(data[key].totalAmount).toFixed(2)});
    }
    console.log(categoryDetail)
    const amountByCategory = Object.values(data).map((category)=>category.totalAmount);
    
    // check if there are categories with totalAmount
    if (amountByCategory.length > 0) {
      return(
        <Stack container direction='column'>
          <BarChart
            width={700}
            height={400}
            series={[{data: amountByCategory}]}
            xAxis={[{
              scaleType: 'band',
              data: Object.keys(data)
            }]}
          />
          <Paper sx={{
            padding:2,
            margin: 'auto',
            marginTop:'10px',
            width: '90%',
            mb: 2,
            spacing: 2
          }}>
            {categoryDetail.length >0 && categoryDetail.map((detail)=>(
              <div>{detail.category} {detail.amount}</div>
            ))}
          </Paper>
        </Stack>
      )
    }

  }
};

export default BarChartForCategory