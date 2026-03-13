"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box, Typography, TextField, Button, CircularProgress,
  MenuItem, Paper, Skeleton,
} from "@mui/material";
import { api } from "@/lib/api";
import { ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
        const data = await api(`/admin/products/${id}`);
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
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api(`/admin/products/${id}`, {
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
      toast.success("Product updated successfully!");
      router.push("/dashboard/products");
    } catch (error) {
      console.error("Update failed", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <Box>
      <Skeleton variant="text" width={200} height={40} sx={{ mb: 3 }} />
      <Paper sx={{ p: 4, maxWidth: 600 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} variant="rounded" height={56} sx={{ mb: 2, borderRadius: 1 }} />
        ))}
      </Paper>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>
        Edit Product
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 600, borderRadius: 3 }}>
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
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Price (₦)"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
              fullWidth
            />
          </Box>

          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            fullWidth
          >
            <MenuItem value="slides">Slides</MenuItem>
            <MenuItem value="shoes">Shoes</MenuItem>
          </TextField>

          <TextField
            label="Image URL"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            fullWidth
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={4}
            value={form.description}
            onChange={handleChange}
            fullWidth
          />

          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              fullWidth
              sx={{
                py: 1.5, borderRadius: 2, fontWeight: 600,
                background: "#1976d2",
                "&:hover": { background: "#1565c0" },
              }}
            >
              {submitting ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Update Product"}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => router.push("/dashboard/products")}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}