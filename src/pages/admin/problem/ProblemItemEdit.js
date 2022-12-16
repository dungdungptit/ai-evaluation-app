import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, MenuItem, Breadcrumbs, Link, ListSubheader, FormControl, InputLabel, Select } from '@mui/material';

import { problems } from '../../../data/problems';
import { groups } from '../../../data/group';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProblemAsync, getProblemByIdAsync, problemSelector, updateProblemAsync } from '../../../store/reducers/problemSlice';
import { getAllGroupsAsync, getGroupByIdAsync, groupSelector, groupsSelector } from '../../../store/reducers/groupSlice';
import { getAllSubgroupsAsync, subgroupsSelector } from '../../../store/reducers/subgroupSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';

function makeItems(data) {
    const items = [];
    for (let group of data) {
        items.push(<ListSubheader key={group.id}>{group.title}</ListSubheader>);
        for (let subgroup of group.subgroups) {
            items.push(<MenuItem key={subgroup.id} value={subgroup.id}>{subgroup.title}</MenuItem>);
        }
    }
    return items;
}

const checkEmpty = (data) => {
    for (const key in data) {
        if (data[key] === '') {
            return true;
        }
    }
    return false;
}


const ProblemItemEdit = ({ state }) => {
    // state = "new" or "edit"
    const [loading, setLoading] = useState(false);
    const [messageValidate, setMessageValidate] = useState('')
    const [problem, setProblem] = React.useState(
        {
            title: '',
            description: '',
            inputDescription: '',
            outputDescription: '',
            subGroupId: '',
        }
    );

    useEffect(() => {
        checkEmpty(problem) ? setMessageValidate('Please fill all fields') : setMessageValidate('');
    }, [problem])

    const navigate = useNavigate();
    const params = useParams();
    const problemId = params.id;

    const dispatch = useDispatch();
    const problemItem = useSelector(problemSelector);
    const groups = useSelector(groupsSelector);
    const subgroups = useSelector(subgroupsSelector);
    console.log(problemItem);


    useEffect(() => {
        dispatch(getAllGroupsAsync());
        dispatch(getAllSubgroupsAsync());
        dispatch(getProblemByIdAsync(problemId)).then((res) => {
            setProblem(res.payload.data);
        });
    }, [dispatch, problemId])


    const handleChange = (event) => {
        const name = event.target.name;
        setProblem({
            ...problem,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        const newProblem = {
            id: problemItem.id,
            title: problem.title,
            description: problem.description,
            inputDescription: problem.inputDescription,
            outputDescription: problem.outputDescription,
            subGroupId: problem.subGroupId,
        }
        if (checkEmpty(newProblem)) {
            return;
        }
        else {
            setLoading(true);
            dispatch(updateProblemAsync(newProblem)).then((res) => {
                setLoading(false);
                console.log(res);
                // navigate('/admin/problems');
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
                        Edit Problem
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

                {/* subgroup */}
                <FormControl sx={{ width: '100%', mb: 2 }} variant="outlined">
                    <InputLabel id="demo-simple-select-outlined-label">Subgroup</InputLabel>

                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={problem.subGroupId}
                        label="Subgroup"
                        name="subGroupId"
                        onChange={handleChange}
                    >
                        {makeItems(groups)}
                    </Select>

                </FormControl>


                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/problems')}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
                </Box>
            </Paper>
            {/* end form */}

        </BoxContainer >
    )
}

ProblemItemEdit.propTypes = {
    ProblemItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default ProblemItemEdit

