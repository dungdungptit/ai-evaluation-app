import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, IconButton, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import { problems } from '../../../data/problems';
import { history } from "../../../data/historys";
import { getProblemByIdAsync, problemSelector } from '../../../store/reducers/problemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BoxContainer, BoxTitle } from '../../../components/Box/BoxContainer';



const columns = [
    { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'ID', minWidth: 50, sortable: false, },
    { field: 'createdAt', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submission time', minWidth: 100, flex: 1, sortable: false, },
    { field: 'problemName', headerClassName: 'super-app-theme--header', headerName: 'Problem', minWidth: 180, flex: 1, sortable: false },
    { field: 'accuracyModel', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Model', minWidth: 120, flex: 1, sortable: false },
    { field: 'accuracyTest', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Accuracy Test', minWidth: 120, flex: 1, sortable: false },
    { field: 'excutionTime', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution time', minWidth: 100, flex: 1, sortable: false, },
    { field: 'excutionMemories', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Execution memory', minWidth: 100, flex: 1, sortable: false, },
];


const AdminProblemItem = () => {
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

    return (
        <BoxContainer>
            {problemItem && (
                <Fragment>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2, pt: 2 }}>

                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                            Problems Details
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Link underline="hover" color="inherit" href="/admin/problems">
                                    Problems
                                </Link>
                                <Typography color="text.primary">{problemItem.title}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Edit problem item */}
                        <Button
                            variant='contained'
                            aria-label="edit"
                            color="primary"
                            startIcon={<EditIcon />}
                            onClick={() => navigate(`/admin/problems/edit/${problemItem.id}`, { state: problemItem })}
                        >
                            Edit
                        </Button>

                    </Stack>

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
                    </Paper>


                    <BoxTitle>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
                            History :
                        </Typography>
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

        </BoxContainer >
    )
}

AdminProblemItem.propTypes = {
    problemItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default AdminProblemItem