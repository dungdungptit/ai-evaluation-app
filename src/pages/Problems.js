// @mui
import { Container, Typography, Paper, Box, TextField, IconButton, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useNavigate } from "react-router-dom";

// import data
import { problems } from '../data/problems';


const rowsData = problems;

const columns = [
  { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 70, sortable: false, },
  { field: 'problems', headerClassName: 'super-app-theme--header', headerName: 'Problems', minWidth: 250, flex: 2 },
  { field: 'group', headerClassName: 'super-app-theme--header', headerName: 'Group', minWidth: 200, flex: 1, sortable: false, },
  { field: 'subgroup', headerClassName: 'super-app-theme--header', headerName: 'Sub group', minWidth: 200, flex: 1, sortable: false },
  { field: 'submit', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submits', mi10: 100, sortable: false },
];

const pageSize = 10;

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const Problems = () => {

  const [searchText, setSearchText] = useState('');
  const [rows, setRows] = useState(rowsData);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = rowsData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(rowsData);
  }, []);

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    // navigate(`${param.row.id}`, param.row);
    navigate(`problems/${param.row.id}`, {state: param.row});
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
              <Typography variant="h4">Problems</Typography>
              <TextField
                variant="standard"
                value={searchText}
                onChange={(event) => requestSearch(event.target.value)}
                placeholder="Search…"
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" />,
                  endAdornment: (
                    <IconButton
                      title="Clear"
                      aria-label="Clear"
                      size="small"
                      style={{ visibility: searchText ? 'visible' : 'hidden' }}
                      onClick={() => requestSearch('')}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  ),
                }}
                sx={{
                  width: {
                    xs: 1,
                    sm: 'auto',
                  },
                  m: (theme) => theme.spacing(1, 0.5, 1.5),
                  '& .MuiSvgIcon-root': {
                    mr: 0.5,
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 1,
                    borderColor: 'divider',
                  },
                }}
              />
            </Stack>


            <DataGrid
              rows={rows}
              columns={columns}
              onRowClick={handleRowClick}
              disableSelectionOnClick
              disableColumnMenu
              // hideFooter
              autoHeight
              disableColumnSelector
              pageSize={pageSize}
              rowsPerPageOptions={[10]}
              sx={{
                '& .MuiDataGrid-row': { cursor: 'pointer' },
              }}
            // rowCount={100}
            />
          </Box>
        </Paper>
      </Container>
    </Fragment >
  )
}

export default Problems
