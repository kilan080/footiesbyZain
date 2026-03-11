"use client";

import { useEffect, useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Select, MenuItem, Chip, Skeleton,
  Alert, IconButton, Collapse, Divider,
} from "@mui/material";
import toast from "react-hot-toast";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { api } from "@/lib/api";

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Order {
  _id: string;
  userId: { firstName: string; lastName: string; email: string; phone: string } | null;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryInfo: {
    firstName: string; lastName: string; email: string;
    phone: string; address: string; city: string; state: string;
  };
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}

const statusColors: Record<string, { bg: string; color: string }> = {
  pending:   { bg: "#fef9c3", color: "#854d0e" },
  confirmed: { bg: "#dbeafe", color: "#1e40af" },
  shipped:   { bg: "#e0f2fe", color: "#0369a1" },
  delivered: { bg: "#dcfce7", color: "#166534" },
  cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function OrderRow({ order, onStatusChange }: { order: Order; onStatusChange: (id: string, status: string) => void }) {
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    await onStatusChange(order._id, newStatus);
    setUpdating(false);
  };

  const statusStyle = statusColors[order.status] || { bg: "#f5f5f5", color: "#555" };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" }, "&:hover": { background: "#fafafa" } }}>
        {/* Expand toggle */}
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>

        {/* Order ID */}
        <TableCell>
          <Typography sx={{ fontSize: 12, fontFamily: "monospace", color: "#555" }}>
            {order._id.slice(-8).toUpperCase()}
          </Typography>
        </TableCell>

        {/* Customer */}
        <TableCell>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            {order.userId ? `${order.userId.firstName} ${order.userId.lastName}` : order.deliveryInfo.firstName + " " + order.deliveryInfo.lastName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#888" }}>
            {order.userId ? order.userId.email : order.deliveryInfo.email}
          </Typography>
        </TableCell>

        {/* Items count */}
        <TableCell>
          <Typography sx={{ fontSize: 13 }}>
            {order.items.length} item{order.items.length > 1 ? "s" : ""}
          </Typography>
        </TableCell>

        {/* Total */}
        <TableCell>
          <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
            ₦{order.total.toLocaleString()}
          </Typography>
        </TableCell>

        {/* Payment */}
        <TableCell>
          <Chip
            label={order.paymentStatus}
            size="small"
            sx={{
              fontSize: 11, fontWeight: 600,
              background: order.paymentStatus === "paid" ? "#dcfce7" : "#fef9c3",
              color: order.paymentStatus === "paid" ? "#166534" : "#854d0e",
            }}
          />
        </TableCell>

        {/* Status dropdown */}
        <TableCell>
          <Select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating || order.status === "cancelled" || order.status === "delivered"}
            size="small"
            sx={{
              fontSize: 12, fontWeight: 600, borderRadius: 2,
              background: statusStyle.bg, color: statusStyle.color,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
              "& .MuiSvgIcon-root": { color: statusStyle.color },
              minWidth: 120,
            }}
          >
            {validStatuses.map((s) => {
              const statusOrder = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
              const currentIndex = statusOrder.indexOf(order.status);
              const optionIndex = statusOrder.indexOf(s);
              const isDisabled =
                order.status === "cancelled" ||
                order.status === "delivered" ||
                (s !== "cancelled" && optionIndex < currentIndex);

              return (
                <MenuItem key={s} value={s} disabled={isDisabled} sx={{ fontSize: 13 }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </MenuItem>
              );
            })}
          </Select>
        </TableCell>

        {/* Date */}
        <TableCell>
          <Typography sx={{ fontSize: 12, color: "#888" }}>
            {new Date(order.createdAt).toLocaleDateString("en-NG", {
              day: "numeric", month: "short", year: "numeric"
            })}
          </Typography>
        </TableCell>
      </TableRow>

      {/* Expandable row */}
      <TableRow>
        <TableCell colSpan={8} sx={{ py: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ py: 2, px: 3, background: "#f9fafb", borderRadius: 2, mb: 1 }}>
              <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>

                {/* Order Items */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>Items Ordered</Typography>
                  {order.items.map((item, i) => (
                    <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography sx={{ fontSize: 13 }}>{item.name} x{item.quantity}</Typography>
                      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>₦{(item.price * item.quantity).toLocaleString()}</Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 13, color: "#888" }}>Delivery Fee</Typography>
                    <Typography sx={{ fontSize: 13 }}>₦{order.deliveryFee.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Total</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: "#2563eb" }}>₦{order.total.toLocaleString()}</Typography>
                  </Box>
                </Box>

                {/* Delivery Info */}
                <Box sx={{ flex: 1, minWidth: 250 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, mb: 1 }}>Delivery Details</Typography>
                  {[
                    ["Name", `${order.deliveryInfo.firstName} ${order.deliveryInfo.lastName}`],
                    ["Email", order.deliveryInfo.email],
                    ["Phone", order.deliveryInfo.phone],
                    ["Address", order.deliveryInfo.address],
                    ["City", order.deliveryInfo.city],
                    ["State", order.deliveryInfo.state],
                    ["Payment Method", order.paymentMethod],
                  ].map(([label, value]) => (
                    <Box key={label} sx={{ display: "flex", gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontSize: 12, color: "#888", minWidth: 100 }}>{label}:</Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 500 }}>{value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api("/admin/orders")
      .then((data) => setOrders(data.orders || []))
      .catch(() => setError("Failed to load orders."))
      .finally(() => setLoading(false));
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setError("");
    setSuccess("");
    try {
      await api(`/admin/orders/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prev) =>
        prev.map((o) => o._id === id ? {
          ...o,
          status: newStatus,
          paymentStatus: newStatus === "delivered" ? "paid" : o.paymentStatus,
        } : o)
      );
      toast.success(`Order status updated to ${newStatus}`);
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      toast.error("Failed to update order status.");
    }
  };

  if (loading) return (
    <Box>
      <Skeleton variant="text" width={150} height={36} sx={{ mb: 1 }} />
      <Skeleton variant="text" width={250} height={20} sx={{ mb: 3 }} />
      <Box sx={{ display: "flex", gap: 1.5, mb: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} variant="rounded" width={100} height={32} sx={{ borderRadius: 10 }} />
        ))}
      </Box>
      <Box sx={{ borderRadius: 3, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Box key={i} sx={{ display: "flex", gap: 2, p: 2, borderBottom: "1px solid #f0f0f0", alignItems: "center" }}>
            <Skeleton variant="circular" width={32} height={32} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="text" width={120} sx={{ flex: 1 }} />
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={80} />
            <Skeleton variant="rounded" width={90} height={28} sx={{ borderRadius: 10 }} />
            <Skeleton variant="rounded" width={110} height={32} sx={{ borderRadius: 2 }} />
            <Skeleton variant="text" width={70} />
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box>
      <Typography sx={{ fontSize: 22, fontWeight: 700, mb: 0.5 }}>Orders</Typography>
      <Typography sx={{ fontSize: 13, color: "#888", mb: 3 }}>
        Manage and update customer orders
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError("")}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccess("")}>{success}</Alert>}

      {/* Summary chips */}
      <Box sx={{ display: "flex", gap: 1.5, mb: 3, flexWrap: "wrap" }}>
        {validStatuses.map((s) => {
          const count = orders.filter((o) => o.status === s).length;
          const style = statusColors[s];
          return (
            <Chip
              key={s}
              label={`${s.charAt(0).toUpperCase() + s.slice(1)}: ${count}`}
              sx={{ background: style.bg, color: style.color, fontWeight: 600, fontSize: 12 }}
            />
          );
        })}
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#f9fafb" }}>
              <TableCell />
              <TableCell sx={thSx}>Order ID</TableCell>
              <TableCell sx={thSx}>Customer</TableCell>
              <TableCell sx={thSx}>Items</TableCell>
              <TableCell sx={thSx}>Total</TableCell>
              <TableCell sx={thSx}>Payment</TableCell>
              <TableCell sx={thSx}>Status</TableCell>
              <TableCell sx={thSx}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} sx={{ textAlign: "center", py: 6, color: "#888" }}>
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <OrderRow key={order._id} order={order} onStatusChange={handleStatusChange} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

const thSx = { fontWeight: 700, fontSize: 13, color: "#555" };