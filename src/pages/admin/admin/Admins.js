// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

// import data
// import { admins } from '../../data/admins';

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdminAsync, getAllAdminsAsync, adminsSelector } from '../../../store/reducers/adminSlice.js';


// const rowsData = admins;

const Admins = () => {
    const dispatch = useDispatch();
    const admins = useSelector(adminsSelector);

    useEffect(() => {
        dispatch(getAllAdminsAsync());
    }, [dispatch]);

    const location = useLocation();

    // Click render AdminItem
    const navigate = useNavigate();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        console.log(location.pathname);
        navigate(`/admin/admins/${param.row.id}`, { state: param.row });

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
            field: 'username', headerClassName: 'super-app-theme--header', headerName: 'User Name', minWidth: 250, flex: 2,
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
                    navigate(`/admin/admins/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const adminId = params.row.id;
                    dispatch(deleteAdminAsync(adminId)).then((res) => {
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
                            Admins
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Admins</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /admins/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/admins/add')}
                        >
                            Add Admin
                        </Button>
                    </BoxStack>


                    <DataTable rows={admins} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Admins
