import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const HeaderComponent = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar variant="dense">
                    JMJT
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default HeaderComponent
