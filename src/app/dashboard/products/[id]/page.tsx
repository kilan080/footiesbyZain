"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchWithAuth } from "@/lib/api";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchWithAuth(`/admin//products/${id}`);
        console.log('All products:', data);
        const product = data.product;

        setName(product.name);
        setPrice(product.price);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await fetchWithAuth(`/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, price }),
      });

      router.push("/dashboard/products");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Edit Product
      </Typography>

      <TextField
        fullWidth
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        margin="normal"
      />

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleUpdate}
      >
        Update Product
      </Button>
    </Box>
  );
}
