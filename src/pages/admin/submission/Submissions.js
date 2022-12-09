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
        navigate(`/admin/submissions/${param.row.id}`, { state: param.row });

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
                <Link sx={{cursor: 'pointer'}} onClick={() => handleRowClickProblem(params)}>
                    {problems.find(problem => problem.id === params.row.problemId)?.title}
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


                    <DataTable rows={submissions} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Submissions
