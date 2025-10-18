'use client';
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import emailjs from '@emailjs/browser';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Slide from '@mui/material/Slide';



export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    emailjs
    .send(
      'service_y6bcdi1',
      'template_zyr3owi',
      {
        from_email: email,
        to_email: 'umarzainab511@gmail.com',
        message: `New subscription from ${email}`,
      },
      'aZJ361uwGwYH8wFKe'
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      alert('Thank you! Your email was sent successfully.');
      setEmail('');
    })
    .catch((error: any) => {
      console.error('email sending failed:', error);
      alert("oops something went wrong");
      
    })
    .finally(() => setLoading(false))
  }
  return (
    <Container
      sx={{
        pt: { xs: 2, sm: 6 },
        pb: { xs: 8, sm: 10 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 4 },
      }}
    >
      <Slide in={true} direction='right' timeout={1200}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image src='/image.png' alt='Footer Image' width={300} height={100} />  
        </Box>
      </Slide>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {/* Input + Button inline */}
        
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column' },
            alignItems: 'center',
            gap: 1,
            '& > :not(style)': { m: 0 },
          }}
          noValidate
          autoComplete="off"
        >
          
          <TextField
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="outlined-basic"
            label="Email address"
            variant="outlined"
            sx={{ width: '30ch' }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: 56, whiteSpace: 'nowrap' }}
          >
            Send email
          </Button>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column' },
            gap: 1,
            alignItems: 'center',
            mt: { xs: 2, sm: 0 },
          }}
        >
          <Link href="#" underline="hover" color="text.secondary">
            About Us
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Contact Us
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Privacy Policy
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Terms of Service
          </Link>
          <Link href="#" underline="hover" color="text.secondary">
            Umarzainab511@gmail.com
          </Link>
          
        </Box>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2, 
          mt: 2, 
        }}
      >
        <Link href="#" target="_blank" rel="noopener" color="inherit">
          <FacebookIcon sx={{ fontSize: 35, color: '#1877F2' }} />
        </Link>
        <Link href="#" target="_blank" rel="noopener" color="inherit">
          <InstagramIcon sx={{ fontSize: 35, color: '#E4405F' }} />
        </Link>
      </Box>
      <Box>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', textAlign: 'center' }}
          mt={{ xs: 2, sm: 4 }}
        >
          &copy; {new Date().getFullYear()} Footies by Zayn. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
}
