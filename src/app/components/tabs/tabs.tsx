"use client";

import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {CircularProgress} from "@mui/material"
import CardContent from "@mui/material/CardContent";
import { useCart } from "../../../cartContext/cartContext";

const Tabs = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "slides", "shoes"];
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://footies-backend.vercel.app/products"
        );

        const data = await res.json();

        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredItems =
    activeTab === "All"
      ? products
      : products.filter((item) => item.category === activeTab);

    if (loading) {
        return (
        <CircularProgress />
        );
    }

  return (
    <>
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "59px",
          backgroundColor: "#f5f5f5",
          gap: { xs: 2, sm: 3, md: 4, lg: 6 },
          alignItems: "center",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveTab(category)}
            sx={{
              color: "black",
              textTransform: "none",
              border: "none",
              borderBottom:
                activeTab === category ? "2px solid black" : "none",
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box sx={{ mt: 4, maxWidth: "1200px", mx: "auto", px: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredItems.map((item) => (
            <Grid
              key={item._id}
              size={{
                xs: 6,
                sm: 6,
                md: 3,
              }}
              display="flex"
              justifyContent="center"
            >
              <Card
                  sx={{
                    width: 260,
                      height: 350,  
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: "transform 0.3s ease",
                      "&:hover": { transform: "scale(1.03)" },
                  }}
                >
                  <Link href={`/products/${item._id}`} style={{ textDecoration: "none" }}>
                    <CardMedia
                      component="img"
                      height="180"
                      loading="lazy"
                      image={item.images?.[0]}
                      alt={item.name}
                      sx={{ objectFit: "cover" , height: "190px"}}
                    />
                  </Link>
                  <CardContent sx={{marginTop: '0px', marginBottom: '0px'}}>
                    <Typography variant="h6" fontWeight={600}>
                      {item.name}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                    >
                      ₦{item.price.toLocaleString()}
                    </Typography>

                    <Button
                      variant="contained"
                      sx={{
                        mt: 2,
                        width: "100%",
                        borderRadius: 16,
                        textTransform: "none",
                        backgroundColor: "#1976d2",
                        marginY: '10px',
                        "&:hover": { backgroundColor: "#1565c0" },
                      }}
                      onClick={() =>
                        addToCart({
                          id: item._id,
                          name: item.name,
                          price: item.price,
                          image: item.images?.[0],
                          quantity: 1,
                        })
                      }
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
