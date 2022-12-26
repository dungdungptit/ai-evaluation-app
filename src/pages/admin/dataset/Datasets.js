// @mui
import { Typography, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate } from "react-router-dom";

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllDatasetsAsync, datasetsSelector, deleteDatasetAsync } from '../../../store/reducers/datasetSlice.js';


const Datasets = () => {
    const dispatch = useDispatch();
    const datasets = useSelector(datasetsSelector);

    useEffect(() => {
        dispatch(getAllDatasetsAsync());
    }, [dispatch]);

    console.log(datasets);

    const location = useLocation();

    // Click render DatasetItem
    const navigate = useNavigate();

    const handleRowClickProblem = (params) => {
        navigate(`/admin/problems/${params.row.problemId}`);
    };

    const handleRowClickDataset = (params) => {
        navigate(`/admin/datasets/${params.row.id}`);
    };

    const columns = [
        {
            field: 'index', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'No', minWidth: 50, sortable: false,
            // render index of table
            renderCell: (index) => {
                // console.log(index);
                return (
                    <strong>{index.api.getRowIndex(index.id) + 1}</strong>
                )
            }
        },
        {
            field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Title', minWidth: 250, flex: 1,
            renderCell: (params) => {
                return (
                    <Link sx={{ cursor: 'pointer', textDecoration: 'none' }}onClick={() => handleRowClickDataset(params)}>
                        {params.row?.title}
                    </Link>
                )
            }
        },
        { field: 'path', headerClassName: 'super-app-theme--header', headerName: 'Path', minWidth: 200, flex: 1, sortable: false, },
        { field: 'numberOfSamples', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Number Of Samples', minWidth: 200, flex: 1, sortable: false, },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 80, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onDelete = (e) => {
                    const datasetId = params.row.id;
                    dispatch(deleteDatasetAsync(datasetId)).then((res) => {
                        console.log(res);
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    });;
                };

                return (
                    <Button variant="contained" color="error" size="small" onClick={onDelete}>Delete</Button>
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
                            Datasets
                            <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Typography color="text.primary">Datasets</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /dataset/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate('/admin/datasets/add')}
                        >
                            Add Dataset
                        </Button>
                    </BoxStack>


                    <DataTable rows={datasets} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default Datasets
