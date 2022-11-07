// @mui
import { Container, Typography, Paper, Box, TextField, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useLocation, useNavigate } from "react-router-dom";

import { history } from "../data/historys";
const rowsData = history;

const columns = [
  { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 70, sortable: false, },
  { field: 'createdAt', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submission time', minWidth: 100, flex: 1, sortable: false, },
  { field: 'problemName', headerClassName: 'super-app-theme--header', headerName: 'Problem', minWidth: 250, flex: 2, sortable: false },
  { field: 'accuracyModel', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Model', minWidth: 150, flex: 1, sortable: false },
  { field: 'accuracyTest', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Test', minWidth: 150, flex: 1, sortable: false },
  { field: 'excutionTime', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution time', minWidth: 100, flex: 1, sortable: false, },
  { field: 'excutionMemories', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution memory', minWidth: 100, flex: 1, sortable: false, },
];

const pageSize = rowsData.length; 

const History = () => {

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    // navigate(`${param.row.id}`, param.row);
    navigate(`/problems/${param.row.id}`, {state: param.row});
  };

  return (
    <Fragment>
      <Container maxWidth="xl">
        <Paper sx={{
          height: {
            xs: 108 + 6 * 16 + 52 + (pageSize * 52) + 'px',
            md: 108 + 3 * 16 + 52 + (pageSize * 52) + 'px'
          },
          minWidth: { xs: 300, sm: 600, md: 900 }, py: { xs: 2, md: 4 }, px: { xs: 0, md: 5 }
        }} >
          <Box
            sx={{
              height: 300,
              width: '100%',
              '& .super-app-theme--header': {
                backgroundColor: '#ececec',
              },
              '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                fontWeight: '600',
              }
            }}
          >
            <Stack direction='row'
              sx={{
                py: { xs: 1, md: 3 },
                pt: { xs: 3, md: 1 },
                px: { xs: 0, sm: 4, md: 0, lg: 0 },
                justifyContent: {
                  xs: "center",
                  sm: "space-between",
                  md: "space-between",
                  lg: "space-between",
                },
                alignItems: {
                  xs: "space-between",
                  sm: "center",
                  md: "center",
                  lg: "center",
                },
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
              }}>
              <Typography variant="h4">History</Typography>
            </Stack>


            <DataGrid
              rows={rowsData}
              columns={columns}
              onRowClick={handleRowClick}
              disableSelectionOnClick
              disableColumnMenu
              hideFooter
              autoHeight
              disableColumnSelector
              pageSize={pageSize}
              rowsPerPageOptions={[20]}
              sx={{
                '& .MuiDataGrid-row': { cursor: 'pointer' },
                "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                  outline: "none"
                }
              }}
            // rowCount={100}
            />
          </Box>
        </Paper>
      </Container>
    </Fragment >
  )
}

export default History
