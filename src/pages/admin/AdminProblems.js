// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

// import data
import { problems } from '../../data/problems';

const rowsData = problems;



const pageSize = 10;

const Problems = () => {

    const user = JSON.parse(localStorage.getItem('user'));
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

    const columns = [
        { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 70, sortable: false, },
        {
            field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Problems', minWidth: 250, flex: 2,
            renderCell: (params) => (
                <Link href="" onClick={() => handleRowClick(params)}>{params.value}</Link>
            ),
        },
        { field: 'group', headerClassName: 'super-app-theme--header', headerName: 'Group', minWidth: 200, flex: 1, sortable: false, },
        { field: 'subgroup', headerClassName: 'super-app-theme--header', headerName: 'Sub group', minWidth: 200, flex: 1, sortable: false },
        { field: 'submit', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Submits', minWidth: 100, sortable: false },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 200, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onEdit = (e) => {
                    const currentRow = params.row;
                    navigate(`/admin/problems/edit/${params.row.id}`, { state: params.row });
                };

                const onDelete = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
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
            <Box sx={{
                height: {
                    xs: 108 + 6 * 16 + 52 + (pageSize * 52) + 'px',
                    md: 108 + 3 * 16 + 52 + (pageSize * 52) + 'px'
                },
                minWidth: { xs: 300, sm: 600, md: 900 }, px: { xs: 0, md: 3 },
                flexGrow: 1,
            }} >
                <Box
                    sx={{
                        height: 300,
                        width: '100%',
                        '& .super-app-theme--header': {
                            // backgroundColor: '#ececec',
                        },
                        '& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle': {
                            fontWeight: '600',
                        }
                    }}
                >
                    <Stack direction='row'
                        sx={{
                            py: { xs: 1, md: 3 },
                            pt: { xs: 3, md: 2 },
                            px: 0,
                            justifyContent: {
                                xs: "center",
                                sm: "space-between",
                                md: "space-between",
                                lg: "space-between",
                            },
                            alignItems: {
                                xs: "space-between",
                                sm: "center",
                                md: "center",
                                lg: "center",
                            },
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                                md: "row",
                                lg: "row",
                            },
                        }}>
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
                    </Stack>


                    <DataGrid
                        rows={rowsData}
                        columns={columns}
                        // onRowClick={handleRowClick}
                        disableColumnMenu
                        disableColumnSelector
                        disableSelectionOnClick
                        // hideFooter
                        autoHeight
                        pageSize={pageSize}
                        rowsPerPageOptions={[10]}
                        // disableColumnFilter
                        // disableDensitySelector
                        components={{ Toolbar: GridToolbar }}
                        componentsProps={{
                            toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                            },
                        }}
                        sx={{
                            // '& .MuiDataGrid-row': { cursor: 'pointer' },
                            "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                                outline: "none"
                            },
                            '& .css-1j9kmqg-MuiDataGrid-toolbarContainer': {
                                padding: '12px 16px 8px',
                                borderBottom: '1px solid #e0e0e0',
                            },
                            '& .css-c63i49-MuiInputBase-input-MuiInput-input': {
                                padding: '8px 0px',
                                fontSize: '0.875rem',
                                lineHeight: '1.25rem',
                                fontWeight: '400',
                                letterSpacing: '0.01071em',
                            },
                        }}
                    // rowCount={100}
                    />

                </Box>
            </Box>
        </Fragment >
    )
}

export default Problems
