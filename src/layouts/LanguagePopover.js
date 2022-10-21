import React, { useState } from 'react'
// material
import vnLogo from '../assets/images/VN.png';
import enLogo from '../assets/images/Eng.png';
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Menu } from '@mui/material';
import { Fragment } from 'react';

const LANGS = [
    {
      value: 'vn',
      label: 'Tiếng Việt',
      icon: vnLogo,
    },
    {
      value: 'en',
      label: 'English',
      icon: enLogo,
    },
  ];

const LanguagePopover = () => {
    const [anchorElLanguage, setAnchorElLanguage] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleOpenLanguageMenu = (event) => {
        setAnchorElLanguage(event.currentTarget);
    };

    const handleSelectLanguage = (event, index) => {
        setSelectedIndex(index);
        setAnchorElLanguage(null);
    };

    const handleCloseLanguageMenu = () => {
        setAnchorElLanguage(null);
    };

    return (
        <Fragment>
            <IconButton
                onClick={handleOpenLanguageMenu}
                sx={{
                    ml: 2,
                    p: 0,
                    color: 'text.secondary',
                    '&:hover': { bgcolor: alpha('#000000', 0.04) },
                }}
            >
                <img src={LANGS[selectedIndex].icon} alt="language" style={{width: 32}}/>
            </IconButton>
            <Menu
                id="menu-language"
                anchorEl={anchorElLanguage}
                open={Boolean(anchorElLanguage)}
                onClose={handleCloseLanguageMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {LANGS.map((lang, index) => (
                    <MenuItem
                        key={lang.value}
                        selected={index === selectedIndex}
                        onClick={(event) => handleSelectLanguage(event, index)}
                        sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <img src={lang.icon} alt="language" />
                            <span>{lang.label}</span>
                        </Stack>
                    </MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}

export default LanguagePopover;