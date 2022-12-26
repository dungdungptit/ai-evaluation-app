import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, IconButton, Stack, Button, Breadcrumbs, Link, TableCell, TableRow, TableBody, TableHead, Table, TableContainer } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

import { problems } from '../../../data/problems';
import { history } from "../../../data/historys";
import { getProblemByIdAsync, problemSelector } from '../../../store/reducers/problemSlice';
import { useDispatch, useSelector } from 'react-redux';
import { BoxContainer, BoxTitle } from '../../../components/Box/BoxContainer';
import { base_URL } from '../../../utils/constants';






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
            field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: 'Submission Time', minWidth: 160, flex: 1, sortable: false,
            renderCell: (params) => {
                return (
                    `${params.row.updatedAt.slice(0, 10)} ${params.row.updatedAt.slice(11, 19)}`
                )
            }
        },

        {
            field: 'accuracy', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Accuracy', minWidth: 120, flex: 1, sortable: false,
            renderCell: (params) => (
                Number(params.row.accuracy).toFixed(2) + '%'
            )
        },
        {
            field: 'executionTime', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Execution Time', minWidth: 120, flex: 1, sortable: false,
            renderCell: (params) => (
                Number(params.row.executionTime).toFixed(2) + 's'
            )
        },
        {
            field: 'executionMemories', headerClassName: 'super-app-theme--header', align: "center", headerAlign: "center", headerName: 'Execution Memories', minWidth: 160, flex: 1, sortable: false,
            renderCell: (params) => (
                Number(params.row.executionMemories) > 1024 ? (Number(params.row.executionMemories) / 1024).toFixed(0) + 'KB' : Number(params.row.executionMemories).toFixed(0) + 'B'
            )
        },
    ];

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
                                <Typography color="text.primary">{problemItem?.title}</Typography>
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
                                Video Input Sample:
                            </Box>
                            <video src={`${base_URL}/${problemItem.inputSample}`} controls width="100%" height="auto" />
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom>
                            <Box fontWeight="fontWeightBold" mb={1}>
                                Output :
                            </Box>
                            {problemItem.outputDescription}
                        </Typography>
                        <Typography variant="h6" component="h2" gutterBottom sx={{ width: "100%" }}>
                            <Box fontWeight="fontWeightBold" mb={1}>
                                Output Sample:
                            </Box>
                            {problemItem?.outputTable && (
                                <TableContainer component={Paper}
                                    elevation={0}
                                    sx={{
                                        '& .MuiTableCell-head': {
                                            color: '#000',
                                            border: '1px solid #0e0e0e',
                                            fontWeight: 'bold',
                                            fontSize: 18
                                        },
                                        '& .MuiTableCell-body': {
                                            color: '#000',
                                            border: '1px solid #0e0e0e',
                                        },
                                        // border: '1px solid #0c0c0c',
                                    }}>
                                    <Table sx={{
                                        minWidth: 360,
                                        borderCollapse: 'separate',
                                    }}

                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">frame_x</TableCell>
                                                <TableCell align="center">predict</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {problemItem?.outputTable.map((row, index) => (
                                                index < 10 &&
                                                <TableRow
                                                    key={index}
                                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{row.frame_x}</TableCell>
                                                    <TableCell align="center">{row.predict}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )
                            }
                            <Link component={'a'} href={`${base_URL}/${problemItem.outputSample}`} width="100%" height="auto" sx={{ cursor: 'pointer', textDecoration: 'none', textAlign: 'right', display: 'block', boxSizing: 'border-box', p: 1 }}> Download Output Sample</Link>
                        </Typography>
                    </Paper>


                    <BoxTitle>
                        <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom marginTop={4}>
                            History :
                        </Typography>
                        <DataGrid
                            rows={problemItem?.submissions}
                            columns={columns}
                            disableSelectionOnClick
                            disableColumnMenu
                            disableColumnSelector
                            hideFooter
                            autoHeight
                            pageSize={problemItem?.submissions?.length > 20 ? 20 : problemItem?.submissions?.length}
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