import React from 'react'
import Chart from "react-google-charts";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pieChart: {
    marginTop: theme.spacing(2),  
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function CardPieChart(props) {

  const classes = useStyles();

  var resolved = props.resolved;
  var inProgress = (props.inProgress);
  var unresolved = props.unresolved;

  

  return (
    <div>
      <Chart className={classes.pieChart}
        width={'34vw'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Status', 'Number'],
          ['Resolved', resolved],
          ['Unresolved', unresolved],
          ['Pending', inProgress],
          
        ]}
        options={{
          title: 'Grievance Response Status',
          sliceVisibilityThreshold: 0.2, // 20%
        }}
        rootProps={{ 'data-testid': '7' }}
      />
    </div>
  )
}


