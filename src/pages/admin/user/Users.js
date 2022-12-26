// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

// import data
// import { users } from '../../data/users';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAsync, getAllUsersAsync, usersSelector } from '../../../store/reducers/userSlice.js';


// const rowsData = users;

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);

    useEffect(() => {
        dispatch(getAllUsersAsync());
    }, [dispatch]);

    const location = useLocation();

    // Click render UserItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        // navigate(`/admin/users/${param.row.id}`, { state: param.row });

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
            field: 'username', headerClassName: 'super-app-theme--header', headerName: 'User Name', minWidth: 200, flex: 1,
        },
        { field: 'email', headerClassName: 'super-app-theme--header', headerName: 'Email', minWidth: 200, flex: 1, sortable: false, },
        { field: 'firstName', headerClassName: 'super-app-theme--header', headerName: 'First Name', minWidth: 200, flex: 1, sortable: false, },
        { field: 'lastName', headerClassName: 'super-app-theme--header', headerName: 'Last Name', minWidth: 200, flex: 1, sortable: false },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate(`/admin/users/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const userId = params.row.id;
                    dispatch(deleteUserAsync(userId))
                        .then((res) => {
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
                            Users
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Users</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /users/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/users/add')}
                        >
                            Add User
                        </Button>
                    </BoxStack>


                    <DataTable rows={users} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Users
