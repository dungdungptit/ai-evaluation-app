// @mui
import { Typography, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { useLocation, useNavigate, useParams } from "react-router-dom";

import {
    BoxContainer,
    BoxTitle,
    BoxStack,
} from '../../../components/Box/BoxContainer';
import DataTable from '../../../components/DataTable/DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { getDatasetAsync, datasetSelector, deleteDatasetSampleAsync } from '../../../store/reducers/datasetSlice.js';
import { getDataset } from '../../../services/datasetApi';


const DatasetItem = () => {
    const dispatch = useDispatch();
    const datasetItem = useSelector(datasetSelector);
    const datasetSamples = datasetItem?.samples || [];
    const datasetId = useParams().id;

    useEffect(() => {
        dispatch(getDatasetAsync(datasetId));
    }, [dispatch]);

    console.log(datasetItem);
    console.log(datasetSamples);

    const location = useLocation();

    // Click render DatasetItem
    const navigate = useNavigate();

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
        { field: 'title', headerClassName: 'super-app-theme--header', headerName: 'Title', minWidth: 200, flex: 1, sortable: false, },
        { field: 'path', headerClassName: 'super-app-theme--header', headerName: 'Path', minWidth: 200, flex: 1, sortable: false, },
        {
            field: 'size', headerClassName: 'super-app-theme--header', headerName: 'Size', minWidth: 200, flex: 1, sortable: false,
            renderCell: (params) => {
                return (
                    params.value && params.value > 1024 ?
                        <p>{(params.value / 1024).toFixed(0)} KB</p> :
                        <p>{params.value} B</p>
                )
            }
        },
        {
            field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: 'Action', flex: 1, minWidth: 80, sortable: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    return alert(JSON.stringify(currentRow, null, 4));
                };

                const onDelete = (e) => {
                    const sampleId = params.row.id;
                    dispatch(deleteDatasetSampleAsync(sampleId)).then((res) => {
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
                            Datasets Detail
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    Home
                                </Link>
                                <Link underline="hover" color="inherit" href="">
                                    Datasets
                                </Link>
                                <Typography color="text.primary">{datasetItem?.title}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Add custom button to the toolbar */}
                        {/* a link to /dataset/Add */}
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => navigate(`/admin/dataset/addsample/${datasetId}`)}
                        >
                            Add Dataset
                        </Button>
                    </BoxStack>


                    <DataTable rows={datasetSamples} columns={columns} />

                </BoxTitle>
            </BoxContainer>
        </Fragment >
    )
}

export default DatasetItem
