import React, { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import jupyter_img from "../../src/assets/images/1200px-Jupyter_logo.svg.png"
import { useDispatch, useSelector } from 'react-redux';

import { BoxProblems, BoxTitle } from '../../src/components/Box/BoxContainer';
import { token } from '../../src/utils/constants';
import axios from 'axios';
import { getProblemByIdAsync, problemSelector } from '../store/reducers/problemSlice';
import { getSubmissionByUserIdAsync, submissionUserSelector } from '../store/reducers/submissionSlice';




const ProblemItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)
  const problemId = params.id;

  const dispatch = useDispatch();
  const problemItem = useSelector(problemSelector);
  const submissions = useSelector(submissionUserSelector);
  // submissions = submissions.filter(submission => submission.problemId === problemId);
  const auth = JSON.parse(localStorage.getItem('user'));
  console.log(submissions);

  useEffect(() => {
    dispatch(getSubmissionByUserIdAsync(auth.id));
    dispatch(getProblemByIdAsync(problemId));
  }, [dispatch])
  const rowsData = [];

  const pageSize = rowsData.length;
  const postData = {
    username: "server01"
  }
  const handleEvalute = (e) => {
    e.preventDefault();
    const postDataAsync = async () => {
      const response = await axios.post("http://192.168.88.122:5000/api/v1/hub/evaluate", JSON.stringify(postData),
        {
          headers:
          {
            token: token,
            'Content-Type': 'application/json'
          }
        })
      console.log(response)
      return response.data;
    }
    postDataAsync();
  }
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
      renderCell: () => (
        `${problemItem.title}`
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
      {problemItem && (
        <Fragment>
          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom sx={{ mt: 3 }}>
            {problemItem.title}
          </Typography>

          <Paper sx={{ display: 'flex', flexDirection: 'column', height: 'auto', py: { xs: 2, md: 4 }, px: { xs: 0, md: 5 } }}>
            <Typography variant="h6" component="h2" gutterBottom>
              <Box fontWeight="fontWeightBold" mb={1}>
                Description :
              </Box>
              {problemItem.description}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              <Box fontWeight="fontWeightBold" mb={1}>
                Input :
              </Box>
              {problemItem.inputDescription}
            </Typography>
            <Typography variant="h6" component="h2" gutterBottom>
              <Box fontWeight="fontWeightBold" mb={1}>
                Output :
              </Box>
              {problemItem.outputDescription}
            </Typography>

            {/* button blank to jupyterhub */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              <Button
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}
                color="primary"
                aria-label="upload picture"
                component="a"
                startIcon={<img src={jupyter_img} alt="jupyter" width="16px" />}
                variant="contained"
                href={`https://hub.zcode.vn/hub/login?username=server01&token=123456`}
                target="_blank"
              >
                Setup Environment
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 2 }} component="form" onSubmit={handleEvalute}>
                <Button
                  sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Evaluate
                </Button>
              </Box>
            </Box>
          </Paper>



          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
            History :
          </Typography>
          <BoxTitle>
            {!!submissions.length && (
              <DataGrid
                rows={submissions}
                columns={columns}
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
        </Fragment>
      )}
    </BoxProblems >
  )
}

ProblemItem.propTypes = {
  ProblemItem: PropTypes.object,
  rơwsData: PropTypes.array,
};

export default ProblemItem