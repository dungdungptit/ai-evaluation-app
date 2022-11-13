import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const SidebarBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
})

const AdminSidebar = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const navigate = useNavigate();

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        if(index === 0) {
            console.log("index = 0");
            navigate('/');
        }
        else if(index === 1) {
            console.log("index = 1");
            navigate('/admin/problems');
        }
        else if(index === 2) {
            console.log("index = 2");
            navigate('/admin/group');
        }
        else if(index === 3) {
            console.log("index = 3");
            navigate('/admin/subgroup');
        }
        else if(index === 4) {
            console.log("index = 4");
            navigate('admin/submission');
        }
    };

    return (
      <Stack sx={{
        display: { xs: 'none', lg: 'flex' },
        minWidth: { xs: 0, lg: 280 },
      }}>
            <SidebarBox p={1}>
                <Link className='' to={"/"} style={{textDecoration: 'none'}}>
                    <Stack direction="row" spacing={0} alignItems="center">
                        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, p: 1, color: "#000", fontWeight: "bold" }}>
                            AI Evalution App
                        </Typography>
                        <MenuOpenIcon sx={{
                          color: "#6d7073",
                        }} />
                    </Stack>
                </Link>
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    // subheader={
                    //     <ListSubheader component="div" id="nested-list-subheader">
                    //         Nested List Items
                    //     </ListSubheader>
                    // }
                >
                    <ListItemButton
                        component={Link}
                        to={"/admin/problems"}
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <QuizIcon />
                        </ListItemIcon>
                        <ListItemText primary="Problems" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/users"}
                        selected={selectedIndex === 1}
                        onClick={(event) => handleListItemClick(event, 1)}
                    >
                        <ListItemIcon>
                            <AccountBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="User" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/group"}
                        selected={selectedIndex === 2}
                        onClick={(event) => handleListItemClick(event, 2)}
                    >
                        <ListItemIcon>
                            <WebAssetIcon />
                        </ListItemIcon>
                        <ListItemText primary="Group" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/subgroup"}
                        selected={selectedIndex === 3}
                        onClick={(event) => handleListItemClick(event, 3)}
                    >
                        <ListItemIcon>
                            <DynamicFeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Subroup" />
                    </ListItemButton>
                    <ListItemButton
                        component={Link}
                        to={"/admin/submission"}
                        selected={selectedIndex === 4}
                        onClick={(event) => handleListItemClick(event, 4)}
                    >
                        <ListItemIcon>
                            <CheckBoxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Submission" />
                    </ListItemButton>
                    
                </List>
            </SidebarBox>
        </Stack>
    )
}

export default AdminSidebar