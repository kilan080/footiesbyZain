"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Button, Container, TextField, Typography,
  InputAdornment, IconButton, Alert, CircularProgress, Divider, Link,
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
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validate = (): string | null => {
    if (!form.firstName || !form.lastName) return "First and last name are required.";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) return "A valid email is required.";
    if (!form.phone) return "Phone number is required.";
    if (!form.addresses) return "addresses is required.";
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
      
      await api("/user/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }, true);

      toast.success("Account created! Redirecting to login...");
      setTimeout(() => router.push("/user-login"), 2000);
    } catch (err: unknown) {
      if(err instanceof Error)
        setError(err.message);
      else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      background: "#1976d2;",
      display: "flex", alignItems: "center", justifyContent: "center", py: 4,
    }}>
      <Container maxWidth="sm">
        <Box component="form" onSubmit={handleSubmit} sx={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
        }}>

          {/* Brand */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: "#fff", letterSpacing: 3, textTransform: "uppercase" }}>
              Footies by Zayn
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", letterSpacing: 2, textTransform: "uppercase", fontSize: 11, mt: 0.5 }}>
              Premium Footwear
            </Typography>
            <Divider sx={{ mt: 3, borderColor: "rgba(255,255,255,0.1)" }} />
          </Box>

          <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600, mb: 0.5 }}>Create your account</Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.45)", mb: 3 }}>Join us and step into something special.</Typography>

          {error && <Alert severity="error" sx={alertSx("error")}>{error}</Alert>}
          {success && <Alert severity="success" sx={alertSx("success")}>{success}</Alert>}

          {/* First & Last Name */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                <TextField fullWidth name="firstName" label="First Name" value={form.firstName} onChange={handleChange} required
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment> }}
                    sx={inputSx} 
                />
                <TextField fullWidth name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} required
                    InputProps={{ startAdornment: <InputAdornment position="start"><PersonOutline sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment> }}
                    sx={inputSx} 
                />
            </Box>

          {/* Email */}
          <TextField fullWidth name="email" label="Email Address" type="email" value={form.email} onChange={handleChange} required
            InputProps={{ startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment> }}
            sx={{ ...inputSx, mt: 2 }} />

          {/* Phone & Address */}
          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
            <TextField fullWidth name="phone" label="Phone Number" type="tel" value={form.phone} onChange={handleChange} required
              InputProps={{ startAdornment: <InputAdornment position="start"><PhoneOutlined sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment> }}
              sx={inputSx} />
            <TextField fullWidth name="addresses" label="addresses" value={form.addresses} onChange={handleChange} required
              InputProps={{ startAdornment: <InputAdornment position="start"><HomeOutlined sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment> }}
              sx={inputSx} />
          </Box>

          {/* Password */}
          <TextField fullWidth name="password" label="Password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} required
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "rgba(255,255,255,0.4)" }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            sx={{ ...inputSx, mt: 2 }} />

          {/* Confirm Password */}
          <TextField fullWidth name="confirmPassword" label="Confirm Password" type={showConfirm ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} required
            InputProps={{
              startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: "rgba(255,255,255,0.4)" }} /></InputAdornment>,
              endAdornment: <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" sx={{ color: "rgba(255,255,255,0.4)" }}>
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>,
            }}
            sx={{ ...inputSx, mt: 2 }} />

          {/* Submit */}
          <Button type="submit" fullWidth disabled={loading} sx={{
            mt: 4, py: 1.6, borderRadius: 2,
            background: "#1976d2;",
            color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: 1.5, textTransform: "uppercase",
            boxShadow: "0 4px 20px rgba(167,139,250,0.35)",
            "&:hover": { background: "#1976f3;", boxShadow: "0 6px 28px rgba(167,139,250,0.5)" },
            "&:disabled": { opacity: 0.6 },
          }}>
            {loading ? <CircularProgress size={22} sx={{ color: "#fff" }} /> : "Create Account"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", mt: 3, color: "rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link href="/user-login" underline="hover" sx={{ color: "#a78bfa", fontWeight: 600 }}>Sign in</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}


const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff", borderRadius: 2, background: "rgba(255,255,255,0.05)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.15)" },
    "&:hover fieldset": { borderColor: "rgba(167,139,250,0.5)" },
    "&.Mui-focused fieldset": { borderColor: "#a78bfa" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.4)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#a78bfa" },
};

const alertSx = (type: "error" | "success") => ({
  mb: 2, borderRadius: 2,
  background: type === "error" ? "rgba(211,47,47,0.15)" : "rgba(46,125,50,0.15)",
  color: type === "error" ? "#ff8a80" : "#69f0ae",
  border: `1px solid ${type === "error" ? "rgba(211,47,47,0.3)" : "rgba(46,125,50,0.3)"}`,
  "& .MuiAlert-icon": { color: type === "error" ? "#ff8a80" : "#69f0ae" },
});