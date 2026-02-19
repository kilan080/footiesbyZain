"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api";


export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetchWithAuth("/admin/products", {
        method: "POST",
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          category: form.category,
          description:form.description,
          stock: Number(form.stock),
          images: [form.imageUrl]
        }),
      });

      router.push("/dashboard/products");
      if (res.ok) {
        router.push("/dashboard/products");
      }
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Add New Product
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600 }}>
        <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column" gap={3}>
          
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
            <MenuItem value="sneakers">Shoes</MenuItem>
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
            Create Product
          </Button>

        </Box>
      </Paper>
    </Box>
  );
}
