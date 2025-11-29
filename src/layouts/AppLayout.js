import {
    AppBar, Box, CssBaseline, Drawer,

    Toolbar,
    Typography
} from "@mui/material";



const AppLayout = () => {

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - 240px)` },
                        ml: { sm: `240px` }
                    }}
                >
                    <Toolbar>

                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Inventory Dashboard
                        </Typography>


                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: `240px` }, flexShrink: { sm: 0 } }}
                    aria-label="navigation"
                >

                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width:`240px`
                            }
                        }}
                        open
                    >

                    </Drawer>
                </Box>
            </Box>
        </>
    );
};

export default AppLayout;

