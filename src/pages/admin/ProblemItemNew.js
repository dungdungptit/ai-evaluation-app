import { Fragment, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import React from 'react'
import PropTypes from 'prop-types'

// @mui/material
import { Container, Typography, Paper, Box, TextField, Stack, backdropClasses, Button, FormControl, InputLabel, Select, MenuItem, ListSubheader, Menu, Breadcrumbs, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { problems } from '../../data/problems';
import { groups } from '../../data/group';

const ProblemItemNew = ({ state }) => {
    // state = "new" or "edit"
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    console.log(state);

    // if (state === "edit") {
    const ProblemItem = problems.find((problem) => problem.id.toString() === params.id);
    // console.log("param", ProblemItem);

    const [problem, setProblem] = React.useState(
        state === "edit" ? ProblemItem : {
            title: '',
            group: '',
            subgroup: '',
            description: '',
            inputDescription: '',
            outputDescription: '',
        }
    );


    const handleChange = (event) => {
        const name = event.target.name;
        setProblem({
            ...problem,
            [name]: event.target.value,
        });
        console.log(problem);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        console.log(problem);
        // navigate('/admin/problems');
    };

    return (
        <Fragment>
            <Container maxWidth="lg">
                <Box sx={{
                    height: "auto",
                    minWidth: { xs: 300, sm: 600, md: 900 }, px: { xs: 0, md: 3 },
                    flexGrow: 1,
                }} >
                    <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                        Problems Details
                        <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                            <Link underline="hover" color="inherit" href="">
                                Home
                            </Link>
                            <Link underline="hover" color="inherit" href="/admin/problems">
                                Problems
                            </Link>
                            <Typography color="text.primary">
                                {state === "add" ? "New Problem" : "Edit Problem"}
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
                            defaultValue={problem.title}
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
                            defaultValue={problem.description}
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
                            defaultValue={problem.inputDescription}
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
                            defaultValue={problem.outputDescription}
                            name="outputDescription"
                            onChange={handleChange}
                        />
                        {/* group */}
                        <TextField sx={{ m: 1, width: "100%" }}
                            id="outlined-select-currency"
                            select
                            label="Group"
                            value={problem.group}
                            name="group"
                            onChange={handleChange}
                        >
                            {groups.map((group) => (
                                <MenuItem key={group.id} value={group.title}>
                                    {group.title}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Subgroup */}
                        <TextField sx={{ m: 1, width: "100%" }}
                            id="outlined-select-currency"
                            select
                            label="Subgroup"
                            value={problem.subgroup}
                            name="subgroup"
                            onChange={handleChange}
                        >
                            {problem.group === "" ? <MenuItem value="">Select Group First</MenuItem> :
                                groups.find((group) => group.title === problem.group).subgroups.map((subgroup) => (
                                    <MenuItem key={subgroup.id} value={subgroup.title}>
                                        {subgroup.title}
                                    </MenuItem>
                                ))
                            }

                        </TextField>

                        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                            <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/problems')}>Cancel</Button>
                            <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
                            {/* <Button variant="contained" sx={{ ml: 2 }} onClick={() => navigate('/admin/problems')}>Back</Button> */}
                        </Box>
                    </Paper>
                    {/* end form */}
                </Box>
            </Container>
        </Fragment >
    )
}

ProblemItemNew.propTypes = {
    ProblemItem: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default ProblemItemNew

