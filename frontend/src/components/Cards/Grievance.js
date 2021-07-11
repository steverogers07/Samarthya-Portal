import React from "react";
import jsPDF from "jspdf";

class Grievance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  generatePDF = () => {
    var doc = new jsPDF("l", "pt", "a4");
    doc.html(document.querySelector("#content"), {
      callback: function (pdf) {
         var pageCount = doc.internal.getNumberOfPages();
         pdf.deletePage(pageCount);
        pdf.save("mypdf.pdf");
        pdf.output("dataurlnewwindow");
      }
    });
  };
  render() {
    return (
        <tr id="content">
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <a onClick={this.generatePDF}><i className="fas fa-download text-emerald-500 mr-2"></i></a>
          </td>
          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
            {this.props.name}
          </th>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {this.props.date}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {this.props.status}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {this.props.org}
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {this.props.details}
          </td>
        </tr>

    );
  }
}

export default Grievance;
