import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, Button, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import jupyter_img from "../../src/assets/images/1200px-Jupyter_logo.svg.png"
import { useDispatch, useSelector } from 'react-redux';

import { BoxProblems, BoxTitle } from '../../src/components/Box/BoxContainer';
import { base_URL, token } from '../../src/utils/constants';
import axios from 'axios';
import { getProblemByIdAsync, problemSelector } from '../store/reducers/problemSlice';
import { getSubmissionByProblemIdAndUserIdAsync, getSubmissionByUserIdAsync, submissionProblemSelector, submissionUserSelector } from '../store/reducers/submissionSlice';
import { findServerAsync, handleEvaluateAsync, hubSelector, setToken, setUsername } from '../store/reducers/hubSlice';

import CustomPagination from '../components/DataTable/CustomPagination';
import { green } from '@mui/material/colors';



const ProblemItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  console.log(params)
  const problemId = params.id;

  const dispatch = useDispatch();
  const problemItem = useSelector(problemSelector);
  const submissionProblem = useSelector(submissionProblemSelector);
  // submissions = submissions.filter(submission => submission.problemId === problemId);
  const auth = JSON.parse(localStorage.getItem('user'));
  console.log(submissionProblem);

  useEffect(() => {
    dispatch(getSubmissionByProblemIdAndUserIdAsync({
      problemId: problemId,
      userId: auth.id,
    }));
    dispatch(getProblemByIdAsync(problemId));
  }, [dispatch])

  const getServer = useSelector(hubSelector);
  console.log(getServer);
  const handleGetServer = (e) => {
    // e.preventDefault();
    if (getServer.username === '') {
      dispatch(findServerAsync(problemId)).then((res) => {
        console.log(res);
        setUsername(res.payload.data.username);
        setToken(res.payload.data.token);
        window.open(`https://hub.zcode.vn/hub/login?username=${res.payload.data.username}&token=${res.payload.data.token}`, '_blank');
        // sessionStorage.setItem('usernamehub', res.payload.data.username);
        // sessionStorage.setItem('tokenhub', res.payload.data.token);
        // set cookie for 1 day
        // document.cookie = `usernamehub=${res.payload.data.username}; max-age=86400`;
        // document.cookie = `tokenhub=${res.payload.data.token}; max-age=86400`;
      });
    }
    else if (getServer.username !== '') {
      // get cookie
      // const usernamehub = document.cookie.split('; ').find(row => row.startsWith('usernamehub')).split('=')[1];
      // const tokenhub = document.cookie.split('; ').find(row => row.startsWith('tokenhub')).split('=')[1];
      // console.log(usernamehub, tokenhub);
      window.open(`https://hub.zcode.vn/hub/login?username=${getServer.username}&token=${getServer.token}`, '_blank');
    }
  }

  const handleEvalute = (e) => {
    e.preventDefault();
    setLoading(true);
    if (getServer.username === '') {
      alert("Please get server first!");
      setLoading(false);
      return;
    }
    console.log(getServer.username, problemId);
    dispatch(handleEvaluateAsync(
      {
        username: getServer.username,
        problemId: problemId,
      }
    )).then((res) => {
      console.log(res);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false);
    })
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
    { field: 'accuracyTest', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Accuracy', minWidth: 120, flex: 1, sortable: false },
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
                // component="a"
                startIcon={<img src={jupyter_img} alt="jupyter" width="16px" />}
                variant="contained"
                onClick={(e) => { handleGetServer() }}
              // href={`https://hub.zcode.vn/hub/login?username=server01&token=123456`}
              // target="_blank"
              >
                Setup Environment
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', ml: 2 }} component="form" onSubmit={handleEvalute}>
                <Box sx={{ m: 1, position: 'relative' }}>
                  <Button variant="contained" type="submit" sx={{ ml: 1 }}
                    disabled={loading}
                  >
                    Evaluate
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: green[500],
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Paper>



          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
            History :
          </Typography>
          <BoxTitle>
            {!!submissionProblem.length && (
              <DataGrid
                rows={submissionProblem}
                columns={columns}
                disableSelectionOnClick
                disableColumnMenu
                // hideFooter
                autoHeight
                disableColumnSelector
                pageSize={20}
                components={{ Pagination: CustomPagination, }}
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