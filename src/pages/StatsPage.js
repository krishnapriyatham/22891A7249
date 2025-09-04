import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import UrlStatsTable from "../components/UrlStatsTable";

const StatsPage = ({ urls }) => {
  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5">URL Statistics</Typography>
        <UrlStatsTable urls={urls} />
      </CardContent>
    </Card>
  );
};

export default StatsPage;
