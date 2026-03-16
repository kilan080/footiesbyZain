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
import { Skeleton } from '@mui/material';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';

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
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
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
  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/testimonials?limit=6`,
    fetcher
  );

  const testimonials: Testimonial[] = Array.isArray(data) ? data : [];

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
      {/* Header */}
      <Box sx={{
        width: { sm: '100%', md: '60%' },
        textAlign: { sm: 'left', md: 'center' },
      }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary', mt: 4 }}
        >
          Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          See how we deliver efficiency, durability, and satisfaction in every project.
        </Typography>
      </Box>

      {/* Cards */}
      <Grid container spacing={2}>
        {isLoading
          ? [1, 2, 3, 4, 5, 6].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
                  <Skeleton variant="text" width="90%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="60%" sx={{ mb: 2 }} />
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Box>
                      <Skeleton variant="text" width={100} />
                      <Skeleton variant="text" width={70} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          : testimonials.map((testimonial) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={testimonial._id} sx={{ display: 'flex' }}>
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
                    <Typography
                      variant="body1"
                      gutterBottom
                      sx={{ color: 'text.secondary' }}
                    >
                      {testimonial.message}
                    </Typography>
                  </CardContent>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <CardHeader
                      avatar={<Avatar {...stringAvatar(testimonial.name)} />}
                      title={testimonial.name}
                      subheader={testimonial.role}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
}