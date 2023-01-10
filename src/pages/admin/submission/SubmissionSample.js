// @mui
import { Typography, Stack, Button, Breadcrumbs, Link, Paper } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
  BoxContainer,
  BoxTitle,
  BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSubmissionsAsync, getSubmissionByIdAsync, submissionSelector, submissionsSelector } from '../../../store/reducers/submissionSlice.js';
import { getSubmission } from '../../../services/submissionApi';
import { getAllProblemsAsync, problemsSelector } from '../../../store/reducers/problemSlice';
import { getAllUsersAsync, usersSelector } from '../../../store/reducers/userSlice';
import { DataGrid } from '@mui/x-data-grid';
import CustomPagination from '../../../components/DataTable/CustomPagination';


const SubmissionSample = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Click render SubmissionSample
  const navigate = useNavigate();
  const submissionItem = useSelector(submissionSelector);
  const submissionSamples = submissionItem?.details || [];
  const submissionId = useParams().id;


  // Click render SubmissionSample




  useEffect(() => {
    dispatch(getSubmissionByIdAsync(submissionId));
  }, [dispatch]);

  console.log(submissionItem);
  console.log(submissionSamples);



  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    console.log(location.pathname);
    navigate(`/admin/submission/sample/${param.row.id}`, { state: param.row });

  };

  const handleRowClickProblem = (params) => {
    navigate(`/admin/problems/${params.row.problemId}`);
  };

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
      field: 'input', headerClassName: 'super-app-theme--header', headerName: 'Test', minWidth: 120, flex: 1, sortable: false,
      renderCell: (params) => (
        'Image Test'
      )
    },
    {
      field: 'updated', headerClassName: 'super-app-theme--header', headerName: 'Predicted', minWidth: 120, flex: 1, sortable: false,
      renderCell: (params) => (
        'Image Predicted'
      )
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
  ];

  return (
    <Fragment>
      <BoxContainer>
        <BoxTitle>
          <BoxStack>
            <Typography variant="h4" sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
            }}>
              Submissions Detail
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="/admin/submission">
                  Submissions
                </Link>
                <Typography color="text.primary">{submissionItem?.id}</Typography>
              </Breadcrumbs>
            </Typography>

          </BoxStack>

          <Paper elevation={0} sx={{
            p: 2, mb: 2, bgcolor: '#eaeff1',
            '& .MuiTypography-root': {
              fontSize: 16,
              fontWeight: 700,
              color: '#333333'
            }
          }} >
            <Stack direction="column" spacing={1}>
              <Typography variant="h6">
                Problem: {submissionItem?.problem?.title}
              </Typography>
              <Typography variant="h6">
                Account: {submissionItem?.user?.username}
              </Typography>
              <Typography variant="h6">
                Accuracy: {Number(submissionItem?.accuracy).toFixed(2) + '%'}
              </Typography>
              <Typography variant="h6">
                Execution Time: {Number(submissionItem?.executionTime) > 1000 ? (Number(submissionItem?.executionTime) / 1000).toFixed(0) + 's' : Number(submissionItem?.executionTime).toFixed(0) + 'ms'}
              </Typography>
              <Typography variant="h6">
                Execution Memories: {Number(submissionItem?.executionMemories) > 1024 ? (Number(submissionItem?.executionMemories) / 1024).toFixed(0) + 'KB' : Number(submissionItem?.executionMemories).toFixed(0) + 'B'}
              </Typography>
            </Stack>
          </Paper>


          <DataGrid
            rows={submissionSamples}
            columns={columns}
            onRowClick={handleRowClick}
            disableColumnMenu
            disableColumnSelector
            disableSelectionOnClick
            // hideFooter
            autoHeight
            pageSize={10}
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
      </BoxContainer>
    </Fragment >
  )
}

export default SubmissionSample
