// @mui
import { Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, } from 'react';

import { useNavigate } from "react-router-dom";

import { BoxProblems, BoxTitle } from '../components/Box/BoxContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProblemsAsync, problemsSelector } from '../store/reducers/problemSlice';
import { getSubmissionByUserIdAsync, submissionUserSelector } from '../store/reducers/submissionSlice';
import CustomPagination from '../components/DataTable/CustomPagination';
import { Report, SummaryReport } from '../components/Report';

const History = () => {

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    navigate(`/problems/${param.row.problemId}`, { state: param.row });
  };
  const dispatch = useDispatch();
  const submissions = useSelector(submissionUserSelector);
  const problems = useSelector(problemsSelector);
  const auth = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {
    dispatch(getAllProblemsAsync());
    dispatch(getSubmissionByUserIdAsync(auth.id));
  }, [dispatch]);

  // Click render SubmissionItem

  const columns = [
    {
      field: 'index', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 50, sortable: false,
      // render index of table
      renderCell: (index) => {
        return (
          <strong>{index.api.getRowIndex(index.id) + 1}</strong>
        )
      }
    },
    {
      field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: 'Submission Time', minWidth: 160, flex: 1, sortable: false,
      renderCell: (params) => {
        return (
          `${params.row.updatedAt.slice(0, 10)} ${params.row.updatedAt.slice(11, 19)}`
        )
      }
    },
    {
      field: 'problemId', headerClassName: 'super-app-theme--header', headerName: 'Problem', minWidth: 200, flex: 1, sortable: false,
      renderCell: (params) => (
        <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => handleRowClick(params)}>
          {!!problems && problems.find(problem => problem.id === params.row.problemId)?.title}
        </Link>
      ),
    },
    {
      field: 'accuracy', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Accuracy', minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => (
        params.row.accuracy === null ? 'None' : Number(params.row.accuracy).toFixed(2) + '%'
      )
    },
    {
      field: 'precision', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Precision', minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => (
        params.row.precision === null ? 'None' : Number(params.row.precision).toFixed(2) + '%'
      )
    },
    {
      field: 'recall', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Recall', minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => (
        params.row.recall === null ? 'None' : Number(params.row.recall).toFixed(2) + '%'
      )
    },
    {
      field: 'f1score', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'F1-score', minWidth: 100, flex: 1, sortable: false,
      renderCell: (params) => (
        params.row.f1score === null ? 'None' : Number(params.row.f1score).toFixed(2) + '%'
      )
    },
    {
      field: 'selectionRate', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Frame Selection Rate', minWidth: 180, flex: 1, sortable: false,
      renderCell: (params) => (
        Number(params.row.selectionRate)
      )
    },
    {
      field: 'executionTime', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Execution Time', minWidth: 120, flex: 1, sortable: false,
      renderCell: (params) => (
        Number(params.row.executionTime) > 1000 ? (Number(params.row.executionTime) / 1000).toFixed(2) + 's' : Number(params.row.executionTime).toFixed(2) + 'ms'
      )
    },
    {
      field: 'executionMemories', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Execution Memories', minWidth: 160, flex: 1, sortable: false,
      renderCell: (params) => (
        Number(params.row.executionMemories) > 1024 ? (Number(params.row.executionMemories) / 1024).toFixed(0) + 'KB' : Number(params.row.executionMemories).toFixed(0) + 'B'
      )
    },
    {
      field: 'report', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Dowload Report', minWidth: 160, flex: 1, sortable: false,
      renderCell: (params) => (
        <Report id={params.row.id} />
      )
    },
  ];

  return (
    <BoxProblems>
      <BoxTitle>
        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom sx={{ mt: 3 }}>
          History
        </Typography>
        
      {/* <SummaryReport info={problem} /> */}
        {!!submissions?.length && (
          <DataGrid
            rows={submissions}
            columns={columns}
            // onRowClick={handleRowClick}
            disableSelectionOnClick
            disableColumnMenu
            // hideFooter
            autoHeight
            disableColumnSelector
            pageSize={20}
            components={{ Pagination: CustomPagination, }}
            rowsPerPageOptions={[20]}
            sx={{
              // '& .MuiDataGrid-row': { cursor: 'pointer' },
              "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                outline: "none"
              }
            }}
          // rowCount={100}
          />
        )}
      </BoxTitle>
    </BoxProblems>

  )
}

export default History
