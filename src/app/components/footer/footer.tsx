"use client";

import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import emailjs from "@emailjs/browser";
import { Divider, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Image from "next/image";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  email: string;
};

export default function Footer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    shouldFocusError: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);
    emailjs
      .send(
        "service_y6bcdi1",
        "template_zyr3owi",
        {
          from_email: data.email,
          to_email: "umarzainab511@gmail.com",
          message: `New subscription from ${data.email}`,
        },
        "aZJ361uwGwYH8wFKe",
      )
      .then(() => {
        toast.success("Thank you! Your email was sent successfully.");
        reset();
      })
      .catch(() => {
        toast.error("Oops, something went wrong.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box sx={{ background: "#f9fafb", borderTop: "1px solid #eee", mt: 4 }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        {/* Top section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: 4,
          }}
        >
          {/* Brand + Newsletter */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <Image
              src="/image.png"
              loading="lazy"
              alt="Footies by Zain"
              width={180}
              height={60}
            />
            <Typography
              sx={{
                fontSize: 13,
                color: "#888",
                maxWidth: 260,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Premium footwear delivered to your door across Nigeria.
            </Typography>

            {/* Newsletter */}
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "#333",
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              Sign up for discounts & updates
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <TextField
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                placeholder="your@email.com"
                size="small"
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{
                  width: 220,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    fontSize: 13,
                    "& fieldset": { borderColor: "#e5e5e5" },
                    "&:hover fieldset": { borderColor: "#1976d2" },
                    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                disabled={loading}
                size="small"
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  background: "#1976d2",
                  "&:hover": { background: "#1565c0" },
                  px: 2,
                }}
              >
                {loading ? "Sending..." : "Subscribe"}
              </Button>
            </Box>
          </Box>

          {/* Links */}
          <Box sx={{ display: "flex", gap: { xs: 4, sm: 6 } }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#333",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                Company
              </Typography>
              <Link
                href="/about"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                Contact Us
              </Link>
              <Link
                href="/testimonials"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                Testimonials
              </Link>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#333",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  mb: 0.5,
                }}
              >
                Support
              </Typography>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                Terms of Service
              </Link>
              <Link
                href="mailto:umarzainab511@gmail.com"
                underline="hover"
                sx={{ fontSize: 13, color: "#666" }}
              >
                umarzainab511@gmail.com
              </Link>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bottom section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography sx={{ fontSize: 12, color: "#aaa" }}>
            &copy; {new Date().getFullYear()} Footies by Zain. All rights
            reserved.
          </Typography>

          {/* Social icons */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <Link href="#" target="_blank" rel="noopener">
              <FacebookIcon sx={{ fontSize: 22, color: "#1877F2" }} />
            </Link>
            <Link href="#" target="_blank" rel="noopener">
              <InstagramIcon sx={{ fontSize: 22, color: "#E4405F" }} />
            </Link>
          </Box>

          {/* Admin + Sign in links */}
          <Typography sx={{ fontSize: 12, color: "#aaa" }}>
            <Link
              href="/admin-login"
              style={{ color: "#aaa", textDecoration: "none" }}
            >
              Admin
            </Link>
            {" · "}
            <Link
              href="/user-login"
              style={{ color: "#aaa", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
