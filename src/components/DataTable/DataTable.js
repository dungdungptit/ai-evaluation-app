import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const DataTable = ({ rows, columns, hideFooter }) => {
    const pageSize = rows.length;

    const navigate = useNavigate();
    const location = useLocation();

    const handleRowClick = (param, event) => {
        console.log("Row:");
        console.log(param);
        console.log(event);
        const item = {
            pathname: location.pathname + "/" + param.row.id,
            item: param.row
        };

        navigate(`${item.pathname}`, { state: item });
    };
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            onRowClick={handleRowClick}
            disableSelectionOnClick
            disableColumnMenu
            // hideFooter
            hideFooter = {hideFooter}
            autoHeight
            disableColumnSelector
            pageSize={10}
            rowsPerPageOptions={[10]}
            sx={{
                '& .MuiDataGrid-row': { cursor: 'pointer' },
                "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
                    outline: "none"
                }
            }}
        // rowCount={100}
        />

    )
}

export default DataTable