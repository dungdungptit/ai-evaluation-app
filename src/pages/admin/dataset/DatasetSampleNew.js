import { React, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, Breadcrumbs, Link, Alert, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


// import { addNewDatasetAsync } from '../../../store/reducers/datasetSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';
import { useDispatch, useSelector } from 'react-redux';

import { addNewDatasetSampleAsync, datasetSelector, getAllDatasetsAsync, getDatasetAsync } from '../../../store/reducers/datasetSlice';
import { green } from '@mui/material/colors';

const checkName2ListFile = (list1, list2) => {
    if (list1?.length !== list2?.length) {
        return false;
    }
    if (list1?.length > 0 && list2?.length > 0) {
        const list1Name = list1.map((item) => item.name.split('.')[0]);
        const list2Name = list2.map((item) => item.name.split('.')[0]);
        console.log(list1Name);
        console.log(list2Name);
        return list1Name.every((item) => list2Name.includes(item)) && list1Name?.length === list2Name?.length;
    }
    return false;
}

const checkEmpty = (dataset) => {
    for (const key in dataset) {
        if (dataset[key] === '') {
            return true;
        }
    }
    return false;
}

const checkDuplicate = (dataset, datasets) => {
    return datasets.some((item) => item.path === String(dataset.title).toLowerCase().replace(/\ /g, '_'));
}

const DatasetSampleNew = () => {
    // state = "new" or "edit"
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const datasetId = useParams().id;
    const datasetItem = useSelector(datasetSelector);
    useEffect(() => {
        dispatch(getDatasetAsync(datasetId));
    }, [dispatch]);
    const [videos, setVideos] = useState([])
    const [results, setResults] = useState([])
    const [messageValidate, setMessageValidate] = useState('')

    const isValidFileVideos = (file) => {
        const validExtensions = ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv', 'webm', 'mpeg', 'mpg', 'm4v', '3gp', '3g2', 'gif', 'gifv', 'mng', 'qt', 'yuv', 'rm', 'rmvb', 'asf', 'amv', 'm4p', 'm4v', 'svi', '3gp', '3g2', 'mxf', 'roq', 'nsv', 'f4v', 'f4p', 'f4a', 'f4b']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    const fileChangedHandlerVideos = (e) => {
        if (e.target.files?.length < 1) {
            return;
        }
        const files = e.target.files;
        console.log(files);
        const filesChecked = []
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            if (isValidFileVideos(file)) {
                //file is valid
                console.log(file);
                filesChecked.push(file)
            } else {
                //file is invalid
            }
        }
        setVideos([...filesChecked])
    }

    const isValidFileCsvs = (file) => {
        const validExtensions = ['csv']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }

    const fileChangedHandlerCsvs = (e) => {
        if (e.target.files?.length < 1) {
            return;
        }
        const files = e.target.files;
        console.log(files);
        const filesChecked = []
        for (let i = 0; i < files?.length; i++) {
            const file = files[i];
            if (isValidFileCsvs(file)) {
                //file is valid
                console.log(file);
                filesChecked.push(file)
            } else {
                //file is invalid
            }
        }
        setResults([...filesChecked])
    }

    useEffect(() => {
        if (!checkName2ListFile(videos, results)) {
            setMessageValidate('Please check the name of the video and the result file are the same and the same number of files')
        }
        else {
            setMessageValidate('')
        }
    }, [videos, results])

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = document.getElementById("form");
        const formData = new FormData(form);
        if (!checkName2ListFile(videos, results)) {
            return;
        }
        else {
            setLoading(true);
            dispatch(addNewDatasetSampleAsync(formData)).then((res) => {
                console.log(res);
                setLoading(false);
                if (res.type === 'dataset/addNewDatasetSample/fulfilled') {
                    navigate(`/admin/datasets/${datasetId}`);
                }
            }).catch((err) => {
                console.log(err);
                setLoading(false);
            })
        }
        // navigate('/admin/dataset');
    };

    const handleDeleteVideo = (index) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        setVideos(newVideos);
    }

    const handleDeleteResult = (index) => {
        const newResults = [...results];
        newResults.splice(index, 1);
        setResults(newResults);
    }

    const handleChangeDeleteAllVideos = () => {
        setVideos([]);
    }

    const handleChangeDeleteAllResults = () => {
        setResults([]);
    }

    return (
        <BoxContainer>

            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
                sx={{ mt: 2, mb: 3, }}
            >
                Datasets Detail
                <Breadcrumbs maxItems={4} aria-label="breadcrumb" sx={{ mt: 1 }}>
                    <Link underline="hover" color="inherit" href="">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/admin/datasets">
                        Datasets
                    </Link>
                    <Link underline="hover" color="inherit" href={`/admin/datasets/${datasetId}`}>
                        {datasetItem?.title}
                    </Link>
                    <Typography color="text.primary">
                        Add Samples
                    </Typography>
                </Breadcrumbs>
            </Typography>
            {/* form */}
            <Paper id='form' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, p: 3 }} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>

                <TextField
                    id="title"
                    name="datasetId"
                    label="Title"
                    variant="outlined"
                    sx={{ width: '100%', mb: 2, display: 'none' }}
                    value={datasetId}
                    InputProps={{
                        required: true,
                        hidden: true,
                        readOnly: true,
                    }}
                />

                {/* videos multiple file*/}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', mt: 2, mb: 2, width: '100%' }}>
                    <Box >
                        <Typography variant="h6" component="h2" fontWeight='bold' gutterBottom
                            sx={{ mt: 2, mb: 3, }}
                        >
                            Input(Videos)

                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
                            <input
                                accept="video/*"
                                id="datas"
                                multiple
                                type="file"
                                name='videos'
                                onChange={fileChangedHandlerVideos}
                                sx={{ display: 'none' }}
                            />
                            {/* <label htmlFor="datas">
              </label> */}
                            {/* <Button variant="contained" component="span" size="small" onClick={handleChangeDeleteAllVideos} color="error">
                Delete All
              </Button> */}
                        </Box>
                        {/* display file name */}
                        {videos?.length > 0 && videos.map((video, index) => (
                            <Typography variant="body2" component="p" fontWeight='bold' gutterBottom key={index}
                                sx={{ mt: 2, mb: 3, fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {video.name}
                                {/* <IconButton aria-label="delete" onClick={() => handleDeleteVideo(index)}>
                  <DeleteIcon />
                </IconButton> */}
                            </Typography>
                        ))}
                    </Box>



                    {/* results multiple file*/}
                    <Box >
                        <Typography variant="h6" component="h2" fontWeight='bold' gutterBottom
                            sx={{ mt: 2, mb: 3, }}
                        >
                            Output(Results csv)
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 2 }}>
                            <input
                                accept=".csv"
                                id="results"
                                multiple
                                type="file"
                                name='results'
                                onChange={fileChangedHandlerCsvs}
                                sx={{ display: 'none' }}
                            />
                            {/* <label htmlFor="results">
              </label> */}
                            {/* <Button variant="contained" component="span" size="small" onClick={handleChangeDeleteAllResults} color="error">
                Delete All
              </Button> */}
                        </Box>
                        {/* display file name */}
                        {results?.length > 0 && results.map((result, index) => (
                            <Typography variant="body2" component="p" fontWeight='bold' gutterBottom key={index}
                                sx={{ mt: 2, mb: 3, fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                {result.name}
                                {/* <IconButton aria-label="delete" onClick={() => handleDeleteResult(index)}>
                  <DeleteIcon />
                </IconButton> */}
                            </Typography>
                        ))}

                    </Box>
                </Box>

                {messageValidate && messageValidate !== '' ? <Alert sx={{ width: "100%", boxSizing: 'border-box' }} severity="error">{messageValidate}</Alert> : null}

                {/* submit */}
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/datasets')}>Cancel</Button>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button variant="contained" type="submit" sx={{ ml: 2 }}
                            disabled={messageValidate !== '' || loading}
                        >
                            Submit
                            {loading && (
                                <CircularProgress
                                    size={24}
                                    sx={{
                                        color: green[500],
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        marginTop: '-12px',
                                        marginLeft: '-12px',
                                    }}
                                />
                            )}
                        </Button>
                    </Box>
                </Box>
            </Paper>
            {/* end form */}

        </BoxContainer >
    )
}

DatasetSampleNew.propTypes = {
    Dataset: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default DatasetSampleNew

