"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
} from "@mui/material";
import { fetchWithAuth } from "@/lib/api";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchWithAuth(`/admin/products/${id}`);
        const product = data.product;

        setForm({
          name: product.name || "",
          price: product.price?.toString() || "",
          category: product.category || "",
          description: product.description || "",
          stock: product.stock?.toString() || "",
          imageUrl: product.images?.[0] || "",
        });

      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {
      await fetchWithAuth(`/admin/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description: form.description,
          stock: Number(form.stock),
          images: [form.imageUrl],
        }),
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

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Box
          component="form"
          onSubmit={handleUpdate}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Price"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
          />

          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <MenuItem value="slides">Slides</MenuItem>
            <MenuItem value="sneakers">Sneakers</MenuItem>
          </TextField>

          <TextField
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained">
            Update Product
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
