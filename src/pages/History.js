// @mui
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';

import { useLocation, useNavigate } from "react-router-dom";

import { history } from "../data/historys";
import { BoxProblems, BoxTitle } from '../components/Box/BoxContainer';
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
    navigate(`/problems/${param.row.id}`, { state: param.row });
  };

  return (
    <BoxProblems>
      <BoxTitle>
        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom sx={{ mt: 3 }}>
          History
        </Typography>
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
      </BoxTitle>
    </BoxProblems>

  )
}

export default History
