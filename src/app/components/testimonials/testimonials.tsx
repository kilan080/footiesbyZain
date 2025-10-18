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
import { Slide, Fade } from '@mui/material';
import { useColorScheme } from '@mui/material/styles';

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
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


const userTestimonials = [
  {
    avatar: <Avatar {...stringAvatar('Zainab Umar')} />,
    name: 'Zainab Umar',
    occupation: 'Trader',
    testimonial:
      `I love how adaptable these shoes are. From morning meetings to evening outings, they transition effortlessly. Comfortable, stylish, and perfect for my busy lifestyle.`
  },
  {
    avatar: <Avatar {...stringAvatar('Blessing Stephen')} />,
    name: 'Blessing Stephen',
    occupation: 'Lawyer',
    testimonial:
      "One of the standout features of this product is the exceptional customer support. In my experience, the team behind this product has been quick to respond and incredibly helpful. It's reassuring to know that they stand firmly behind their product.",
  },
  {
    avatar: <Avatar {...stringAvatar('Funmi Bakare')} />,
    name: 'Funmi Bakare',
    occupation: 'Banker',
    testimonial:
      'The level of simplicity and user-friendliness in this product has significantly simplified my life. I appreciate the creators for delivering a solution that not only meets but exceeds user expectations.',
  },
  {
    avatar: <Avatar {...stringAvatar('Faridah Remilekun')} />,
    name: 'Faridah Remilekun',
    occupation: 'Student',
    testimonial:
      `The quality is in the details. The precision stitching, the perfectly balanced sole, the premium materials—everything shows they care about creating exceptional footwear.`,
  },
  {
    avatar: <Avatar {...stringAvatar('Maridiyah Adebisi')} />,
    name: 'Maridiyah Adebisi',
    occupation: 'Corper',
    testimonial:
      `I've tried countless shoe brands, but these are different. The comfort and quality are unmatched—you can tell they genuinely care about how their products feel on your feet.`,
  },
  {
    avatar: <Avatar {...stringAvatar('Daniel John')} />,
    name: 'Daniel John',
    occupation: 'Corper',
    testimonial:
      `The quality of this product exceeded my expectations. It's durable, well-designed, and built to last. Definitely worth the investment!`,
  },
];





const logoStyle = {
  width: '64px',
  opacity: 0.3,
};

export default function Testimonials() {
  const { mode, systemMode } = useColorScheme();



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
            sx={{ color: 'text.primary' }}
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
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
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
                      {testimonial.testimonial}
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
                    avatar={testimonial.avatar}
                    title={testimonial.name}
                    subheader={testimonial.occupation}
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