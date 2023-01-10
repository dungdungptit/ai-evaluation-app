// @mui
import { Typography, Paper, Box, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

import { useLocation, useNavigate } from "react-router-dom";

// import data
import { problems } from '../data/problems';
import { BoxProblems, BoxProblemsStack, BoxStack, BoxTitle } from '../components/Box/BoxContainer';
import CustomPagination from '../components/DataTable/CustomPagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProblemsAsync, problemsSelector } from '../store/reducers/problemSlice';
import { setToken, setUsername } from '../store/reducers/hubSlice';


const columns = [
  {
    field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 70, sortable: false,
    renderCell: (index) => {
      return (
        <strong>{index.api.getRowIndex(index.id) + 1}</strong>
      )
    }
  },
  { field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Problems', minWidth: 250, flex: 2 },
  {
    field: 'group', headerClassName: 'super-app-theme--header', headerName: 'Group', minWidth: 200, flex: 1, sortable: false,
    renderCell: (params) => {
      return (
        `${params.row.group.title}`
      )
    }
  },
  {
    field: 'subGroup', headerClassName: 'super-app-theme--header', headerName: 'Subgroup', minWidth: 200, flex: 1, sortable: false,
    renderCell: (params) => {
      return (
        `${params.row.subGroup.title}`
      )
    }
  },
  { field: 'submissions', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submissions', minWidth: 120, sortable: false },
];

const pageSize = 10;

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const Problems = () => {

  const [searchText, setSearchText] = useState('');
  const problems = useSelector(problemsSelector)
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllProblemsAsync());
    dispatch(setUsername(''));
    dispatch(setToken(''));
    sessionStorage.removeItem('usernamehub');
    sessionStorage.removeItem('tokenhub');
  }, [dispatch])

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = problems.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(() => {
    setRows(problems);
  }, [problems]);

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    console.log(location.pathname);
    if (location.pathname === "/problems") {
      navigate(`${param.row.id}`, { state: param.row });
    }
    else {
      navigate(`problems/${param.row.id}`, { state: param.row });
    }
  };

  console.log("Problems:", problems);

  return (
    <BoxProblems>
      <BoxTitle>
        <BoxProblemsStack>
          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
            Problems
          </Typography>

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
        </BoxProblemsStack>

        <DataGrid
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          disableColumnMenu
          disableColumnSelector
          disableSelectionOnClick
          // hideFooter
          autoHeight
          pageSize={pageSize}
          rowsPerPageOptions={[10]}
          // disableColumnFilter
          disableDensitySelector
          sx={{
            '& .MuiDataGrid-row': { cursor: 'pointer' },
            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
              outline: "none"
            }
          }}
          components={{
            Pagination: CustomPagination,
          }}
        // rowCount={100}
        />
      </BoxTitle>
    </BoxProblems>
  )
}

export default Problems
