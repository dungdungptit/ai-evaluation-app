import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

// @mui/material
import { Typography, Paper, Box, TextField, Button, Breadcrumbs, Link, MenuItem } from '@mui/material';

import { addNewSubgroupAsync } from '../../../store/reducers/subgroupSlice';
import { BoxContainer } from '../../../components/Box/BoxContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGroupsAsync, groupsSelector } from '../../../store/reducers/groupSlice';



const SubgroupNew = () => {
  // state = "new" or "edit"
  const [subgroup, setSubgroup] = useState(
    {
      title: '',
      description: '',
      groupId: '',
    }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const groups = useSelector(groupsSelector);

  useEffect(() => {
    dispatch(getAllGroupsAsync());
  }, [dispatch])

  const handleChange = (event) => {
    const name = event.target.name;
    setSubgroup({
      ...subgroup,
      [name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submit");
    const newSubgroup = {
      title: subgroup.title,
      description: subgroup.description,
      groupId: subgroup.groupId,
    }
    dispatch(addNewSubgroupAsync(newSubgroup));
    navigate('/admin/subgroup');
  };

  return (
    <BoxContainer>

      <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom
        sx={{ mt: 2, mb: 3, }}
      >
        Subgroups Details
        <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
          <Link underline="hover" color="inherit" href="">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/admin/subgroups">
            Subgroups
          </Link>
          <Typography color="text.primary">
            Edit Subgroup
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
          value={subgroup.title}
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
          value={subgroup.description}
          name="description"
          onChange={handleChange}
        />
        <TextField sx={{ m: 1, width: "100%" }}
          id="outlined-select-currency"
          select
          label="Group"
          value={subgroup.groupId}
          name="groupId"
          onChange={handleChange}
        >
          {groups.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.title}
            </MenuItem>
          ))}
        </TextField>


        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', mt: 2, mb: 2 }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={() => navigate('/admin/subgroups')}>Cancel</Button>
          <Button variant="contained" type="submit" sx={{ ml: 2 }}>Submit</Button>
        </Box>
      </Paper>
      {/* end form */}

    </BoxContainer >
  )
}

SubgroupNew.propTypes = {
  Subgroup: PropTypes.object,
  rơwsData: PropTypes.array,
};

export default SubgroupNew

