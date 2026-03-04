'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from '../cartDrawer/cartDrawer';
import { useCart } from "../../../cartContext/cartContext";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const pages = [
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [firstName, setFirstName] = React.useState<string | null>(null);
  const router = useRouter();

  // Check localStorage for token and decode first name on mount
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // fetch user profile to get firstName
        api("/user/me")
          .then((data) => {
            if (data.firstName) setFirstName(data.firstName);
          })
        .catch(() => null);
      } catch {
        // null
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setFirstName(null);
    setAnchorElUser(null);
    router.push("/user-login");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { toggleCart, cartCount } = useCart();

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Logo (Desktop) */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
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
              <Image src="/image.png" alt="Logo" width={70} height={50} />
            </Typography>

            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: 'block', md: 'none' } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.href}
                  >
                    <Typography sx={{ textAlign: 'center' }}>{page.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo (Mobile) */}
            <Typography
              variant="h5"
              noWrap
              component={Link}
              href="/"
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
              <Image src="/image.png" alt="Logo" width={50} height={50} />
            </Typography>

            {/* Desktop Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  component={Link}
                  href={page.href}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>

            {/* Cart Icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ShoppingCartIcon onClick={toggleCart} sx={{ cursor: 'pointer' }} />
              <span style={{ marginLeft: 4 }}>{cartCount}</span>

              {/* User — logged in vs logged out */}
              {firstName ? (
                <>
                  <Box
                    onClick={(e) => setAnchorElUser(e.currentTarget)}
                    sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: '#2563eb', fontSize: 14, fontWeight: 700 }}>
                      {firstName.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography sx={{ color: 'white', fontSize: 14, fontWeight: 500 }}>
                      {firstName}
                    </Typography>
                  </Box>

                  {/* Dropdown menu */}
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={() => setAnchorElUser(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem component={Link} href="/profile" onClick={() => setAnchorElUser(null)}>
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  component={Link}
                  href="/user-login"
                  sx={{ color: 'white', fontSize: 13, textTransform: 'none', fontWeight: 500 }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CartDrawer />
    </>
  );
}

export default ResponsiveAppBar;