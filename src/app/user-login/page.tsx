"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Button, TextField, Typography,
  InputAdornment, IconButton, Alert, CircularProgress, Link,
} from "@mui/material";
import {
  Visibility, VisibilityOff, EmailOutlined, LockOutlined,
} from "@mui/icons-material";
import { api } from "@/lib/api";

    export default function LoginPage() {
        const router = useRouter();
        const [form, setForm] = useState({ email: "", password: "" });
        const [showPassword, setShowPassword] = useState(false);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            setError("");
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (!form.email || !form.password) return setError("Email and password are required.");
            setLoading(true);
            setError("");
            try {
                const data = await api("/user/login", {
                    method: "POST",
                    body: JSON.stringify(form),
                }, true);
                localStorage.setItem("token", data.token);
                document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
                const redirectTo = new URLSearchParams(window.location.search).get("redirect");
                router.push(redirectTo || "/");
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        }

        return (
            <Box sx={{ display: "flex", minHeight: "100vh" }}>

            {/* LEFT — Background Image */}
            <Box sx={{
                display: { xs: "none", md: "block" },
                flex: 1,
                backgroundImage: `url(https://wetinuneed.com/public/uploads/frontend/post-ad/shop/6745/IMG-20210924-WA0023.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.1))",
                }
            }}>
                {/* Brand overlay on image */}
                <Box sx={{ position: "absolute", bottom: 48, left: 48, zIndex: 1 }}>
                <Typography sx={{
                    fontSize: 42, fontWeight: 800, color: "#fff",
                    letterSpacing: 4, textTransform: "uppercase",
                    textShadow: "0 2px 20px rgba(0,0,0,0.3)"
                }}>
                    Footies by Zayn
                </Typography>
                <Typography sx={{ color: "rgba(255,255,255,0.7)", letterSpacing: 3, fontSize: 12, textTransform: "uppercase" }}>
                    Walk in confidence
                </Typography>
                </Box>
            </Box>

            {/* RIGHT — Login Form */}
            <Box sx={{
                width: { xs: "100%", md: "440px" },
                minHeight: "100vh",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: { xs: 4, sm: 6 },
                py: 6,
            }}>

                {/* Mobile brand */}
                <Box sx={{ display: { xs: "block", md: "none" }, mb: 4 }}>
                <Typography sx={{ fontSize: 28, fontWeight: 800, letterSpacing: 3, textTransform: "uppercase", color: "#111" }}>
                    FootiesbyZayn
                </Typography>
                </Box>

                <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#111", mb: 0.5 }}>
                Sign in
                </Typography>
                <Typography sx={{ color: "#888", fontSize: 14, mb: 4 }}>
                Welcome back! Enter your details below.
                </Typography>

                {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: 13 }}>
                    {error}
                </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    {/* Email */}
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#333", mb: 0.8 }}>
                        Email address
                    </Typography>
                    <TextField
                        fullWidth name="email" type="email" placeholder="you@example.com"
                        value={form.email} onChange={handleChange} required
                        InputProps={{
                        startAdornment: <InputAdornment position="start"><EmailOutlined sx={{ color: "#bbb", fontSize: 20 }} /></InputAdornment>,
                        }}
                        sx={inputSx}
                    />

                    {/* Password */}
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#333", mt: 2.5, mb: 0.8 }}>
                        Password
                    </Typography>
                    <TextField
                        fullWidth name="password" placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        value={form.password} onChange={handleChange} required
                        InputProps={{
                        startAdornment: <InputAdornment position="start"><LockOutlined sx={{ color: "#bbb", fontSize: 20 }} /></InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" sx={{ color: "#bbb" }}>
                            {showPassword ? <VisibilityOff sx={{ fontSize: 20 }} /> : <Visibility sx={{ fontSize: 20 }} />}
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
                        "&:hover": { background: "#333" },
                        "&:disabled": { opacity: 0.5 },
                        }}
                    >
                        {loading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Sign In"}
                    </Button>
                </Box>

                {/* Divider */}
                <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 2 }}>
                <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
                <Typography sx={{ color: "#ccc", fontSize: 12 }}>or</Typography>
                <Box sx={{ flex: 1, height: "1px", background: "#eee" }} />
                </Box>

                <Typography sx={{ textAlign: "center", fontSize: 13, color: "#888" }}>
                Do not have an account?{" "}
                <Link href="/register" underline="hover" sx={{ color: "#111", fontWeight: 700 }}>
                    Create one
                </Link>
                </Typography>

                <Typography sx={{ textAlign: "center", fontSize: 13, color: "#888", mt: 1 }}>
                Are you an admin?{" "}
                <Link href="/admin-login" underline="hover" sx={{ color: "#111", fontWeight: 700 }}>
                    Sign in here
                </Link>
                </Typography>

            </Box>
            </Box>
        );
    };


const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2,
    background: "#fafafa",
    fontSize: 14,
    "& fieldset": { borderColor: "#e5e5e5" },
    "&:hover fieldset": { borderColor: "#bbb" },
    "&.Mui-focused fieldset": { borderColor: "#111" },
  },
  "& .MuiInputBase-input::placeholder": { color: "#ccc", opacity: 1 },
};