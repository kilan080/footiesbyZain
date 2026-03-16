"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Typography, Avatar, Button, TextField,
  Divider, Alert, CircularProgress, IconButton, InputAdornment,
} from "@mui/material";
import {
  EditOutlined, LockOutlined, LogoutOutlined,
  PersonOutline, EmailOutlined, PhoneOutlined,
  HomeOutlined, Visibility, VisibilityOff, SaveOutlined,
} from "@mui/icons-material";
import { api } from "@/lib/api";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Navbar from '@/app/components/navbar/navbar'
import toast from "react-hot-toast";
import useSWR from "swr";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: string;
}

interface OrderItemDisplay {
  name: string;
  quantity: number;
  price: number;
}

type ActiveSection = "profile" | "password" | "orders";

export default function ProfilePage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<ActiveSection>("profile");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState<UserProfile>({
    firstName: "", lastName: "", email: "", phone: "", addresses: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "", newPassword: "", confirmPassword: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data, isLoading: loading, mutate } = useSWR(
    "/user/me",
    () => api("/user/me"),
    {
      onSuccess: (data) => {
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          addresses: data.addresses || "",
        });
      },
      onError: () => {
        router.push("/user-login");
      }
    }
  );

  const user = data;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

    const handleSaveProfile = async () => {
    setSaving(true);
    try {
      await api("/user/me", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      await mutate(); // ← refreshes cached profile data
      toast.success("Profile updated successfully!");
      setEditMode(false);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword)
      return setError("All password fields are required.");
    if (passwordForm.newPassword.length < 6)
      return setError("New password must be at least 6 characters.");
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return setError("Passwords do not match.");

    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await api("/user/me/password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      toast.success("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Failed to change password.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/user-login");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f7fa", pt: 10, pb: 6, px: { xs: 2, md: 6 } }}>
      <Box sx={{ maxWidth: 1000, mx: "auto", display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        <Navbar />
        {/* SIDEBAR */}
        <Box sx={{
          width: { xs: "100%", md: 260 },
          background: "#fff",
          borderRadius: 3,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "fit-content",
        }}>
          {/* Avatar */}
          <Avatar sx={{
            width: 80, height: 80, fontSize: 32, fontWeight: 700,
            background: "linear-gradient(135deg, #2563eb, #60a5fa)",
            mb: 2,
          }}>
            {user?.firstName?.charAt(0).toUpperCase()}
          </Avatar>

          <Typography sx={{ fontWeight: 700, fontSize: 16, color: "#111" }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#888", mb: 3 }}>
            {user?.email}
          </Typography>

          <Divider sx={{ width: "100%", mb: 2 }} />

          {/* Nav items */}
          {[
            { label: "My Profile", icon: <PersonOutline fontSize="small" />, key: "profile" },
            { label: "Change Password", icon: <LockOutlined fontSize="small" />, key: "password" },
            { label: "My Orders", icon: <ShoppingBagOutlined fontSize="small" />, key: "orders" },
          ].map((item) => (
            <Button
              key={item.key}
              fullWidth
              startIcon={item.icon}
              onClick={() => {
                setActiveSection(item.key as ActiveSection);
                setError("");
                setSuccess("");
                setEditMode(false);
              }}
              sx={{
                justifyContent: "flex-start",
                mb: 1,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                fontSize: 14,
                color: activeSection === item.key ? "#2563eb" : "#555",
                background: activeSection === item.key ? "#eff6ff" : "transparent",
                "&:hover": { background: "#eff6ff", color: "#2563eb" },
              }}
            >
              {item.label}
            </Button>
          ))}

          <Divider sx={{ width: "100%", my: 2 }} />

          <Button
            fullWidth
            startIcon={<LogoutOutlined fontSize="small" />}
            onClick={handleLogout}
            sx={{
              justifyContent: "flex-start", borderRadius: 2,
              textTransform: "none", fontWeight: 500, fontSize: 14,
              color: "#ef4444",
              "&:hover": { background: "#fef2f2" },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* MAIN CONTENT */}
        <Box sx={{ flex: 1, background: "#fff", borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", p: { xs: 3, md: 4 } }}>

          {(success || error) && (
            <Alert severity={success ? "success" : "error"} sx={{ mb: 3, borderRadius: 2 }}
              onClose={() => { setSuccess(""); setError(""); }}>
              {success || error}
            </Alert>
          )}

          {/* PROFILE SECTION */}
          {activeSection === "profile" && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Box>
                  <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111" }}>My Profile</Typography>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>Manage your personal information</Typography>
                </Box>
                {!editMode && (
                  <Button
                    startIcon={<EditOutlined />}
                    onClick={() => setEditMode(true)}
                    sx={{
                      borderRadius: 2, textTransform: "none", fontWeight: 600,
                      color: "#2563eb", border: "1px solid #2563eb",
                      "&:hover": { background: "#eff6ff" },
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Box>

              <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={labelSx}>First Name</Typography>
                  <TextField fullWidth name="firstName" value={form.firstName}
                    onChange={handleFormChange} disabled={!editMode}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={iconSx} /></InputAdornment> }}
                    sx={inputSx(editMode)} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={labelSx}>Last Name</Typography>
                  <TextField fullWidth name="lastName" value={form.lastName}
                    onChange={handleFormChange} disabled={!editMode}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={iconSx} /></InputAdornment> }}
                    sx={inputSx(editMode)} />
                </Box>
              </Box>

              <Typography sx={{ ...labelSx, mt: 2 }}>Email Address</Typography>
              <TextField fullWidth name="email" value={form.email}
                onChange={handleFormChange} disabled
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined sx={iconSx} /></InputAdornment> }}
                sx={inputSx(false)} />
              <Typography sx={{ fontSize: 11, color: "#aaa", mt: 0.5 }}>Email cannot be changed.</Typography>

              <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={labelSx}>Phone</Typography>
                  <TextField fullWidth name="phone" value={form.phone}
                    onChange={handleFormChange} disabled={!editMode}
                    InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlined sx={iconSx} /></InputAdornment> }}
                    sx={inputSx(editMode)} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={labelSx}>Address</Typography>
                  <TextField fullWidth name="addresses" value={form.addresses}
                    onChange={handleFormChange} disabled={!editMode}
                    InputProps={{ startAdornment: <InputAdornment position="start"><HomeOutlined sx={iconSx} /></InputAdornment> }}
                    sx={inputSx(editMode)} />
                </Box>
              </Box>

              {editMode && (
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    onClick={() => { setEditMode(false); setError(""); }}
                    sx={{ borderRadius: 2, textTransform: "none", color: "#888", border: "1px solid #ddd", flex: 1 }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    startIcon={saving ? <CircularProgress size={16} /> : <SaveOutlined />}
                    sx={{
                      borderRadius: 2, textTransform: "none", fontWeight: 700,
                      background: "#2563eb", color: "#fff", flex: 1,
                      "&:hover": { background: "#1d4ed8" },
                      "&:disabled": { opacity: 0.6 },
                    }}
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </Box>
              )}
            </>
          )}

          {/* PASSWORD SECTION */}
          {activeSection === "password" && (
            <>
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111" }}>Change Password</Typography>
                <Typography sx={{ fontSize: 13, color: "#888" }}>Make sure your password is strong and secure</Typography>
              </Box>

              <Typography sx={labelSx}>Current Password</Typography>
              <TextField fullWidth name="currentPassword" value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                type={showCurrent ? "text" : "password"}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOutlined sx={iconSx} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => setShowCurrent(!showCurrent)} edge="end" sx={{ color: "#bbb" }}>
                      {showCurrent ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>,
                }}
                sx={inputSx(true)} />

              <Typography sx={{ ...labelSx, mt: 2 }}>New Password</Typography>
              <TextField fullWidth name="newPassword" value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                type={showNew ? "text" : "password"}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOutlined sx={iconSx} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => setShowNew(!showNew)} edge="end" sx={{ color: "#bbb" }}>
                      {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>,
                }}
                sx={inputSx(true)} />

              <Typography sx={{ ...labelSx, mt: 2 }}>Confirm New Password</Typography>
              <TextField fullWidth name="confirmPassword" value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                type={showConfirm ? "text" : "password"}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LockOutlined sx={iconSx} /></InputAdornment>,
                  endAdornment: <InputAdornment position="end">
                    <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" sx={{ color: "#bbb" }}>
                      {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>,
                }}
                sx={inputSx(true)} />

              <Button
                fullWidth
                onClick={handleChangePassword}
                disabled={saving}
                startIcon={saving ? <CircularProgress size={16} /> : <LockOutlined />}
                sx={{
                  mt: 4, py: 1.5, borderRadius: 2, textTransform: "none",
                  fontWeight: 700, fontSize: 14,
                  background: "#2563eb", color: "#fff",
                  "&:hover": { background: "#1d4ed8" },
                  "&:disabled": { opacity: 0.6 },
                }}
              >
                {saving ? "Updating..." : "Update Password"}
              </Button>
            </>
          )}
          {activeSection === "orders" && <OrdersSection /> }
        </Box>
      </Box>
    </Box>
  );
}


function OrdersSection() {
  interface Order {
    _id: string;
    items: {
      name: string;
      quantity: number;
      price: number;
    }[];
    total: number;
    status: string;
    paymentMethod: string;
    createdAt: string;
  }
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/orders/all")
      .then((data) => setOrders(data.orders || []))
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
      <CircularProgress />
    </Box>
  );

  if (orders.length === 0) return (
    <Box sx={{ textAlign: "center", py: 6 }}>
      <ShoppingBagOutlined sx={{ fontSize: 56, color: "#ddd", mb: 2 }} />
      <Typography sx={{ fontWeight: 700, color: "#111", mb: 0.5 }}>No orders yet</Typography>
      <Typography sx={{ color: "#888", fontSize: 13 }}>Your orders will appear here once you shop.</Typography>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#111" }}>My Orders</Typography>
        <Typography sx={{ fontSize: 13, color: "#888" }}>Track and manage your orders</Typography>
      </Box>

      {orders.map((order) => (
        <Box key={order._id} sx={{
          border: "1px solid #e5e5e5", borderRadius: 2, p: 2.5, mb: 2,
        }}>
          {/* Order Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5, flexWrap: "wrap", gap: 1 }}>
            <Box>
              <Typography sx={{ fontSize: 13, color: "#888" }}>Order ID</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{order._id}</Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography sx={{ fontSize: 13, color: "#888" }}>
                {new Date(order.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
              </Typography>
              <Box sx={{
                display: "inline-block", px: 1.5, py: 0.3, borderRadius: 10,
                fontSize: 12, fontWeight: 600, mt: 0.5,
                background: statusColor(order.status).bg,
                color: statusColor(order.status).text,
              }}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Box>
            </Box>
          </Box>

          <Divider sx={{ mb: 1.5 }} />

          {/* Order Items */}
          {order.items.map((item: OrderItemDisplay, i: number) => (
            <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography sx={{ fontSize: 13 }}>{item.name} x{item.quantity}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600 }}>₦{(item.price * item.quantity).toLocaleString()}</Typography>
            </Box>
          ))}

          <Divider sx={{ my: 1.5 }} />

          {/* Order Footer */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography sx={{ fontSize: 13, color: "#888" }}>
              Payment: <strong>{order.paymentMethod}</strong>
            </Typography>
            <Typography sx={{ fontWeight: 700, color: "#2563eb" }}>
              Total: ₦{order.total.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

const statusColor = (status: string) => {
  switch (status) {
    case "pending": return { bg: "#fef9c3", text: "#854d0e" };
    case "confirmed": return { bg: "#dbeafe", text: "#1e40af" };
    case "shipped": return { bg: "#e0f2fe", text: "#0369a1" };
    case "delivered": return { bg: "#dcfce7", text: "#166534" };
    case "cancelled": return { bg: "#fee2e2", text: "#991b1b" };
    default: return { bg: "#f5f5f5", text: "#555" };
  }
};



const labelSx = { fontSize: 13, fontWeight: 600, color: "#333", mb: 0.8 };
const iconSx = { color: "#bbb", fontSize: 20 };

const inputSx = (editable: boolean) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: editable ? "#fafafa" : "#f5f5f5",
    fontSize: 14,
    "& fieldset": { borderColor: "#e5e5e5" },
    "&:hover fieldset": { borderColor: editable ? "#93c5fd" : "#e5e5e5" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
  },
});