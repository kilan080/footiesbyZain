"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Button, Container, TextField, Typography,
  InputAdornment, IconButton, Alert, CircularProgress, Link,
} from "@mui/material";
import {
  Visibility, VisibilityOff, PersonOutline, EmailOutlined,
  LockOutlined, PhoneOutlined, HomeOutlined,
} from "@mui/icons-material";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "",
    phone: "", addresses: "", password: "", confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = (): string | null => {
    if (!form.firstName || !form.lastName) return "First and last name are required.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return "A valid email is required.";
    if (!form.phone) return "Phone number is required.";
    if (!form.addresses) return "Address is required.";
    if (!form.password || form.password.length < 6) return "Password must be at least 6 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...payload } = form;
      await api("/user/register", { method: "POST", body: JSON.stringify(payload) }, true);
      toast.success("Account created! Redirecting to login...");
      setTimeout(() => router.push("/user-login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: { xs: "column", md: "row" },
    }}>
      {/* LEFT — Brand Panel */}
      <Box sx={{
        display: { xs: "none", md: "flex" },
        width: "380px",
        flexShrink: 0,
        background: "linear-gradient(160deg, #1565c0 0%, #1976d2 50%, #42a5f5 100%)",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 5,
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <Box sx={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <Box sx={{ position: "absolute", bottom: -60, left: -60, width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <Box sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* Logo/Brand */}
          <Typography sx={{
            fontSize: 36, fontWeight: 800, color: "#fff",
            letterSpacing: 3, textTransform: "uppercase", lineHeight: 1,
          }}>
            Footies
          </Typography>
          <Typography sx={{
            fontSize: 14, color: "rgba(255,255,255,0.6)",
            letterSpacing: 4, textTransform: "uppercase", mt: 0.5, mb: 5,
          }}>
            by Zain
          </Typography>

          <Box sx={{ width: 48, height: 2, background: "rgba(255,255,255,0.3)", mx: "auto", mb: 5 }} />

          <Typography sx={{ color: "#fff", fontSize: 22, fontWeight: 700, mb: 1.5, lineHeight: 1.3 }}>
            Join thousands of happy customers
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7 }}>
            Create your account and get access to exclusive deals, order tracking and more.
          </Typography>

          {/* Feature list */}
          {[
            "Free shipping on orders over ₦50,000",
            "Easy returns & exchanges",
            "Authentic brands only",
          ].map((text, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mt: 2 }}>
              <Box sx={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
              </Box>
              <Typography sx={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{text}</Typography>
            </Box>
          ))}
        </Box>

        {/* Bottom accent */}
        <Box sx={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.2)" }} />
      </Box>

      {/* RIGHT — Form */}
      <Box sx={{
        flex: 1,
        background: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 5, md: 4 },
        px: { xs: 3, sm: 5, md: 6 },
        overflowY: "auto",
      }}>
        <Container maxWidth="sm" disableGutters>

          {/* Mobile brand */}
          <Box sx={{ display: { xs: "block", md: "none" }, mb: 4, textAlign: "center" }}>
            <Typography sx={{ fontSize: 26, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#1976d2" }}>
              Footies by Zain
            </Typography>
          </Box>

          <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#111", mb: 0.5 }}>
            Create your account
          </Typography>
          <Typography sx={{ color: "#888", fontSize: 14, mb: 4 }}>
            Fill in the details below to get started.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>

            {/* First & Last Name */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelSx}>First Name</Typography>
                <TextField
                  fullWidth name="firstName" value={form.firstName}
                  onChange={handleChange} required placeholder="John"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={iconSx} /></InputAdornment> }}
                  sx={inputSx}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelSx}>Last Name</Typography>
                <TextField
                  fullWidth name="lastName" value={form.lastName}
                  onChange={handleChange} required placeholder="Doe"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={iconSx} /></InputAdornment> }}
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* Email */}
            <Typography sx={{ ...labelSx, mt: 2 }}>Email Address</Typography>
            <TextField
              fullWidth name="email" type="email" value={form.email}
              onChange={handleChange} required placeholder="john@example.com"
              InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined sx={iconSx} /></InputAdornment> }}
              sx={inputSx}
            />

            {/* Phone & Address */}
            <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelSx}>Phone Number</Typography>
                <TextField
                  fullWidth name="phone" type="tel" value={form.phone}
                  onChange={handleChange} required placeholder="08012345678"
                  InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlined sx={iconSx} /></InputAdornment> }}
                  sx={inputSx}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={labelSx}>Address</Typography>
                <TextField
                  fullWidth name="addresses" value={form.addresses}
                  onChange={handleChange} required placeholder="123 Street, Lagos"
                  InputProps={{ startAdornment: <InputAdornment position="start"><HomeOutlined sx={iconSx} /></InputAdornment> }}
                  sx={inputSx}
                />
              </Box>
            </Box>

            {/* Password */}
            <Typography sx={{ ...labelSx, mt: 2 }}>Password</Typography>
            <TextField
              fullWidth name="password" value={form.password}
              onChange={handleChange} required placeholder="Min. 6 characters"
              type={showPassword ? "text" : "password"}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlined sx={iconSx} /></InputAdornment>,
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#bbb" }}>
                    {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>,
              }}
              sx={inputSx}
            />

            {/* Confirm Password */}
            <Typography sx={{ ...labelSx, mt: 2 }}>Confirm Password</Typography>
            <TextField
              fullWidth name="confirmPassword" value={form.confirmPassword}
              onChange={handleChange} required placeholder="Repeat your password"
              type={showConfirm ? "text" : "password"}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlined sx={iconSx} /></InputAdornment>,
                endAdornment: <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" sx={{ color: "#bbb" }}>
                    {showConfirm ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
                  </IconButton>
                </InputAdornment>,
              }}
              sx={inputSx}
            />

            {/* Submit */}
            <Button
              type="submit" fullWidth disabled={loading}
              sx={{
                mt: 4, py: 1.6, borderRadius: 2,
                background: "#1976d2", color: "#fff",
                fontWeight: 700, fontSize: 14, letterSpacing: 1.5,
                textTransform: "uppercase",
                boxShadow: "0 4px 15px rgba(25,118,210,0.35)",
                "&:hover": { background: "#1565c0", boxShadow: "0 6px 20px rgba(25,118,210,0.45)" },
                "&:disabled": { opacity: 0.6 },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Create Account"}
            </Button>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 2 }}>
            <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
            <Typography sx={{ color: "#ccc", fontSize: 12 }}>or</Typography>
            <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
          </Box>

          <Typography sx={{ textAlign: "center", fontSize: 13, color: "#888" }}>
            Already have an account?{" "}
            <Link href="/user-login" underline="hover" sx={{ color: "#1976d2", fontWeight: 700 }}>
              Sign in
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

const labelSx = { fontSize: 13, fontWeight: 600, color: "#333", mb: 0.8 };
const iconSx = { color: "#bbb", fontSize: 20 };

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fafafa",
    fontSize: 14,
    "& fieldset": { borderColor: "#e5e5e5" },
    "&:hover fieldset": { borderColor: "#90caf9" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    // ← fix autofill white background
    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px #fafafa inset",
      WebkitTextFillColor: "#111",
    },
  },
  "& .MuiInputLabel-root": { color: "#888" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#1976d2" },
};