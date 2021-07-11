import React from "react";
import Grievance from "./Grievance";
import { makeStyles } from '@material-ui/core/styles';
import jsPDF from 'jspdf'
import 'jspdf-autotable';

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(5),
  },
}));


// components

export default function CardPageVisits(props) {

  function generateReport(){
    const doc = new jsPDF()
  doc.autoTable({ html: '#grieveTable' })
  doc.save('table.pdf')
  doc.output("dataurlnewwindow");
  }

  function downloadCSV(csv, filename) {  
    var csvFile;  
    var downloadLink;  
     
    //define the file type to text/csv  
    csvFile = new Blob([csv], {type: 'text/csv'});  
    downloadLink = document.createElement("a");  
    downloadLink.download = filename;  
    downloadLink.href = window.URL.createObjectURL(csvFile);  
    downloadLink.style.display = "none";  
  
    document.body.appendChild(downloadLink);  
    downloadLink.click();  
}  
//user-defined function to export the data to CSV file format  
function exportTableToCSV(filename) {  
  //declare a JavaScript variable of array type  
  var csv = [];  
  var rows = document.querySelectorAll("#grieveTable");  
  
  //merge the whole data in tabular form   
  for(var i=0; i<rows.length; i++) {  
   var row = [], cols = rows[i].querySelectorAll("td, th");  
   for( var j=0; j<cols.length; j++)  
      row.push(cols[j].innerText);  
   csv.push(row.join(","));  
  }   
  //call the function to download the CSV file  
  downloadCSV(csv.join("\n"), filename);  
}   

  

  const classes = useStyles();
  return (
    <div className={classes.table}>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Grievance Tracking of SMCs
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={exportTableToCSV('person.csv')}
              >
                Download CSV
              </button>
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={generateReport}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table id="grieveTable" className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Name of the School
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date of Application
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Organisation Involved
                </th>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                 Details of Grievance
                </th>
              </tr>
            </thead>
            <tbody>
                <Grievance name="GPS Piau Muniyari" date="13-Sep-2018" status="Resolved" org="Additional Deputy Commissioner (ADC), Sonipat" details="Construction of rain water harvest facility and arrangement of medicine for insects and pests"/>
                <Grievance name="GPS Piau Muniyari" date="18-Sep-2018" status="Pending" org="BEO, Rai, Sonipat" details="Construction of rooms - work done from funds recieved from dept
Benches - not done
Sanitation worker - part time
Boys toilet - work done by CSR - Dan block company"/>
                <Grievance name="GPS Piau Muniyari" date="18-Sep-2018" status="Pending" org="Village Sarpanch , Piau Village, Rai Block, Sonipat" details="No response from Sarpanch Construction of rooms - work done from funds recieved from dept
Benches - not done
Sanitation worker - part time
Boys toilet - work done by CSR - Dan block company"/>
                <Grievance name="GSSS Kundli" date="20-Aug-2018" status="Resolved" org="BEO, Rai, Sonipat" details="Letter given to DEO too. DEO did not do anything. School got the teachers in the next teacher transfer drive which happened , across the state"/>
                <Grievance name="GPS Kundli" date="27-Nov-2018" status="Unresolved" org="BEO, Rai, Sonipat" details="Construction & repair of rooms (32 classrooms)
Arrangement of benches for students (at least for 900 students)
Arrangement of books for 170 students"/>
                
                <Grievance name="GHS Rai" date="21-May-2019" status="Resolved" org="Municipal Corporation, Sonipat" details="Arrangement of electricity in school
Increase in height of boundary wall
Construction of entry gate of aaganwadi "/>
                <Grievance name="GHS Rasoi" date="8-Feb-2019" status="Resolved" org="Sarpanch, Rasoi village, Rai Block , Sonipat" details="Request for 35 classrooms
Arrangement of 350 dual desks"/>
                <Grievance name="GPS Kundli" date="8-Feb-2019" status="Unresolved" org="Sarpanch, Kundli Sonipat" details="Request for shifting of CSC centre as unsafe for children "/>
                
                <Grievance name="GSSS Beeswan Meel" date="21- May 2019" status="Resolved" org="Municipal Corporation" details="Need for clean drinking water "/>
              </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
