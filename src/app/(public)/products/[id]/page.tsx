'use client';

import Image from "next/image";
import { Box, Typography, Button } from "@mui/material";
import { useCart } from "@/cartContext/cartContext";
import { useEffect, useState, use } from "react"; // Added 'use'

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
}

export default function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>; // Changed to Promise
}) {
  const { id } = use(params); // Unwrap params with use()
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]); 

  if (loading) {
    return <Box sx={{ textAlign: "center", py: 10 }}>Loading...</Box>;
  }

  if (!product) {
    return <Box sx={{ textAlign: "center", py: 10 }}>Product not found</Box>;
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        mx: "auto",
        px: { xs: 2, sm: 3 },
        py: { xs: 3, md: 6 },
        mt: '50px'
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: { xs: 3, lg: 6 },
        }}
      >
        {/* IMAGE SECTION */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            minHeight: { xs: 300, sm: 400, lg: 500 }, 
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: 300, sm: 400, lg: 500 }, 
            }}
          >
            <Image
              src={product.images?.[0]}
              alt={product.name}
              fill
              style={{
                objectFit: "cover",
                borderRadius: "16px",
              }}
              quality={75}
              priority
            />
          </Box>
        </Box>

        {/* INFO SECTION */}
        <Box 
          sx={{ 
            flex: 1, 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: { xs: 'auto', lg: 500 },
          }}
        >
          <Box>
            <Typography 
              variant="h4" 
              fontWeight={600} 
              gutterBottom
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              {product.name}
            </Typography>

            <Typography
              variant="h5"
              sx={{ 
                color: "#1976d2", 
                fontWeight: 600, 
                mt: { xs: 2, lg: 8 },
                fontSize: { xs: '1.25rem', sm: '1.5rem' }
              }}
            >
              ₦{product.price.toLocaleString()}
            </Typography>
          </Box>

          <Typography 
            variant="body1" 
            sx={{ 
              color: "#555", 
              lineHeight: 1.8,
              my: { xs: 3, lg: 0 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {product.description}
          </Typography>

          <Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mb: { xs: 2, md: 4 },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              Stock:{" "}
              <strong>
                {product.stock > 0 ? product.stock : "Out of stock"}
              </strong>
            </Typography>

            <Button
              variant="contained"
              fullWidth
              disabled={product.stock === 0}
              sx={{
                backgroundColor: "#1976d2",
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: '14px', sm: '16px' },
                textTransform: "none",
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
              onClick={() =>
                addToCart({
                  id: parseInt(product._id),
                  name: product.name,
                  price: product.price,
                  image: product.images?.[0],
                  quantity: 1,
                })
              }
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}