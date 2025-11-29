import React from 'react'
import { Link as RouterNavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logout from "../auth/Logout";
// import Profile from "../pages/protectedPage/user/Profile";
import { ButtonGroup } from "@mui/material";
import styles from '../css/layout.module.css'
import { useAuth } from '../context/AuthContext';
export default function NavBar() {
    const {user} = useAuth();
    console.log('using useContext', user)
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openLogout, setOpenLogout] = useState<boolean>(false)
    // const [openProfile, setOpenProfile] = useState<boolean>(false)
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenLogout = () => setOpenLogout(true)
    const handleCloseLogout = () => setOpenLogout(false)
    const handleNextRouterProfile = () => {
        navigate('/profile', {replace: false});
    }
    // khi người dùng đăng nhập, sẽ có token
    // và hiện giờ token đang được lưu ở localStorage, nên mình sẽ lấy từ đó ra để kiểm tra
    // nếu có thì là người dùng đã đăng nhập còn nếu không thì là chưa
    const token = localStorage.getItem('token');
    const nextRouteLogin = () => {
        navigate('/login', { replace: true })
    }
    const nextRouteRegister = () => {
        navigate('/register')
    }
    return (
        <div
            className={styles.formDiv}
        >
            <AppBar position="fixed" color='secondary'>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TESTX
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                <MenuItem onClick={() => alert('dcmm nhuw con cak')}>
                                    <Typography>
                                        Trang chủ
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>
                                        Giới thiệu
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>
                                        Tính năng
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>
                                        Tin tức
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>
                                        Hướng dẫn
                                    </Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography>
                                        Liên hệ
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            TEST X
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, zIndex: 1 }}>
                            <MenuItem component={RouterNavLink} to="/" sx={{ color: 'white' }}>
                                Trang chủ
                            </MenuItem>
                            <MenuItem component={RouterNavLink} to="/about" sx={{ color: 'white' }}>
                                Giới thiệu
                            </MenuItem>
                            <MenuItem component={RouterNavLink} to="/feature" sx={{ color: 'white' }}>
                                Tính năng
                            </MenuItem>
                            <MenuItem component={RouterNavLink} to="/news" sx={{ color: 'white' }}>
                                Tin tức
                            </MenuItem>
                            <MenuItem component={RouterNavLink} to="/tutorials" sx={{ color: 'white' }}>
                                Hướng dẫn
                            </MenuItem>
                            <MenuItem component={RouterNavLink} to="/contact" sx={{ color: 'white' }}>
                                Liên hệ
                            </MenuItem>
                        </Box>
                        {token ? (
                            <Box sx={{ flexGrow: 0 , display: 'flex', flexDirection: 'row', justifyContent: 'center'
                                ,alignItems: 'center'
                            }}>
                                <Typography sx={{p: 2}}>
                                    {user ? `Chào mừng ${user.fullName}` : 'đăng nhập đi...'}
                                </Typography>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleNextRouterProfile}>
                                        <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography sx={{ textAlign: 'center' }}>Settings</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleOpenLogout}>
                                        <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (<Box>
                            <ButtonGroup>
                                <Button onClick={nextRouteLogin} sx={{ zIndex: 1 }} variant="text" color="error" >Đăng nhập</Button>
                                <Button onClick={nextRouteRegister} sx={{ zIndex: 1 }} variant="text" color="error" >Đăng ký</Button>
                            </ButtonGroup>
                        </Box>)}
                    </Toolbar>
                </Container>
            </AppBar>
            <Logout open={openLogout} handleClose={handleCloseLogout} />
        </div>
    )
}
