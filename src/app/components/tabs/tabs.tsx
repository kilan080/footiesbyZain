"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { Skeleton } from "@mui/material";
import toast from "react-hot-toast";
import CardContent from "@mui/material/CardContent";
import { useCart } from "../../../cartContext/cartContext";
import LockOutlined from "@mui/icons-material/LockOutlined";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSearchParams } from "next/navigation";

function CategoryFromURL({
  categories,
  setActiveTab,
}: {
  categories: string[];
  setActiveTab: (cat: string) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const found = categories.find(
        (c) => c.toLowerCase() === category.toLowerCase(),
      );
      if (found) setActiveTab(found);
    } else {
      setActiveTab("all");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return null;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  description?: string;
  stock?: number;
}

const Tabs = () => {
  const { addToCart, cart } = useCart();
  const [addedId, setAddedId] = useState<string | null>(null);
  const categories = ["All", "Slides", "Shoes"];
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products`,
    fetcher,
  );

  const products: Product[] = data?.products || [];

  const filteredItems =
    activeTab === "all"
      ? products
      : products.filter(
          (item) => item.category.toLowerCase() === activeTab.toLowerCase(),
        );

  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "59px",
            backgroundColor: "#f5f5f5",
            gap: { xs: 2, sm: 3, md: 4, lg: 6 },
            alignItems: "center",
          }}
        >
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" width={60} height={28} />
          ))}
        </Box>
        <Box
          sx={{ mt: 4, maxWidth: "1200px", mx: "auto", px: { xs: 2, sm: 1 } }}
        >
          <Grid container spacing={3} justifyContent="center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Grid
                key={i}
                size={{ xs: 6, sm: 6, md: 3 }}
                display="flex"
                justifyContent="center"
              >
                <Box sx={{ width: 260 }}>
                  <Skeleton
                    variant="rectangular"
                    width={260}
                    height={190}
                    sx={{ borderRadius: 2 }}
                  />
                  <Skeleton
                    variant="text"
                    width="70%"
                    sx={{ mt: 1, fontSize: 20 }}
                  />
                  <Skeleton variant="text" width="40%" />
                  <Skeleton
                    variant="rounded"
                    width={260}
                    height={36}
                    sx={{ mt: 1, borderRadius: 8 }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={null}>
        <CategoryFromURL categories={categories} setActiveTab={setActiveTab} />
      </Suspense>

      <Box
        id="product-tabs"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "59px",
          backgroundColor: "#f5f5f5",
          gap: { xs: 2, sm: 3, md: 4, lg: 6 },
          alignItems: "center",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setActiveTab(category)}
            sx={{
              color: "black",
              textTransform: "none",
              border: "none",
              borderBottom: activeTab === category ? "2px solid black" : "none",
            }}
          >
            {category}
          </Button>
        ))}
      </Box>

      <Box sx={{ mt: 4, maxWidth: "1200px", mx: "auto", px: 1 }}>
        <Grid container spacing={3} justifyContent="center">
          {filteredItems.map((item) => (
            <Grid
              key={item._id}
              size={{ xs: 6, sm: 6, md: 3 }}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  width: { xs: "100%", sm: 260 },
                  height: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  paddingBottom: "15px",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <Link
                  href={`/products/${item._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      height: "190px",
                      width: "100%",
                    }}
                  >
                    <Image
                      src={item.images?.[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 600px) 50vw, 260px"
                      style={{
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                      }}
                      loading="lazy"
                    />
                  </Box>
                </Link>
                <CardContent sx={{ marginTop: "0px", marginBottom: "0px" }}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      fontSize: { xs: 13, sm: 15, md: 16 },
                      lineHeight: 1.3,
                    }}
                  >
                    {item.name}
                  </Typography>

                  <Typography variant="body1" color="text.secondary">
                    ₦{item.price.toLocaleString()}
                  </Typography>

                  {(item.stock ?? 0) > 0 && (item.stock ?? 0) <= 5 && (
                    <Typography sx={{ fontSize: 11, color: "#ef4444", mt: 1 }}>
                      Only {item.stock} left!
                    </Typography>
                  )}
                </CardContent>
                <Button
                  variant="contained"
                  startIcon={
                    item.stock === 0 ? (
                      <LockOutlined sx={{ fontSize: 20 }} />
                    ) : null
                  }
                  sx={{
                    // width: "100%",
                    borderRadius: 16,
                    textTransform: "none",
                    backgroundColor: item.stock === 0 ? "#333" : "#1976d2",
                    marginX: "15px",
                    // marginY: "15px",
                    "&:hover": {
                      backgroundColor: item.stock === 0 ? "#3339" : "#1565c0",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#ef4444",
                      color: "#fff",
                    },
                  }}
                  onClick={() => {
                    if (item.stock !== 0) {
                      const cartItem = cart.find((i) => i.id === item._id);
                      const currentQty = cartItem ? cartItem.quantity : 0;

                      if (
                        item.stock !== undefined &&
                        currentQty >= item.stock
                      ) {
                        toast.dismiss();
                        toast.error(
                          `Only ${item.stock} item${item.stock === 1 ? "" : "s"} available!`,
                        );
                        return;
                      }
                      addToCart({
                        id: item._id,
                        name: item.name,
                        price: item.price,
                        image: item.images?.[0],
                        quantity: 1,
                        stock: item.stock ?? 0,
                      });
                      toast.dismiss();
                      toast.success(`${item.name} added to cart!`);
                      setAddedId(item._id);
                      setTimeout(() => setAddedId(null), 1000);
                    }
                  }}
                >
                  {item.stock === 0
                    ? "Out of Stock"
                    : addedId === item._id
                      ? "Added ✓"
                      : "Add to Cart"}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Tabs;
