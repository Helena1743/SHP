// GenerateReport.jsx
import React from "react";
import { Box } from "@mui/material";
import TopNav from "../components/TopNav";
import GenerateReportForm from "../components/GenerateReportForm";

const GenerateReport = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
        position: "relative", // needed for TopNav absolute/sticky positioning
      }}
    >
      {/* Top navigation with Back/Home buttons */}
      <TopNav />

      {/* Main page content */}
      <GenerateReportForm />
    </Box>
  );
};

export default GenerateReport;

