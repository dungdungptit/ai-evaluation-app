// @mui
import { Typography, Stack, Button, Breadcrumbs, Link, Box } from '@mui/material';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProblemsAsync, problemsSelector, deleteProblemAsync } from '../../../store/reducers/problemSlice';



const Problems = () => {
    const dispatch = useDispatch();
    const problems = useSelector(problemsSelector);

    useEffect(() => {
        dispatch(getAllProblemsAsync());
    }, [dispatch]);

    const location = useLocation();

    // Click render ProblemItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/admin/problems/${param.row.id}`, { state: param.row });

    };

    const handleRowClickDataset = (param, event) => {
        param.row.dataset?.id && navigate(`/admin/datasets/${param.row.dataset?.id}`, { state: param.row.dataset });
    };

    const columns = [
        {
            field: 'index', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 50, sortable: false,
            // render index of table
            renderCell: (index) => (
                <strong>{index.api.getRowIndex(index.id) + 1}</strong>
            )
        },
        {
            field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Problems', minWidth: 200, flex: 1,
            renderCell: (params) => (
                <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => handleRowClick(params)}>{params.value}</Link>
            ),
        },
        {
            field: 'datasetTitle', headerClassName: 'super-app-theme--header', headerName: 'Dataset', minWidth: 160, flex: 1, sortable: false,
            renderCell: (params) => (
                params.row.dataset?.title ? <Link sx={{ cursor: 'pointer', textDecoration: 'none' }} onClick={() => handleRowClickDataset(params)}>{params.row.dataset?.title}</Link> : "None"
            )
        },
        {
            field: 'group', headerClassName: 'super-app-theme--header', headerName: 'Group', minWidth: 200, flex: 1, sortable: false,
            renderCell: (params) => (
                `${params.row.group?.title}`
            )
        },
        {
            field: 'subgroup', headerClassName: 'super-app-theme--header', headerName: 'Sub group', minWidth: 200, flex: 1, sortable: false,
            renderCell: (params) => (
                `${params.row.subGroup?.title}`

            )
        },
        {
            field: 'submissions', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submissions', minWidth: 120, sortable: false,
            
        },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onEdit = (e) => {
                    navigate(`/admin/problems/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const problemId = params.row.id;
                    dispatch(deleteProblemAsync(problemId)).then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });;
                };

                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="warning" size="small" onClick={onEdit}>Edit</Button>
                        <Button variant="contained" color="error" size="small" onClick={onDelete}>Delete</Button>
                    </Stack>
                );
            },
        },
    ];

    return (
        <BoxContainer>
            <BoxTitle>
                <BoxStack>
                    <Typography variant="h4" sx={{
                        fontSize: "1.5rem",
                        fontWeight: 700,
                    }}>
                        Problems
                        <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                            <Link underline="hover" color="inherit" href="">
                                Home
                            </Link>
                            <Typography color="text.primary">Problems</Typography>
                        </Breadcrumbs>
                    </Typography>

                    {/* Add custom button to the toolbar */}
                    {/* a link to /problems/Add */}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/admin/problems/add')}
                    >
                        Add Problem
                    </Button>
                </BoxStack>


                <DataTable rows={problems} columns={columns} />

            </BoxTitle>
        </BoxContainer>
    )
}

export default Problems
