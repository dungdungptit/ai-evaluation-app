import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Container, Typography, Paper, Box, TextField, IconButton, Stack, backdropClasses, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { problems } from '../../data/problems';
import { history } from "../../data/historys";
import jupyter_img from "../../assets/images/1200px-Jupyter_logo.svg.png"
import { useDispatch, useSelector } from 'react-redux';
import { getProblemByIdAsync, problemSelector } from '../../store/reducers/problemSlice';
import { BoxProblems, BoxTitle } from '../../components/Box/BoxContainer';
import { token } from '../../utils/constants';
import axios from 'axios';

const columns = [
  { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 50, sortable: false, },
  { field: 'createdAt', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submission time', minWidth: 100, flex: 1, sortable: false, },
  { field: 'problemName', headerClassName: 'super-app-theme--header', headerName: 'Problem', minWidth: 180, flex: 1, sortable: false },
  { field: 'accuracyModel', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Model', minWidth: 120, flex: 1, sortable: false },
  { field: 'accuracyTest', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Test', minWidth: 120, flex: 1, sortable: false },
  { field: 'excutionTime', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution time', minWidth: 100, flex: 1, sortable: false, },
  { field: 'excutionMemories', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution memory', minWidth: 100, flex: 1, sortable: false, },
];


const ProblemItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  console.log(params)
  const problemId = params.id;

  const dispatch = useDispatch();
  const problemItem = useSelector(problemSelector);

  useEffect(() => {
    dispatch(getProblemByIdAsync(problemId));
  }, [dispatch])
  const rowsData = history.filter((history) => history.problemId === 1);

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

  return (
    <BoxProblems>
      {problemItem && (
        <Fragment>
          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom sx={{ mt: 3 }}>
            {problemItem.title}
          </Typography>

          <Box sx={{ px: 2 }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} component="form" onSubmit={handleEvalute}>
              <Button
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}
                color="primary"
                variant="contained"
                type="submit"
              >
                Evaluate
              </Button>
            </Box>
            {/* button blank to jupyterhub */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2 }}>
              <Button
                sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}
                color="primary"
                aria-label="upload picture"
                component="a"
                startIcon={<img src={jupyter_img} alt="jupyter" width="32px" />}
                variant="contained"
                href={`https://hub.zcode.vn/hub/login?username=server01&token=123456`}
                target="_blank"
              >
                Setup Environment
              </Button>
            </Box>
          </Box>



          <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
            History :
          </Typography>
          <BoxTitle>
            <DataGrid
              rows={rowsData}
              columns={columns}
              disableSelectionOnClick
              disableColumnMenu
              disableColumnSelector
              hideFooter
              autoHeight
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