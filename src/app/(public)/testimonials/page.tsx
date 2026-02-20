'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Slide, Fade, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';


interface Testimonial {
  _id: string;
  role?: string;
  name: string;
  message: string;
}

function stringToColor(string: string): string {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  };
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2)
  }
  return color;
}

function stringAvatar(name: string) {
  const initials = name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('');

  return {
    sx: { bgcolor: stringToColor(name) },
    children: initials,
  };
}


export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://footies-backend.vercel.app/testimonials");
        setTestimonials(res.data);
        console.log("testimonials data:", res.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }

    }
    fetchTestimonials();
  } , []);

    console.log("testimonials state:", testimonials);

    if(loading) {
      return <CircularProgress />
    }

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Fade in={true} timeout={1200}>
          <Typography
            component="h2"
            variant="h4"
            gutterBottom
            sx={{ color: 'text.primary', mt: 4 }}
          >
            Testimonials
          </Typography>
        </Fade>
        <Fade in={true} timeout={1200}>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            See how we deliver efficiency, durability, and satisfaction in every project.
          </Typography>
        </Fade>
      </Box>
      <Grid container spacing={2}>
        {testimonials.map((testimonial) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={testimonial._id} sx={{ display: 'flex' }}>
            <Slide direction='up' in={true} timeout={2000}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                }}
              >
                <CardContent>
                  <Fade in={true} timeout={2200}>
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ color: 'text.secondary' }}
                    >
                      {testimonial.message}
                    </Typography>
                  </Fade>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <CardHeader
                    avatar={<Avatar {...stringAvatar(testimonial.name)} />}
                    title={testimonial.name}
                    subheader={testimonial.role}
                  />
                  
                </Box>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}