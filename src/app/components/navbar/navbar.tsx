// 'use client';

// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import Image from 'next/image';
// import Link from '@mui/material/Link';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import { useCart } from "../../../cartContext/cartContext";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import CartDrawer from '../cartDrawer/cartDrawer';


// const pages = [
//   { label: 'Men', href: '/mens' },
//   { label: 'Women', href: '/womens' },
//   { label: 'Testimonials', href: '/testimonials' },
//   { label: 'Contact', href: '/contact' },
// ]

// function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const { toggleCart,cartCount } = useCart();

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <>
//     <AppBar position="fixed">
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             <Link href="/"><Image src="/image.png" alt="Logo" width={70} height={50} /></Link>
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={handleCloseNavMenu}>
//                   <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="#app-bar-with-responsive-menu"
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             <Image src="/image.png" alt="Logo" width={50} height={50} />
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 onClick={handleCloseNavMenu}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>
//           <Box>
//             <ShoppingCartIcon onClick={toggleCart} sx={{ cursor: 'pointer' }} />
//             <span>{cartCount}</span>
//           </Box>
//           {/* <Box sx={{ flexGrow: 0 }}>
//             <Typography variant="body1" sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
//                 <strong>Order Now:</strong>
//                 <Link
//                     href="https://wa.me/2348149964203?text=Hello%20I%20would%20like%20to%20place%20an%20order"
//                     underline="none" 
//                     color="text.secondary" 
//                     target="_blank" 
//                     rel="noopener noreferrer" 
//                     sx={{ display: 'flex', alignItems: 'center', ml: 1 }}
//                 >
//                     <WhatsAppIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} /> 
//                     08149964203
//                 </Link>
//             </Typography>
//         </Box> */}
//         </Toolbar>
//       </Container>
//     </AppBar>

//     <CartDrawer />
//     </>
//   );
// }
// export default ResponsiveAppBar;

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
import Image from 'next/image';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartDrawer from '../cartDrawer/cartDrawer';
import { useCart } from "../../../cartContext/cartContext";
import Link from 'next/link';

// Each page with its corresponding link
const pages = [
  { label: 'Men', href: '/men' },
  { label: 'Women', href: '/women' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact', href: '/contact' },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

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
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    component={Link}
                    href={page.href}
                  >
                    <Typography sx={{ textAlign: 'center' }}>
                      {page.label}
                    </Typography>
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCartIcon onClick={toggleCart} sx={{ cursor: 'pointer' }} />
              <span style={{ marginLeft: 4 }}>{cartCount}</span>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CartDrawer />
    </>
  );
}

export default ResponsiveAppBar;
