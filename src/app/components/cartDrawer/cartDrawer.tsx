"use client";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import { useCart } from "../../../cartContext/cartContext";

const CartDrawer = () => {
  const { cart, isCartOpen, toggleCart } = useCart();

  return (
    <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
      <Box sx={{ width: 350, p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={toggleCart}>
            <CloseIcon />
          </IconButton>
        </Box>

        {cart.length === 0 ? (
          <Typography sx={{ mt: 4 }}>Your cart is empty.</Typography>
        ) : (
          cart.map((item) => (
            <Box key={item.id} display="flex" gap={2} mt={2}>
              <img src={item.image} width={60} height={60} style={{ borderRadius: 8 }} />
              <Box>
                <Typography>{item.name}</Typography>
                <Typography>{item.price}</Typography>
                <Typography>Qty: {item.quantity}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;


// "use client";
// import { Drawer, IconButton, Box, Typography, Button, Divider } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// // Mock cart context hook - replace with your actual useCart
// const useCart = () => ({
//   cart: [
//     {
//       id: 1,
//       name: "The Espresso Urban Chic Bag",
//       price: 27000,
//       quantity: 3,
//       image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80"
//     },
//     {
//       id: 2,
//       name: "The Onyxé Luxe Bag",
//       price: 106000,
//       quantity: 2,
//       image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80"
//     },
//     {
//       id: 3,
//       name: "The Velour Luxe Bag",
//       price: 53000,
//       quantity: 1,
//       image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80"
//     }
//   ],
//   isCartOpen: true,
//   toggleCart: () => {},
//   updateQuantity: () => {},
//   removeFromCart: () => {}
// });

// const CartDrawer = () => {
//   const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCart();

//   const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   const formatPrice = (price) => {
//     return `₦${price.toLocaleString()}`;
//   };

//   return (
//     <Drawer anchor="right" open={isCartOpen} onClose={toggleCart}>
//       <Box sx={{ width: 400, height: "100%", display: "flex", flexDirection: "column" }}>
//         {/* Header */}
//         <Box sx={{ 
//           display: "flex", 
//           justifyContent: "space-between", 
//           alignItems: "center",
//           p: 2.5,
//           borderBottom: "1px solid #e0e0e0"
//         }}>
//           <Typography variant="h6" fontWeight={600}>
//             Your cart ({cart.length} items)
//           </Typography>
//           <IconButton onClick={toggleCart} sx={{ color: "#666" }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Cart Items */}
//         <Box sx={{ flex: 1, overflowY: "auto", p: 2.5 }}>
//           {cart.length === 0 ? (
//             <Typography sx={{ mt: 4, textAlign: "center", color: "#666" }}>
//               Your cart is empty.
//             </Typography>
//           ) : (
//             cart.map((item, index) => (
//               <Box key={item.id}>
//                 <Box sx={{ 
//                   display: "flex", 
//                   gap: 2, 
//                   py: 2
//                 }}>
//                   {/* Product Image */}
//                   <Box
//                     component="img"
//                     src={item.image}
//                     alt={item.name}
//                     sx={{
//                       width: 80,
//                       height: 80,
//                       objectFit: "cover",
//                       borderRadius: 1,
//                       border: "1px solid #e0e0e0"
//                     }}
//                   />

//                   {/* Product Details */}
//                   <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
//                     <Typography variant="body1" fontWeight={500}>
//                       {item.name}
//                     </Typography>

//                     {/* Quantity Controls & Price */}
//                     <Box sx={{ 
//                       display: "flex", 
//                       justifyContent: "space-between", 
//                       alignItems: "center",
//                       mt: "auto"
//                     }}>
//                       {/* Quantity Controls */}
//                       <Box sx={{ 
//                         display: "flex", 
//                         alignItems: "center", 
//                         gap: 1.5,
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 1,
//                         padding: "2px 4px"
//                       }}>
//                         <IconButton 
//                           size="small" 
//                           onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                           disabled={item.quantity <= 1}
//                           sx={{ padding: "4px" }}
//                         >
//                           <RemoveIcon fontSize="small" />
//                         </IconButton>
                        
//                         <Typography variant="body2" sx={{ minWidth: 20, textAlign: "center" }}>
//                           {item.quantity}
//                         </Typography>
                        
//                         <IconButton 
//                           size="small" 
//                           onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           sx={{ padding: "4px" }}
//                         >
//                           <AddIcon fontSize="small" />
//                         </IconButton>
//                       </Box>

//                       {/* Price & Delete */}
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Typography variant="body1" fontWeight={600}>
//                           {formatPrice(item.price)}
//                         </Typography>
                        
//                         <IconButton 
//                           size="small" 
//                           onClick={() => removeFromCart(item.id)}
//                           sx={{ color: "#666" }}
//                         >
//                           <DeleteOutlineIcon fontSize="small" />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>
                
//                 {index < cart.length - 1 && <Divider />}
//               </Box>
//             ))
//           )}
//         </Box>

//         {/* Footer */}
//         {cart.length > 0 && (
//           <Box sx={{ 
//             borderTop: "1px solid #e0e0e0",
//             p: 2.5,
//             backgroundColor: "#fff"
//           }}>
//             {/* Subtotal */}
//             <Box sx={{ 
//               display: "flex", 
//               justifyContent: "space-between", 
//               alignItems: "center",
//               mb: 2
//             }}>
//               <Typography variant="body1" fontWeight={500}>
//                 Subtotal:
//               </Typography>
//               <Typography variant="h6" fontWeight={700}>
//                 {formatPrice(subtotal)}
//               </Typography>
//             </Box>

//             {/* Checkout Button */}
//             <Button 
//               fullWidth 
//               variant="contained" 
//               size="large"
//               sx={{ 
//                 backgroundColor: "#4a1a3a",
//                 color: "#fff",
//                 py: 1.5,
//                 textTransform: "none",
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 "&:hover": {
//                   backgroundColor: "#3a1430"
//                 }
//               }}
//             >
//               Checkout
//             </Button>

//             {/* Continue Shopping */}
//             <Button 
//               fullWidth 
//               variant="text"
//               onClick={toggleCart}
//               sx={{ 
//                 mt: 1,
//                 color: "#666",
//                 textTransform: "none",
//                 textDecoration: "underline"
//               }}
//             >
//               Continue shopping
//             </Button>

//             {/* Clear Cart */}
//             <Button 
//               fullWidth 
//               variant="text"
//               sx={{ 
//                 mt: 0.5,
//                 color: "#d32f2f",
//                 textTransform: "none",
//                 fontSize: "14px"
//               }}
//             >
//               × Clear cart
//             </Button>
//           </Box>
//         )}
//       </Box>
//     </Drawer>
//   );
// };

// export default CartDrawer;