import React from "react";
import {AppBar, Box, Typography} from "@mui/material";

export default function Layout({children}: React.PropsWithChildren<{}>) {

    return (
        <>
            <AppBar position="static">
                <Typography variant="h3" align="center" component="div" sx={{flexGrow: 1}}>
                    Corporate employees
                </Typography>
            </AppBar>

            <Box component="main">
                {children}
            </Box>
        </>
    );
}
