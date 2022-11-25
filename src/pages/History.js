// @mui
import { Link, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, } from 'react';

import { useNavigate } from "react-router-dom";

import { BoxProblems, BoxTitle } from '../components/Box/BoxContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProblemsAsync, problemsSelector } from '../store/reducers/problemSlice';
import { getSubmissionByUserIdAsync, submissionUserSelector } from '../store/reducers/submissionSlice';

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
        <Link href="" onClick={() => handleRowClick(params)}>
          {!!problems && problems.find(problem => problem.id === params.row.problemId)?.title}
        </Link>
      ),
    },
    { field: 'description', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Description', minWidth: 100, flex: 1, sortable: false, },
    { field: 'accuracyModel', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Accuracy Model', minWidth: 130, flex: 1, sortable: false },
    { field: 'accuracyTest', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Accuracy Test', minWidth: 120, flex: 1, sortable: false },
    { field: 'excutionTime', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Excution Time', minWidth: 120, flex: 1, sortable: false },
    { field: 'excutionMemories', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Excution Memories', minWidth: 160, flex: 1, sortable: false },
  ];

  return (
    <BoxProblems>
      <BoxTitle>
        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom sx={{ mt: 3 }}>
          History
        </Typography>
        {!!submissions.length && (
          <DataGrid
            rows={submissions}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            disableColumnMenu
            hideFooter
            autoHeight
            disableColumnSelector
            pageSize={submissions.length}
            rowsPerPageOptions={[20]}
            sx={{
              '& .MuiDataGrid-row': { cursor: 'pointer' },
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
