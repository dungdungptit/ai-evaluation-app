import { React, Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, Breadcrumbs, Link } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { getGroupByIdAsync, groupSelector, updateGroupAsync } from '../../../store/reducers/groupSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';



const GroupEdit = () => {
    // state = "new" or "edit"
    const [group, setGroup] = useState(
        {
          title: '',
          description: '',
        }
    );

    const navigate = useNavigate();
    const params = useParams();
    const groupId = params.id;

    const dispatch = useDispatch();
    const groupItem = useSelector(groupSelector);
    console.log(group);


    useEffect(() => {
        dispatch(getGroupByIdAsync(groupId)).then((res) => {
            setGroup(res.payload.data);
        });
    }, [dispatch, groupId])


    const handleChange = (event) => {
        const name = event.target.name;
        setGroup({
            ...group,
            [name]: event.target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submit");
        const newGroup = {
          id: groupItem.id,
          title: group.title,
          description: group.description,
        }
        dispatch(updateGroupAsync(newGroup));
        navigate('/admin/group');
    };

    return (
        <BoxContainer>

            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
                sx={{ mt: 2, mb: 3, }}
            >
                Groups Details
                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                    <Link underline="hover" color="inherit" href="">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/admin/groups">
                        Groups
                    </Link>
                    <Typography color="text.primary">
                        Edit Group
                    </Typography>
                </Breadcrumbs>
            </Typography>
            {/* form */}
            <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, p: 3 }} component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="title"
                    label="Title"
                    variant="outlined"
                    value={group.title}
                    name="title"
                    onChange={handleChange}
                />
                <TextField
                    sx={{ width: '100%', mb: 2 }}
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    type="description"
                    value={group.description}
                    name="description"
                    onChange={handleChange}
                />
                

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
                    <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/groups')}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
                </Box>
            </Paper>
            {/* end form */}

        </BoxContainer >
    )
}

GroupEdit.propTypes = {
    Group: PropTypes.object,
    rơwsData: PropTypes.array,
};

export default GroupEdit

