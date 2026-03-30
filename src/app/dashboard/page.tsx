"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Skeleton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  total: number;
  status: string;
  createdAt: string;
  deliveryInfo: { firstName: string; lastName: string };
  paymentMethod: string;
}

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  pendingOrders: number;
}

const statusColors: Record<
  string,
  "default" | "warning" | "info" | "success" | "error"
> = {
  pending: "warning",
  confirmed: "info",
  shipped: "info",
  delivered: "success",
  cancelled: "error",
};

const getMonthlyData = (orders: Order[]) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = months.map((month) => ({ month, revenue: 0, orders: 0 }));
  orders.forEach((order) => {
    if (order.status === "cancelled") return;
    const month = new Date(order.createdAt).getMonth();
    data[month].revenue += order.total;
    data[month].orders += 1;
  });
  return data;
};

const cardSx = {
  borderRadius: 3,
  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  border: "1px solid #f0f0f0",
  height: "100%",
};

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [monthlyData, setMonthlyData] = useState<
    { month: string; revenue: number; orders: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, productsRes, usersRes] = await Promise.all([
          api("/admin/orders"),
          api("/admin/products"),
          api("/admin/users"),
        ]);

        const allOrders: Order[] = ordersRes.orders || [];
        const products = productsRes.products || [];
        const users = usersRes.users || [];

        const totalRevenue = allOrders
          .filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + o.total, 0);

        const pendingOrders = allOrders.filter(
          (o) => o.status === "pending",
        ).length;

        setStats({
          totalRevenue,
          totalOrders: allOrders.length,
          totalProducts: products.length,
          totalCustomers: users.length,
          pendingOrders,
        });

        setOrders(allOrders.slice(0, 5));
        setMonthlyData(getMonthlyData(allOrders));
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = stats
    ? [
        {
          title: "Total Revenue",
          value: `₦${stats.totalRevenue.toLocaleString()}`,
          icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />,
          color: "#2563eb",
          bg: "#eff6ff",
          trend: "All time",
        },
        {
          title: "Total Orders",
          value: stats.totalOrders,
          icon: <ShoppingBagIcon sx={{ fontSize: 28 }} />,
          color: "#7c3aed",
          bg: "#f5f3ff",
          trend: "All time",
        },
        {
          title: "Total Products",
          value: stats.totalProducts,
          icon: <InventoryIcon sx={{ fontSize: 28 }} />,
          color: "#059669",
          bg: "#ecfdf5",
          trend: "In store",
        },
        {
          title: "Total Customers",
          value: stats.totalCustomers,
          icon: <PeopleIcon sx={{ fontSize: 28 }} />,
          color: "#d97706",
          bg: "#fffbeb",
          trend: "Registered",
        },
        {
          title: "Pending Orders",
          value: stats.pendingOrders,
          icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
          color: "#dc2626",
          bg: "#fef2f2",
          trend: "Needs attention",
        },
      ]
    : [];

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, width: "100%" }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="#111">
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </Typography>
      </Box>

      {/* Stat Cards */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,
        }}
      >
        {loading
          ? [1, 2, 3, 4, 5].map((i) => (
              <Box key={i} sx={{ flex: "1 1 180px", minWidth: 0 }}>
                <Skeleton
                  variant="rounded"
                  height={120}
                  sx={{ borderRadius: 3 }}
                />
              </Box>
            ))
          : statCards.map((card) => (
              <Box key={card.title} sx={{ flex: "1 1 180px", minWidth: 0 }}>
                <Card
                  sx={{
                    ...cardSx,
                    transition: "transform 0.2s ease",
                    "&:hover": { transform: "translateY(-2px)" },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight={500}
                          mb={1}
                        >
                          {card.title}
                        </Typography>
                        <Typography variant="h5" fontWeight={700} color="#111">
                          {card.value}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: card.color, fontWeight: 500 }}
                        >
                          {card.trend}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2,
                          background: card.bg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: card.color,
                          flexShrink: 0,
                        }}
                      >
                        {card.icon}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
      </Box>

      {/* Charts */}
      <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
        {/* Revenue Chart */}
        <Box sx={{ flex: "2 1 400px", minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="#111" mb={3}>
                Revenue Overview
              </Typography>
              {loading ? (
                <Skeleton variant="rounded" height={300} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#888" }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#888" }}
                      tickFormatter={(v) => `₦${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `₦${Number(value).toLocaleString()}`,
                        "Revenue",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      strokeWidth={2.5}
                      dot={{ fill: "#2563eb", r: 3 }}
                      activeDot={{ r: 6 }}
                      name="Revenue"
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Orders Chart */}
        <Box sx={{ flex: "1 1 250px", minWidth: 0 }}>
          <Card sx={cardSx}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} color="#111" mb={3}>
                Orders per Month
              </Typography>
              {loading ? (
                <Skeleton variant="rounded" height={300} />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 11, fill: "#888" }}
                    />
                    <YAxis tick={{ fontSize: 11, fill: "#888" }} />
                    <Tooltip formatter={(value) => [Number(value), "Orders"]} />
                    <Bar
                      dataKey="orders"
                      fill="#7c3aed"
                      radius={[4, 4, 0, 0]}
                      name="Orders"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Recent Orders */}
      <Card sx={cardSx}>
        <CardContent sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight={700} color="#111">
              Recent Orders
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "#2563eb", cursor: "pointer", fontWeight: 500 }}
              onClick={() => router.push("/dashboard/orders")}
            >
              View All →
            </Typography>
          </Box>

          {loading ? (
            <Skeleton variant="rounded" height={200} />
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        fontWeight: 700,
                        color: "#555",
                        fontSize: 13,
                        borderBottom: "2px solid #f0f0f0",
                      },
                    }}
                  >
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:hover": { backgroundColor: "#f9f9f9" },
                        "& td": {
                          fontSize: 13,
                          borderBottom: "1px solid #f5f5f5",
                        },
                      }}
                    >
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          {order.deliveryInfo?.firstName}{" "}
                          {order.deliveryInfo?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          fontWeight={600}
                          color="#2563eb"
                        >
                          ₦{order.total.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {order.paymentMethod}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={statusColors[order.status] || "default"}
                          size="small"
                          sx={{
                            textTransform: "capitalize",
                            fontWeight: 600,
                            fontSize: 11,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
