'use client';

import {
  Drawer, Box, Typography, IconButton, Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import { useCart } from "@/cartContext/cartContext";

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
      <Box sx={{ width: { xs: 300, sm: 400, lg: 500 }, p: 2, display: "flex", flexDirection: "column", height: "100%" }}>

        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h6">Your cart ({cart.length} items)</Typography>
          <IconButton onClick={toggleCart}><CloseIcon /></IconButton>
        </Box>

        {/* Items */}
        <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
          {cart.map(item => (
            <Box key={item.id} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Image src={item.image} alt={item.name} width={70} height={70} style={{ borderRadius: 6 }} />

              <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Typography sx={{mt: 1}} fontSize={14}>{item.name}</Typography>
                    <Typography fontWeight={600}>₦{item.price.toLocaleString()}</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5, gap: 1 }}>
                        <IconButton sx={{ border: '1px solid black', borderRadius: 0, padding: 0.2  }} onClick={() => decreaseQuantity(item.id)}><RemoveIcon fontSize="small" /></IconButton>
                        <Typography>{item.quantity}</Typography>
                        <IconButton sx={{ border: '1px solid black', borderRadius: 0, padding: 0.2  }} onClick={() => addToCart(item)}><AddIcon fontSize="small" /></IconButton>
                    </Box>
              </Box>

              <IconButton onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>

        {/* Subtotal + Checkout */}
        <Box sx={{ mt: 2, borderTop: "1px solid #ddd", pt: 2 }}>
          <Typography fontWeight={600}>Subtotal: ₦{subtotal.toLocaleString()}</Typography>

          <Button fullWidth sx={{ mt: 2, bgcolor: "#C59F68", color: "white", py: 1.3 }}>
            Checkout
          </Button>

          <Button onClick={toggleCart} sx={{ mt: 1, color: "#C59F68" }} fullWidth>
            Continue shopping
          </Button>

          <Button onClick={clearCart} sx={{ mt: 1, textTransform: "none", fontSize: 14, color: 'red' }} fullWidth>
            Clear cart
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
