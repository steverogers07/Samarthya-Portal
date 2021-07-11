// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import React from 'react'

export default function Grievance() {

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
        <tr>
                
            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                  GPS Piau Muniyari
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  13-Sep-2018
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <i className="fas fa-circle text-orange-500 mr-2"></i>
                  In Progress
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Additional Deputy Commissioner (ADC), Sonipat
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  Construction of rain water harvest facility and arrangement of medicine for insects and pests
                </td>
        </tr>
    )
}

// const useStyles = makeStyles({
//   root: {
//     display: 'flex',
//     maxWidth: "40vw" ,
//     flexDirection: "row",
//   },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   },
// });

// export default function SimpleCard() {
//   const classes = useStyles();
//   const bull = <span className={classes.bullet}>•</span>;

//   return (
//     <Card className={classes.root}>
//       <CardContent>
//         <Typography variant="body2" component="p">
//             <div>
//                 <p>SCHOOL NAME &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;   GPS Piau Muniyari</p>
//             </div>
//         </Typography>
//         <Typography variant="body2" component="p">
//                 <p>DATE OF APPLICATION &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;	13-Sep-2018</p>
//         </Typography>
//         <Typography variant="body2" component="p">
//             <div>
//                 <p>STATUS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; InProgress</p>
//             </div>
//         </Typography>
//         <Typography variant="body2" component="p">
//             <div>
//                 <p>ORGANISATION INVOLVED &nbsp; Additional Deputy Commissioner (ADC), Sonipat</p>
//             </div>
//         </Typography>
//         <Typography variant="body2" component="p">
//             <div>
//                 <p>DETAILS OF GRIEVANCE &nbsp;&nbsp;&nbsp;&nbsp; Construction of rain water harvest facility and arrangement of medicine for insects and pests</p>
//             </div>
//         </Typography>
//       </CardContent>
//       <CardActions>
//         <Button size="small">Learn More</Button>
//       </CardActions>
//     </Card>
//   );
// }
