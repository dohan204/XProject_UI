import React from 'react'
import { Link as RouterNavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { ButtonGroup } from "@mui/material";
import styles from '../css/layout.module.css'
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    // ⭐ Lấy user và logout từ context
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);  // ⭐ Loading state

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNextRouterProfile = () => {
        navigate('/profile', { replace: false });
        handleCloseUserMenu();
    };

    const handleLogout = async () => {
        setIsLoggingOut(true);
        handleCloseUserMenu();
        
        try {
            localStorage.removeItem('token')
            await logout();  // ⭐ Gọi logout từ context
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
        }
    };

    const nextRouteLogin = () => {
        navigate('/login', { replace: true });
    };

    const nextRouteRegister = () => {
        navigate('/register');
    };

    const next = (url: string) => {
        navigate(url);
    };

    return (
        <div className={styles.formDiv}>
            <AppBar position="fixed" sx={{ bgcolor: 'white' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{height: '12vh'}}>
                        {/* Logo */}
                        <Box width={'100%'} display={'flex'} justifyContent={'flex-start'} alignItems={'center'}>
                            <AdbIcon sx={{ mr: 1, fontSize: '40px' }} color='secondary' />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'black',
                                    textDecoration: 'none',
                                    fontSize: '40px'
                                }}
                            >
                                TESTX
                            </Typography>
                        </Box>

                        {/* Menu giữa */}
                        <Box sx={{ flexGrow: 1, display: 'flex', zIndex: 1, width: '100%', justifyContent: 'center' }}>
                            <MenuItem 
                                component={RouterNavLink} 
                                to="/" 
                                sx={{
                                    color: 'black', 
                                    fontFamily: 'Arial', 
                                    fontSize: 25, 
                                    '&:hover, &:active, &:focus': {
                                        borderRadius: 20,
                                        color: 'rgba(255, 0, 128, 0.6)'
                                    }
                                }}
                            >
                                Trang chủ
                            </MenuItem>
                            <MenuItem 
                                component={RouterNavLink} 
                                to="/about" 
                                sx={{
                                    color: 'black', 
                                    fontFamily: 'Arial', 
                                    fontSize: 25, 
                                    '&:hover, &:active, &:focus': {
                                        borderRadius: 20,
                                        color: 'rgba(255, 0, 128, 0.6)'
                                    }
                                }}
                            >
                                Giới thiệu
                            </MenuItem>
                            <MenuItem 
                                component={RouterNavLink} 
                                to="/feature" 
                                sx={{
                                    color: 'black', 
                                    fontFamily: 'Arial', 
                                    fontSize: 25, 
                                    '&:hover, &:active, &:focus': {
                                        borderRadius: 20,
                                        color: 'rgba(255, 0, 128, 0.6)'
                                    }
                                }}
                            >
                                Tính năng
                            </MenuItem>

                            {/* ⭐ Chỉ hiện khi đã đăng nhập */}
                            {user && (
                                <>
                                    <MenuItem 
                                        component={RouterNavLink} 
                                        to="/ratingeneric" 
                                        sx={{
                                            color: 'black', 
                                            fontFamily: 'Arial', 
                                            fontSize: 25,
                                            '&:hover, &:active, &:focus': {
                                                borderRadius: 20,
                                                color: 'rgba(255, 0, 128, 0.6)'
                                            }
                                        }}
                                    >
                                        Bảng xếp hạng
                                    </MenuItem>
                                    <MenuItem 
                                        component={RouterNavLink} 
                                        to="/subject" 
                                        sx={{
                                            color: 'black', 
                                            fontFamily: 'Arial', 
                                            fontSize: 25,
                                            '&:hover, &:active, &:focus': {
                                                borderRadius: 20,
                                                color: 'rgba(255, 0, 128, 0.6)'
                                            }
                                        }}
                                    >
                                        Bài thi
                                    </MenuItem>
                                </>
                            )}
                        </Box>

                        {/* User menu hoặc Login/Register buttons */}
                        {user ? (
                            <Box 
                                width={'100%'} 
                                sx={{
                                    display: 'flex', 
                                    flexDirection: 'row', 
                                    justifyContent: 'flex-end',
                                    alignItems: 'center'
                                }}
                            >
                                {/* ⭐ Hiển thị loading khi đang logout */}
                                {isLoggingOut ? (
                                    <Typography sx={{ color: 'black', mr: 2 }}>
                                        Đang đăng xuất...
                                    </Typography>
                                ) : (
                                    <Typography sx={{ color: 'black', mr: 2 }}>
                                        Chào mừng, {user.fullName}
                                    </Typography>
                                )}

                                <Tooltip title="Cài đặt">
                                    <IconButton onClick={handleOpenUserMenu} disabled={isLoggingOut}>
                                        <PersonIcon />
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
                                        {/* <ManageAccountsTwoToneIcon sx={{ p: 1 }} /> */}
                                        <Typography sx={{ textAlign: 'center' }}>Hồ sơ</Typography>
                                    </MenuItem>
                                    {/* <MenuItem onClick={nextGroup}>
                                        <SettingsIcon sx={{ p: 1 }} />
                                        <Typography sx={{ textAlign: 'center' }}>Nhóm</Typography>
                                    </MenuItem> */}
                                    {/* ⭐ Gọi handleLogout thay vì logout trực tiếp */}
                                    <MenuItem onClick={() => next('user/favoriteExam')}>
                                        <Typography>
                                            Đề thi yêu thích
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => next('user/history')}>
                                        <Typography>
                                            Điểm thi
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => next('user/settings')}>
                                        
                                        <Typography>
                                            Cài đặt tài khoản
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        {/* <OutputIcon sx={{ p: 1 }} /> */}
                                        <Typography sx={{ textAlign: 'center' }}>Đăng xuất</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        ) : (
                            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'}>
                                <ButtonGroup>
                                    <Button onClick={nextRouteLogin} sx={{ zIndex: 1 }} variant="text" color="error">
                                        Đăng nhập
                                    </Button>
                                    <Button onClick={nextRouteRegister} sx={{ zIndex: 1 }} variant="text" color="error">
                                        Đăng ký
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        )}
                    </Toolbar>
                </Container>
            </AppBar>
            {/* ⭐ Xóa component Logout vì không cần nữa */}
        </div>
    )
}