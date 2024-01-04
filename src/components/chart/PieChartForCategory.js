import { useState } from "react";
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { Grid, Paper, Stack } from "@mui/material";
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

export default function PieChartForCategory ({data}){

  let dataCollection = [];

  for(let key in data){
    dataCollection.push({ label: key, value: data[key].totalAmount});
  }

  const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 20,
  }));

  function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    );
  }

  const TOTAL = dataCollection.map((item) => item.value).reduce((a, b) => a + b, 0);
  
  const categoryByPercentage = [];
  dataCollection.map((data) => categoryByPercentage.push({ category: data.label, percentage: `${(parseFloat(data.value).toFixed(2)/TOTAL * 100).toFixed(0)}%` }))

  const getArcLabel = (params) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  const totalAmount = "Amount: $" + + parseFloat(TOTAL).toFixed(2);

  return(
    <Stack direction='column'>
      <PieChart
        series={[{
          arcLabel: getArcLabel,
          arcLabelMinAngle: 30,
          data: dataCollection,
          innerRadius: 90,
          outerRadius: 140,
          paddingAngle: 0,
          cornerRadius: 5,
        }]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontSize: 15,
            fontWeight: 'bold',
          },
        }}
        width={600}
        height={400}
      >
        <PieCenterLabel>
          {totalAmount}
        </PieCenterLabel>
      </PieChart>

      <Paper sx={{
        padding:2,
        margin: 'auto',
        marginTop:'20px',
        width: '90%',
        mb: 2,
        spacing: 2
      }}>
        {categoryByPercentage.length > 0 && categoryByPercentage.map((item)=>(
          <div>{item.category} {item.percentage}</div>
        ))}
      </Paper>
    </Stack>

  )
}