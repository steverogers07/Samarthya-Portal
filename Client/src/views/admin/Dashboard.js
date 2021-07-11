import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import CardPieChart from "components/Cards/CardPieChart";

export default function Dashboard() {
  return (
    <>
    <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardPieChart resolved={5} inProgress={2} unresolved={2} />
        </div>
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardBarChart />
        </div>
      
        <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
      </div>
    </>
  );
}
