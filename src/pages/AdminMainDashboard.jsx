import React, { useState, useEffect } from "react";

import PageHeader from "../components/common/PageHeader";
import DashboardKPICard from "../components/AdminDashboard/DashboardKPICard";
import ETLStatusTable from "../components/AdminDashboard/ETLStatusTable";
import RecentActivity from "../components/AdminDashboard/RecentActivity";
import QuickActions from "../components/AdminDashboard/QuickActions";
import TrendChart from "../components/AdminDashboard/TrendChart";
import QualityChart from "../components/AdminDashboard/QualityChart";
import AlertsCard from "../components/AdminDashboard/AlertsCard";
import FooterNote from "../components/FooterNote";
import PageSkeleton from "../components/common/PageSkeleton";
import { kpiCards } from "../data/adminDashboardData";


export default function AdminMainDashboard() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const timer = setTimeout(() => {

            setLoading(false);

        }, 1000);


        return () => clearTimeout(timer);

    }, []);


    if (loading) {

        return (

            <div className="p-4">

                <PageSkeleton />

            </div>

        );

    }


    return (

    <div className="space-y-1">

      {/* Header */}
      <PageHeader
        variant="dashboard"
        title="Dashboard"
        subtitle="Welcome back, Super Admin! Here's what's happening with FinSight."
        onRefresh={() => console.log("Refresh Dashboard")}
      />


      {/* KPI Cards */}
      <div className="pr-28">

        <div className="grid grid-cols-5 gap-0.5">

          {kpiCards.map((card) => (

            <DashboardKPICard
              key={card.title}
              {...card}
            />

          ))}

        </div>

      </div>


      {/* ETL + Recent + Quick */}

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-2">


        <div className="lg:col-span-4">

          <ETLStatusTable />

        </div>



        <div className="lg:col-span-6 grid grid-cols-2 gap-2">

          <RecentActivity />

          <QuickActions />

        </div>


      </div>



      {/* Bottom Row */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">


        <TrendChart />


        <QualityChart />


        <AlertsCard />


      </div>



      {/* Footer */}

      <FooterNote

        title="Note:"

        message="All data in dashboard is as per the selected date range."

        lastUpdated="20 Jun 2026 10:15 AM"

        onRefresh={() => console.log("Refresh clicked")}

      />


    </div>

  );

}