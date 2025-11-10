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
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
};

export default function Footer() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({
    shouldFocusError: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    emailjs
      .send(
        'service_y6bcdi1',
        'template_zyr3owi',
        {
          from_email: data.email,
          to_email: 'umarzainab511@gmail.com',
          message: `New subscription from ${data.email}`,
        },
        'aZJ361uwGwYH8wFKe'
      )
      .then(() => {
        toast.success('Thank you! Your email was sent successfully.');
        reset();
      })
      .catch(() => {
        toast.error("Oops, something went wrong.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container
      sx={{
        pt: { xs: 2, sm: 6 },
        pb: { xs: 8, sm: 10 },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 3, sm: 4 },
      }}
    >
      <Slide in={true} direction='right' timeout={1200}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image src='/image.png' alt='Footer Image' width={300} height={100} />
        </Box>
      </Slide>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography>SIGN UP FOR DISCOUNTS & UPDATES</Typography>

          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            label="Email address"
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ width: '30ch' }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ height: 56 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <Link href="#" underline="hover" color="text.secondary">About Us</Link>
          <Link href="#" underline="hover" color="text.secondary">Contact Us</Link>
          <Link href="#" underline="hover" color="text.secondary">Privacy Policy</Link>
          <Link href="#" underline="hover" color="text.secondary">Terms of Service</Link>
          <Link href="#" underline="hover" color="text.secondary">Umarzainab511@gmail.com</Link>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link href="#" target="_blank" rel="noopener" color="inherit">
          <FacebookIcon sx={{ fontSize: 35, color: '#1877F2' }} />
        </Link>
        <Link href="#" target="_blank" rel="noopener" color="inherit">
          <InstagramIcon sx={{ fontSize: 35, color: '#E4405F' }} />
        </Link>
      </Box>

      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }} mt={4}>
        &copy; {new Date().getFullYear()} Footies by Zayn. All rights reserved.
      </Typography>
    </Container>
  );
}
