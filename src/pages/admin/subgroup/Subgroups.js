// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

// import data
// import { subgroups } from '../../data/subgroups';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSubgroupAsync, getAllSubgroupsAsync, subgroupsSelector } from '../../../store/reducers/subgroupSlice.js';
import { getAllGroupsAsync, groupsSelector } from '../../../store/reducers/groupSlice';


// const rowsData = subgroups;

const Subgroups = () => {
    const dispatch = useDispatch();
    const subgroups = useSelector(subgroupsSelector);
    const groups = useSelector(groupsSelector);

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllSubgroupsAsync());
    }, [dispatch]);

    const location = useLocation();

    // Click render SubgroupItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/admin/subgroup/${param.row.id}`, { state: param.row });

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
            field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Title', minWidth: 250, flex: 2,
        },
        { field: 'description', headerClassName: 'super-app-theme--header', headerName: 'Description', minWidth: 200, flex: 1, sortable: false, },
        {
            field: 'groupId', headerClassName: 'super-app-theme--header', headerName: 'Group', minWidth: 200, flex: 1, sortable: false,
            renderCell: (params) => (
                `${groups.find(group => group.id === params.value)?.title}`
            )
        },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate(`/admin/subgroup/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const currentRow = params.row;
                    dispatch(deleteSubgroupAsync(currentRow.id)).then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
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
        <Fragment>
            <BoxContainer>
                <BoxTitle>
                    <BoxStack>
                        <Typography variant="h4" sx={{
                            fontSize: "1.5rem",
                            fontWeight: 700,
                        }}>
                            Subgroups
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Subgroups</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /subgroup/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/subgroup/add')}
                        >
                            Add Subgroup
                        </Button>
                    </BoxStack>


                    <DataTable rows={subgroups} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Subgroups
