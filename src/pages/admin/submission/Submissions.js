// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

// import data
// import { submissions } from '../../data/submissions';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubmissionAsync, getAllSubmissionsAsync, submissionsSelector } from '../../../store/reducers/submissionSlice.js';
import { getAllProblemsAsync, problemsSelector } from '../../../store/reducers/problemSlice';
import { getAllUsersAsync, usersSelector } from '../../../store/reducers/userSlice';
import CustomPagination from '../../../components/DataTable/CustomPagination';
import { Report } from '../../../components/Report';


// const rowsData = submissions;

const Submissions = () => {
    const dispatch = useDispatch();
    const submissions = useSelector(submissionsSelector);
    const problems = useSelector(problemsSelector);
    const users = useSelector(usersSelector);

    useEffect(() => {
        dispatch(getAllUsersAsync());
        dispatch(getAllProblemsAsync());
        dispatch(getAllSubmissionsAsync());
    }, [dispatch]);

    const location = useLocation();

    // Click render SubmissionItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/admin/submission/${param.row.id}`, { state: param.row });

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
            field: 'updatedAt', headerClassName: 'super-app-theme--header', headerName: 'Submission Time', minWidth: 160, flex: 1, sortable: false,
            renderCell: (params) => {
                return (
                    `${params.row.updatedAt.slice(0, 10)} ${params.row.updatedAt.slice(11, 19)}`
                )
            }
        },
        {
            field: 'userId', headerClassName: 'super-app-theme--header', headerName: 'Username', minWidth: 100, flex: 2,
            renderCell: (params) => (
                // <Link sx={{cursor: 'pointer'}} onClick={() => handleRowClickProblem(params)}>
                // </Link>
                `${users.find(user => user.id === params.row.userId)?.username}`
            ),
        },
        {
            field: 'problemId', headerClassName: 'super-app-theme--header', headerName: 'Problem', minWidth: 200, flex: 1, sortable: false,
            renderCell: (params) => (
                <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => handleRowClickProblem(params)}>
                    {problems.find(problem => problem.id === params.row.problemId)?.title}
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
        <Fragment>
            <BoxContainer>
                <BoxTitle>
                    <BoxStack>
                        <Typography variant="h4" sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                        }}>
                            Submissions
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Submissions</Typography>
                            </Breadcrumbs>
                        </Typography>
                    </BoxStack>

                    {!!submissions?.length && (
                        <DataGrid
                            rows={submissions}
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
                    )}
                    {/* <DataTable rows={submissions} columns={columns} /> */}

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Submissions
