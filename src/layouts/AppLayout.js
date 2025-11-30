import {
    AppBar, Box, CssBaseline, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,

    Toolbar,
    Typography
} from "@mui/material";
import { NavLink, Outlet } from 'react-router-dom';
import {useMemo} from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
const navItems = [
    {
        to: '/products',
        label: 'Products',
        icon: <InventoryIcon />
    },
    {
        to: '/orders',
        label: 'Orders',
        icon: <ShoppingCartIcon />
    }
];

const AppLayout = () => {

    const drawer = (
        <div>
            <Toolbar>
                <Typography variant="h6">Inventory Admin</Typography>
            </Toolbar>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.to} disablePadding>
                        <ListItemButton component={NavLink} to={item.to}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
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
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - 240px)` },
                        mt: 8
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </>
    );
};

export default AppLayout;

