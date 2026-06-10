"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box, Button, Typography, TextField, Stepper, Step,
  StepLabel, Divider, Alert, CircularProgress,
  Radio, RadioGroup, FormControlLabel, Paper,
} from "@mui/material";
import {
  LocalShippingOutlined, PaymentOutlined, CheckCircleOutline,
  CreditCardOutlined, DeliveryDiningOutlined,
} from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCart } from "@/cartContext/cartContext";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

declare global {
  interface Window {
    PaystackPop: {
      setup: (options: PaystackOptions) => { openIframe: () => void };
    };
  }
}

interface PaystackOptions {
  key: string;
  email: string;
  amount: number; // in kobo
  currency: string;
  ref: string;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

function usePaystackScript() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (document.getElementById("paystack-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "paystack-script";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);
  }, []);

  return loaded;
}

const DELIVERY_FEE = 2000;
const steps = ["Delivery Info", "Payment", "Confirm"];

const PAYSTACK_TEST_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ?? "";

interface DeliveryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const paystackReady = usePaystackScript();

  const [delivery, setDelivery] = useState<DeliveryForm>({
    firstName: "", lastName: "", email: "",
    phone: "", address: "", city: "", state: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user-login");
      return;
    }
    if (cart.length === 0 && activeStep !== 2) {
      router.push("/");
    }

    api("/user/me")
      .then((data) => {
        setDelivery((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.addresses || "",
        }));
      })
      .catch(() => null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + DELIVERY_FEE;

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const validateDelivery = () => {
    const { firstName, lastName, email, phone, address, city, state } = delivery;
    if (!firstName || !lastName || !email || !phone || !address || !city || !state) {
      setError("All delivery fields are required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateDelivery()) return;
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setActiveStep((prev) => prev - 1);
  };

  const submitOrder = async (paymentReference?: string) => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: item.quantity,
        })),
        subtotal,
        deliveryFee: DELIVERY_FEE,
        total,
        deliveryInfo: delivery,
        paymentMethod,
        paymentReference: paymentReference ?? null,
        paymentStatus: paymentReference ? "paid" : "pending",
      };

      const data = await api("/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setOrderId(data.order._id);
      clearCart();
      toast.success("Order placed successfully!");
      setActiveStep(2);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to place order.";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackPayment = () => {
    if (!paystackReady || !window.PaystackPop) {
      toast.error("Payment system is still loading. Please try again.");
      return;
    }

    const ref = `order_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_TEST_KEY,
      email: delivery.email,
      amount: total * 100,
      currency: "NGN",
      ref,
      callback: (response) => {
        console.log("Paystack callback response:", response);
        toast.success("Payment successful! Placing your order...");
        void submitOrder(response.reference);
      },
      onClose: () => {
        toast.error("Payment cancelled. Your order was not placed.");
      },
    });

    handler.openIframe();
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === "card") {
      handlePaystackPayment();
    } else {
      submitOrder();
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f5f7fa", pt: 10, pb: 6, px: { xs: 2, md: 6 } }}>
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>

        <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111", mb: 4 }}>
          Checkout
        </Typography>

        {/* Stepper */}
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>

          {/* LEFT — Step Content */}
          <Box sx={{ flex: 1 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => router.push("/")}
              sx={{ mb: 2, textTransform: "none", color: "#666" }}
            >
              Continue Shopping
            </Button>

            {/* STEP 1 — Delivery Info */}
            {activeStep === 0 && (
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <LocalShippingOutlined sx={{ color: "#2563eb" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Delivery Information</Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

                <Box sx={{ display: "flex", gap: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={labelSx}>First Name</Typography>
                    <TextField fullWidth name="firstName" value={delivery.firstName} onChange={handleDeliveryChange} sx={inputSx} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={labelSx}>Last Name</Typography>
                    <TextField fullWidth name="lastName" value={delivery.lastName} onChange={handleDeliveryChange} sx={inputSx} />
                  </Box>
                </Box>

                <Typography sx={{ ...labelSx, mt: 2 }}>Email</Typography>
                <TextField fullWidth name="email" type="email" value={delivery.email} onChange={handleDeliveryChange} sx={inputSx} />

                <Typography sx={{ ...labelSx, mt: 2 }}>Phone</Typography>
                <TextField fullWidth name="phone" value={delivery.phone} onChange={handleDeliveryChange} sx={inputSx} />

                <Typography sx={{ ...labelSx, mt: 2 }}>Address</Typography>
                <TextField fullWidth name="address" value={delivery.address} onChange={handleDeliveryChange} sx={inputSx} />

                <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: { xs: "wrap", sm: "nowrap" } }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={labelSx}>City</Typography>
                    <TextField fullWidth name="city" value={delivery.city} onChange={handleDeliveryChange} sx={inputSx} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={labelSx}>State</Typography>
                    <TextField fullWidth name="state" value={delivery.state} onChange={handleDeliveryChange} sx={inputSx} />
                  </Box>
                </Box>

                <Button fullWidth onClick={handleNext} sx={primaryBtnSx}>
                  Continue to Payment
                </Button>
              </Paper>
            )}

            {/* STEP 2 — Payment */}
            {activeStep === 1 && (
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                  <PaymentOutlined sx={{ color: "#2563eb" }} />
                  <Typography sx={{ fontWeight: 700, fontSize: 16 }}>Payment Method</Typography>
                </Box>

                {/* Test mode banner */}
                {/* <Alert severity="info" sx={{ mb: 2, borderRadius: 2, fontSize: 12 }}>
                  <strong>Test Mode:</strong> Use Paystack test card <strong>4084 0840 8408 4081</strong>,
                  any future expiry, CVV <strong>408</strong>, PIN <strong>0000</strong>, OTP <strong>123456</strong>.
                </Alert> */}

                {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

                <RadioGroup value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  {/* Card via Paystack */}
                  <Box
                    onClick={() => setPaymentMethod("card")}
                    sx={{
                      border: `2px solid ${paymentMethod === "card" ? "#2563eb" : "#e5e5e5"}`,
                      borderRadius: 2, p: 2, mb: 2, cursor: "pointer",
                      background: paymentMethod === "card" ? "#eff6ff" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <FormControlLabel
                      value="card"
                      control={<Radio sx={{ color: "#2563eb", "&.Mui-checked": { color: "#2563eb" } }} />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CreditCardOutlined sx={{ color: "#2563eb" }} />
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                              Pay with Card
                              <Box component="span" sx={{
                                ml: 1, fontSize: 11, fontWeight: 700,
                                background: "#dcfce7", color: "#16a34a",
                                px: 1, py: 0.3, borderRadius: 1,
                              }}>
                                via Paystack
                              </Box>
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "#888" }}>
                              Visa, Mastercard, Verve — secured by Paystack
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>

                  {/* Cash on Delivery */}
                  <Box
                    onClick={() => setPaymentMethod("cash on delivery")}
                    sx={{
                      border: `2px solid ${paymentMethod === "cash on delivery" ? "#2563eb" : "#e5e5e5"}`,
                      borderRadius: 2, p: 2, cursor: "pointer",
                      background: paymentMethod === "cash on delivery" ? "#eff6ff" : "#fff",
                      transition: "all 0.2s",
                    }}
                  >
                    <FormControlLabel
                      value="cash on delivery"
                      control={<Radio sx={{ color: "#2563eb", "&.Mui-checked": { color: "#2563eb" } }} />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <DeliveryDiningOutlined sx={{ color: "#2563eb" }} />
                          <Box>
                            <Typography sx={{ fontWeight: 600, fontSize: 14 }}>Cash on Delivery</Typography>
                            <Typography sx={{ fontSize: 12, color: "#888" }}>Pay when your order arrives</Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </Box>
                </RadioGroup>

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button onClick={handleBack} sx={secondaryBtnSx}>Back</Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={loading || (paymentMethod === "card" && !paystackReady)}
                    sx={primaryBtnSx}
                  >
                    {loading
                      ? <CircularProgress size={20} sx={{ color: "#fff" }} />
                      : paymentMethod === "card"
                        ? `Pay ₦${total.toLocaleString()}`
                        : "Place Order"
                    }
                  </Button>
                </Box>
              </Paper>
            )}

            {/* STEP 3 — Success */}
            {activeStep === 2 && (
              <Paper sx={{ p: 5, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", textAlign: "center" }}>
                <CheckCircleOutline sx={{ fontSize: 72, color: "#22c55e", mb: 2 }} />
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#111", mb: 1 }}>
                  Order Placed!
                </Typography>
                <Typography sx={{ color: "#888", mb: 1 }}>
                  Thank you for your order. We will get it to you soon.
                </Typography>
                {orderId && (
                  <Typography sx={{ fontSize: 13, color: "#aaa", mb: 4 }}>
                    Order ID: <strong>{orderId}</strong>
                  </Typography>
                )}
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                  <Button onClick={() => router.push("/")} sx={secondaryBtnSx}>
                    Continue Shopping
                  </Button>
                  <Button onClick={() => router.push("/profile")} sx={primaryBtnSx}>
                    View My Orders
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>

          {/* RIGHT — Order Summary */}
          {activeStep !== 2 && (
            <Box sx={{ width: { xs: "100%", md: 320 } }}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16, mb: 2 }}>Order Summary</Typography>

                {cart.map((item) => (
                  <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5, alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Box sx={{
                        width: 40, height: 40, borderRadius: 1, overflow: "hidden",
                        backgroundImage: `url(${item.image})`, backgroundSize: "cover",
                        flexShrink: 0,
                      }} />
                      <Box>
                        <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: 12, color: "#888" }}>x{item.quantity}</Typography>
                      </Box>
                    </Box>
                    <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>Subtotal</Typography>
                  <Typography sx={{ fontSize: 13 }}>₦{subtotal.toLocaleString()}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography sx={{ fontSize: 13, color: "#888" }}>Delivery Fee</Typography>
                  <Typography sx={{ fontSize: 13 }}>₦{DELIVERY_FEE.toLocaleString()}</Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 700, color: "#2563eb" }}>₦{total.toLocaleString()}</Typography>
                </Box>
              </Paper>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const labelSx = { fontSize: 13, fontWeight: 600, color: "#333", mb: 0.8 };

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 2, background: "#fafafa", fontSize: 14,
    "& fieldset": { borderColor: "#e5e5e5" },
    "&:hover fieldset": { borderColor: "#93c5fd" },
    "&.Mui-focused fieldset": { borderColor: "#2563eb" },
  },
};

const primaryBtnSx = {
  flex: 1, mt: 3, py: 1.5, borderRadius: 2,
  background: "#2563eb", color: "#fff",
  fontWeight: 700, fontSize: 14, textTransform: "none",
  "&:hover": { background: "#1d4ed8" },
  "&:disabled": { opacity: 0.6 },
};

const secondaryBtnSx = {
  flex: 1, mt: 3, py: 1.5, borderRadius: 2,
  border: "1px solid #e5e5e5", color: "#555",
  fontWeight: 600, fontSize: 14, textTransform: "none",
  "&:hover": { background: "#f5f5f5" },
};