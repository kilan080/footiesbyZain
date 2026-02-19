"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Button,
  CircularProgress,
  TableRow,
  Paper,
  IconButton,
  Box,

} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchWithAuth } from "@/lib/api";
import Link from "next/link";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  images: string[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchWithAuth("/admin/products");
        

        console.log("Parsed Data:", data);

        setProducts(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await fetchWithAuth(`/admin/products/${selectedProduct._id}`, {
        method: "DELETE",
      });

      setProducts((prev) =>
        prev.filter((p) => p._id !== selectedProduct._id)
      );

      setSnackbarOpen(true);
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setOpenDialog(false);
      setSelectedProduct(null);
    }
  };


  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          Products
        </Typography>

        <Button
          variant="contained"
          component={Link}
          href="/dashboard/products/new"
        >
          Add Product
        </Button>
      </Box>

      {/* Table placeholder */}
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 2,
            p: 3,
            boxShadow: 1,
          }}
        >
          {loading ? (
            <CircularProgress />
            ) : products.length === 0 ? (
              <Typography>No products found</Typography>
            ) : (
            <TableContainer component={Paper}>
              <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Image</strong></TableCell>
                      <TableCell><strong>Name</strong></TableCell>
                      <TableCell><strong>Category</strong></TableCell>
                      <TableCell><strong>Price</strong></TableCell>
                      <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {products.map((product: Product) => (
                      <TableRow key={product._id} hover>
                        
                        {/* Image Cell */}
                        <TableCell>
                          <Box
                            sx={{
                              width: 50,
                              height: 50,
                              borderRadius: 1,
                              overflow: "hidden",
                              backgroundColor: "#f5f5f5",
                            }}
                          >
                            <Box
                              component="img"
                              src={product.images?.[0]}
                              alt={product.name}
                              sx={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          {product.name}
                        </TableCell>
                        <TableCell>
                          {product.category}
                        </TableCell>
                        <TableCell>
                          ₦{product.price}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            component={Link}
                            href={`/dashboard/products/${product._id}`}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpenDialog(true);
                            }}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle> <DeleteIcon /></DialogTitle>
          <DialogContent>
            Are you sure you want to delete{" "}
            <strong>{selectedProduct?.name}</strong>?
          </DialogContent>
          <DialogActions>
            <Button sx={{ '&:hover': { backgroundColor: 'green' } }} onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button color="error" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert sx={{ alignContent: 'center'}} severity="success" variant="filled">
            Product deleted successfully
          </Alert>
        </Snackbar>
    </Box>
  );
}
