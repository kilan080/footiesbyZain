'use client';
import { Box } from '@mui/system'
import React from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardContent  from '@mui/material/CardContent';
import { isTemplateExpression } from 'typescript';
import { useCart } from '../../../cartContext/cartContext';


const Tabs = () => {
  const slippers = [
    { id: 1, price: '#15,000', image: "/WhatsApp Image 2025-10-09 at 14.06.49_c3218faf.jpg", name: "Luxury Leather", category: "The Luxe Collection" },
    { id: 2, price: '#15,000', image: "/IMG-20251008-WA0009.jpg", name: "Beach Vibes", category: "Mens Collection" },
    { id: 3, price: '#15,000', image: "/IMG-20251008-WA0011.jpg", name: "Queen Slides", category: "Womens Collection" },
    { id: 4, price: '#15,000', image: "/IMG-20251008-WA0009.jpg", name: "Comfy Casuals", category: "Casual Comfort" },
    { id: 5, price: '#15,000', image: "/IMG-20251008-WA0010.jpg", name: "Elegant Evening", category: "The Luxe Collection" },
    { id: 6, price: '#15,000', image: "/WhatsApp Image 2025-10-09 at 14.06.49_f9c6d81e.jpg", name: "Sporty Strides", category: "Mens Collection" },
    { id: 7, price: '#15,000', image: "/IMG-20251008-WA0007.jpg", name: "Chic Comfort", category: "Womens Collection" },
    { id: 8, price: '#15,000', image: "/IMG-20251008-WA0010.jpg", name: "Everyday Essentials", category: "Casual Comfort" },
    { id: 9, price: '#15,000', image: "IMG-20251008-WA0011.jpg", name: "Premium Plush", category: "The Luxe Collection" },
    { id: 10, price: '#20,000', image: "/IMG-20251008-WA0006.jpg", name: "Urban Explorer", category: "Mens Collection" },
    { id: 11, price: '#20,000', image: "/IMG-20251008-WA0009.jpg", name: "Feminine Flair", category: "Womens Collection" },
    { id: 12, price: '#20,000', image: "/IMG-20251008-WA0010.jpg", name: "Relaxed Retreat", category: "Casual Comfort" },
  ];

  const categories = [
    'All',
    'The Luxe Collection',
    'Casual Comfort',
    'Mens Collection',
    'Womens Collection',
  ];
  const { addToCart } = useCart();

  const [activeTab, setActiveTab] = React.useState('All');

  const filteredItems =
    activeTab === 'All'
      ? slippers
      : slippers.filter((item) => item.category === activeTab);

  return (
    <>
      <Box
           sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '59px',
            backgroundColor: '#f5f5f5',
            gap: { xs: 2, sm: 3, md: 4, lg: 6 }
            }}
        >
            {categories.map((category) => (
            <Button
                key={category}
                onClick={() => setActiveTab(category)}
                variant={activeTab === category ? "outlined" : "outlined"}
                sx={{ color: 'black', textTransform: "none", border: 'none', borderBottom: activeTab === category ? '2px solid black' : 'none' }}

            >
                {category}
            </Button>
            ))}
      </Box>
      <Box sx={{ mt: 4, maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Grid container spacing={3} justifyContent="center">
            {filteredItems.map((item) => (
            <Grid
                item
                key={item.id}
                xs={6}      // 1 item per row on mobile
                sm={6}       // 2 per row on tablets
                md={3}       // 4 per row on large screens
                display="flex"
                justifyContent="center"
            >
                <Card
                    sx={{
                        width: 260,
                        borderRadius: 3,
                        boxShadow: 3,
                        textAlign: "flexStart",
                        transition: "transform 0.3s ease",
                        "&:hover": { transform: "scale(1.03)" },
                    }}
                >
                    <CardMedia
                        component="img"
                        height="200"
                        loading='lazy'
                        image={item.image}
                        alt={item.name}
                        style={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{background: 'inherit'}}>
                        <Typography variant="h6" fontWeight={600}>
                            {item.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                            {item.price}
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                width: "100%",
                                borderRadius: 16,
                                textTransform: "none",
                                backgroundColor: "#C59F68", 
                                "&:hover": { backgroundColor: "#B08B59" }
                            }}
                            onClick={() => addToCart(isTemplateExpression)}
                        >
                        Add to Cart
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        </Box>

    </>
  );
};

export default Tabs;
