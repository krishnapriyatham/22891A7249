import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const UrlStatsTable = ({ urls }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Short URL</TableCell>
          <TableCell>Original URL</TableCell>
          <TableCell>Expiry (mins)</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Clicks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {urls.map((url, i) => (
          <TableRow key={i}>
            <TableCell>{url.shortUrl}</TableCell>
            <TableCell>{url.longUrl}</TableCell>
            <TableCell>{url.expiry}</TableCell>
            <TableCell>{url.createdAt}</TableCell>
            <TableCell>{url.clicks.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UrlStatsTable;
