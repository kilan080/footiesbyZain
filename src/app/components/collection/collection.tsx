'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const slippers = [
  {
    id: 2,
    name: 'Luxury Leather',
    description: 'Premium handmade design.',
    price: '#15,000',
    image: '/IMG-20251008-WA0010.jpg',
  },
  {
    id: 3,
    name: 'Beach Vibes',
    description: 'Light and water-resistant.',
    price: '#20,000',
    image: '/IMG-20251008-WA0009.jpg',
  },
  {
    id: 4,
    name: 'King and Queen Slide',
    description: 'Perfect for active lifestyles.',
    price: '#15,000',
    image: '/IMG-20251008-WA0006.jpg',
  },
  {
    id: 5,
    name: 'Sporty Slides',
    description: 'Ideal for sports and outdoor activities.',
    price: '#20,000',
    image: '/IMG-20251008-WA0009.jpg',
  },
  {
    id: 8,
    name: 'Casual Comfort',
    description: 'Everyday wear with a casual look.',
    price: '#20,000',
    image: '/WhatsApp Image 2025-10-09 at 14.06.49_c3218faf.jpg',
  },
];

export default function ProductGrid() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {slippers.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.03)' },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="h6" fontWeight="bold" mt={1}>
                  {item.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}