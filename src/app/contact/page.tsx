'use client';

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from '@emailjs/browser';
import { on } from 'events';

interface Inputs {
  email: string;
  name: string;
  message: string;
}

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

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
            from_name: data.name,
            to_email: 'umarzainab511@gmail.com',
            from_email: data.email,
            message: data.message,
          },
          'aZJ361uwGwYH8wFKe'
        )
        .then(() => {
          toast.success('Thank you! Your email was sent successfully.');
          console.log(data);
          reset();
        })
        .catch(() => {
          toast.error("Oops, something went wrong.");
        })
        .finally(() => setLoading(false));
    };

  return (
    <Box sx={{ maxWidth: '1300px', mx: 'auto', px: { xs: 2, sm: 3, md: 6 }, py: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', lg: 'row' },
          gap: 4,
          alignItems: 'stretch',
          mt: 4,
        }}
      >
        
        <Box
          sx={{
            flex: { xs: '1', lg: '0 0 35%' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          
          <Box component="form" method='post' onSubmit={handleSubmit(onSubmit)} sx={{ mb: 4 }}>
            <Typography variant="h6" mb={2} fontWeight={600}>
              Send us a message
            </Typography>

            <TextField
              label="Full Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              // onChange={handleChange}
              label="Email address"
              error={!!errors.email}
              helperText={errors.email?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Message"
              multiline
              rows={4}
              {...register("message", { required: "Message is required" })}
              error={!!errors.message}
              helperText={errors.message?.message}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#4A0020',
                '&:hover': { bgcolor: '#330016' },
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              Send Message
            </Button>
          </Box>

          
          <Box>
            <Typography variant="h6" mb={2} fontWeight={600}>
              Get in touch
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WhatsAppIcon sx={{ color: '#25D366', mr: 1 }} />
              <Link
                href="https://wa.me/2348149964203?text=Hello%20I%20would%20like%20to%20place%20an%20order"
                underline="none"
                color="inherit"
                target="_blank"
                sx={{ '&:hover': { color: '#25D366' } }}
              >
                WhatsApp: +234 814 996 4203
              </Link>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <EmailIcon sx={{ color: '#555', mr: 1 }} />
              <Typography>Email: umarzainab511@gmail.com</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon sx={{ color: '#555', mr: 1 }} />
              <Typography>Ilorin, Kwara State, Nigeria</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { xs: '1', lg: '0 0 65%' },
            width: '100%',
            height: { xs: 400, sm: 450, md: 500, lg: 650 },
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.574716685244!2d4.556955!3d8.479938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1036577ab2b2b5b7%3A0x33ff1a616c7f5585!2sIlorin%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1700011223456"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactPage;