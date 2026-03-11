"use client";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import {  Skeleton } from "@mui/material";
import toast from "react-hot-toast";
import CardContent from "@mui/material/CardContent";
import { useCart } from "../../../cartContext/cartContext";
import LockOutlined from "@mui/icons-material/LockOutlined";
import { api } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  stock?: number;
}

const Tabs = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);

  const categories = ["All", "slides", "shoes"];
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api("/products");
        setProducts(data.products || []);
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
        <>
          {/* Category tabs skeleton */}
          <Box sx={{
            display: "flex", justifyContent: "center", width: "100%",
            height: "59px", backgroundColor: "#f5f5f5",
            gap: { xs: 2, sm: 3, md: 4, lg: 6 }, alignItems: "center",
          }}>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="rounded" width={60} height={28} />
            ))}
          </Box>

          {/* Product cards skeleton */}
          <Box sx={{ mt: 4, maxWidth: "1200px", mx: "auto", px: 1 }}>
            <Grid container spacing={3} justifyContent="center">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Grid key={i} size={{ xs: 6, sm: 6, md: 3 }} display="flex" justifyContent="center">
                  <Box sx={{ width: 260 }}>
                    <Skeleton variant="rectangular" width={260} height={190} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="text" width="70%" sx={{ mt: 1, fontSize: 20 }} />
                    <Skeleton variant="text" width="40%" />
                    <Skeleton variant="rounded" width={260} height={36} sx={{ mt: 1, borderRadius: 8 }} />
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
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
                    
                    {(item.stock ?? 0) > 0 && (item.stock ?? 0) <= 5 && (
                      <Typography sx={{ fontSize: 11, color: "#ef4444", mt: 1 }}>
                        Only {item.stock} left!
                      </Typography>
                    )}

                    <Button
                      variant="contained"
                      // disabled={item.stock === 0}
                      startIcon={item.stock === 0 ? <LockOutlined sx={{ fontSize: 20 }} /> : null}
                      sx={{
                        mt: 2,
                        width: "100%",
                        borderRadius: 16,
                        textTransform: "none",
                        backgroundColor: item.stock === 0 ? "#333" : "#1976d2",
                        marginY: '10px',
                        "&:hover": { backgroundColor: item.stock === 0 ? "#3339" : "#1565c0" },
                        "&.Mui-disabled": { 
                          backgroundColor: "#ef4444",
                          color: "#fff" 
                        },
                      }}
                      onClick={() => {
                        if (item.stock !== 0) {
                          addToCart({
                            id: item._id,
                            name: item.name,
                            price: item.price,
                            image: item.images?.[0],
                            quantity: 1,
                          });
                          toast.success(`${item.name} added to cart!`); 
                        }
                      }}
                    >
                      {item.stock === 0 ? "Out of Stock" : "Add to Cart"}
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
