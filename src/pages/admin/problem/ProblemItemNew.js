import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, MenuItem, Breadcrumbs, Link, CircularProgress, Alert } from '@mui/material';

import { problems } from '../../../data/problems';
import { groups } from '../../../data/group';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProblemAsync } from '../../../store/reducers/problemSlice';
import { getAllGroupsAsync, groupsSelector } from '../../../store/reducers/groupSlice';
import { getAllSubgroupsAsync, subgroupsSelector } from '../../../store/reducers/subgroupSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';
import { green } from '@mui/material/colors';
import { datasetsSelector, getAllDatasetsAsync } from '../../../store/reducers/datasetSlice';

const checkEmpty = (data) => {
    for (const key in data) {
        if (data[key] === '') {
            return true;
        }
    }
    return false;
}


const ProblemItemNew = ({ state }) => {
    // state = "new" or "edit"
    const [loading, setLoading] = useState(false);
    const [messageValidate, setMessageValidate] = useState('')
    const [problem, setProblem] = React.useState(
        {
            title: '',
            description: '',
            inputDescription: '',
            outputDescription: '',
            groupId: '',
            subGroupId: '',
            datasetId: '',
        }
    );

    const groups = useSelector(groupsSelector);
    const subgroups = useSelector(subgroupsSelector);
    const datasets = useSelector(datasetsSelector);
    console.log(groups);
    const navigate = useNavigate();


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllSubgroupsAsync());
        dispatch(getAllDatasetsAsync());
    }, [dispatch])


    const handleChange = (event) => {
        const name = event.target.name;
        setProblem({
            ...problem,
            [name]: event.target.value,
        });
        console.log(problem);
    };

    useEffect(() => {
        checkEmpty(problem) ? setMessageValidate('Please fill all fields') : setMessageValidate('');
    }, [problem])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        const newProblem = {
            title: problem.title,
            description: problem.description,
            inputDescription: problem.inputDescription,
            outputDescription: problem.outputDescription,
            subGroupId: problem.subGroupId,
            datasetId: problem.datasetId,
        }
        if (checkEmpty(newProblem)) {
            return;
        }
        else {
            setLoading(true);
            dispatch(addNewProblemAsync(newProblem)).then((res) => {
                setLoading(false);
                console.log(res);
                if (res.type === 'problem/addNewProblem/fulfilled') {
                    navigate('/admin/problems');
                }
            }).catch((err) => {
                setLoading(false);
                console.log(err);
            })
        }
    };

    return (
        <BoxContainer>
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
                sx={{ mt: 2, mb: 3, }}
            >
                Problems Details
                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                    <Link underline="hover" color="inherit" href="">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/admin/problems">
                        Problems
                    </Link>
                    <Typography color="text.primary">
                        New Problem
                    </Typography>
                </Breadcrumbs>
            </Typography>
            {/* form */}
            <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, p: 3 }} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="outlined-basic"
                    label="Problem Name"
                    variant="outlined"
                    value={problem.title}
                    name="title"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="outlined-basic"
                    label="Problem Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={problem.description}
                    name="description"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="outlined-basic"
                    label="Problem Input"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={problem.inputDescription}
                    name="inputDescription"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="outlined-basic"
                    label="Problem Output"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={problem.outputDescription}
                    name="outputDescription"
                    onChange={handleChange}
                />
                {/* Lable */}
                <TextField sx={{ m: 1, width: "100%" }}
                    id="outlined-select-currency"
                    select
                    label="Dataset"
                    value={problem.datasetId}
                    name="datasetId"
                    onChange={handleChange}
                    InputProps={{
                        required: true,
                    }}
                >

                    {!!datasets && datasets?.length > 0 &&
                        datasets.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.title}
                            </MenuItem>
                        ))
                    }
                </TextField>
                {/* group */}
                <TextField sx={{ m: 1, width: "100%" }}
                    id="outlined-select-currency"
                    select
                    label="Group"
                    value={problem.groupId}
                    name="groupId"
                    onChange={handleChange}
                >
                    {groups.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.title}
                        </MenuItem>
                    ))}
                </TextField>

                {/* Subgroup */}
                <TextField sx={{ m: 1, width: "100%", mb: 3 }}
                    id="outlined-select-currency"
                    select
                    label="Subgroup"
                    value={problem.subGroupId}
                    name="subGroupId"
                    onChange={handleChange}
                >
                    {subgroups.map((option) =>
                        option.groupId === problem.groupId &&
                        <MenuItem key={option.id} value={option.id}>
                            {option.title}
                        </MenuItem>
                    )}

                </TextField>

                {messageValidate && messageValidate !== '' ? <Alert sx={{ width: "100%", boxSizing: 'border-box' }} severity="error">{messageValidate}</Alert> : null}

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/problems')}>Cancel</Button>
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

ProblemItemNew.propTypes = {
    ProblemItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default ProblemItemNew

