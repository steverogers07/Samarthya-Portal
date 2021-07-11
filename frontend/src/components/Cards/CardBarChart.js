import React from 'react'
import Chart from "react-google-charts";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  barChart: {
    marginTop: theme.spacing(2),  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function CardBarChart() {

  const classes = useStyles();

  return (
    <div>
      <Chart className={classes.barChart}
        width={'34vw'}
        height={'300px'}
        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={[
          [
            'Month',
            'Education',
            'Infrastructure',
            'Sanitation',
            'Lack of resources',
            'Electricity',
            'Average',
          ],
          ['2021/05', 165, 938, 522, 998, 450, 614.6],
          ['2021/06', 135, 1120, 599, 1268, 288, 682],
          ['2021/07', 157, 1167, 587, 807, 397, 623],
          ['2021/08', 139, 1110, 615, 968, 215, 609.4],
          ['2021/09', 136, 691, 629, 1026, 366, 569.6],
        ]}
        options={{
          title: 'Grievance Popularity by Category',
          vAxis: { title: 'Numbers' },
          hAxis: { title: 'Category' },
          seriesType: 'bars',
          series: { 5: { type: 'line' } },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  )
}


