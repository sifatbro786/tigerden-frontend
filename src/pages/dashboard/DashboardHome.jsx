import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
    TrendingUp,
    Users,
    FolderOpen,
    CreditCard,
    Package,
    DollarSign,
    Activity,
    Calendar,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";

const fetchDashboardStats = async () => {
    const response = await axios.get("http://localhost:5000/api/dashboard/admin");
    return response.data;
};

export default function DashboardHome() {
    const {
        data: stats,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["dashboardStats"],
        queryFn: fetchDashboardStats,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-500 text-lg">Error loading dashboard data</div>
            </div>
        );
    }

    const statCards = [
        {
            name: "Total Projects",
            value: stats?.overview?.totalProjects || 0,
            icon: FolderOpen,
            color: "bg-blue-500",
            change: "+12%",
            changeType: "positive",
        },
        {
            name: "Active Investments",
            value: stats?.overview?.totalInvestments || 0,
            icon: TrendingUp,
            color: "bg-green-500",
            change: "+8%",
            changeType: "positive",
        },
        {
            name: "Total Investors",
            value: stats?.overview?.totalInvestors || 0,
            icon: Users,
            color: "bg-purple-500",
            change: "+23%",
            changeType: "positive",
        },
        {
            name: "Total Revenue",
            value: `৳${(stats?.revenue?.totalRevenue || 0).toLocaleString()}`,
            icon: DollarSign,
            color: "bg-yellow-500",
            change: "+15%",
            changeType: "positive",
        },
        {
            name: "Total Products",
            value: stats?.overview?.totalProducts || 0,
            icon: Package,
            color: "bg-indigo-500",
            change: "+5%",
            changeType: "positive",
        },
        {
            name: "Investment Amount",
            value: `৳${(stats?.financial?.totalInvestmentAmount || 0).toLocaleString()}`,
            icon: CreditCard,
            color: "bg-pink-500",
            change: "+18%",
            changeType: "positive",
        },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Dashboard Overview
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back! Here's what's happening with your agricultural investment
                        platform.
                    </p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button className="btn-outline">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last 30 days
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((item) => (
                    <div key={item.name} className="card">
                        <div className="card-content">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`${item.color} p-3 rounded-lg`}>
                                        <item.icon className="h-6 w-6 text-white" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">
                                            {item.name}
                                        </dt>
                                        <dd className="flex items-baseline">
                                            <div className="text-2xl font-semibold text-gray-900">
                                                {item.value}
                                            </div>
                                            <div
                                                className={`ml-2 flex items-baseline text-sm font-semibold ${
                                                    item.changeType === "positive"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {item.change}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Monthly Revenue</h3>
                    </div>
                    <div className="card-content">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={stats?.charts?.monthlyRevenue || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id.month" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#22c55e"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Project Status Chart */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Project Status Distribution</h3>
                    </div>
                    <div className="card-content">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={stats?.charts?.projectStatusStats || []}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="count"
                                >
                                    {(stats?.charts?.projectStatusStats || []).map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ),
                                    )}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Investments */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Recent Investments</h3>
                    </div>
                    <div className="card-content">
                        <div className="space-y-4">
                            {stats?.recentActivities?.investments?.map((investment) => (
                                <div key={investment._id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <TrendingUp className="h-4 w-4 text-green-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">
                                            {investment.investor?.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Invested ৳{investment.totalAmount.toLocaleString()} in{" "}
                                            {investment.project?.title}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(investment.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Logs */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-lg font-medium">Recent Daily Logs</h3>
                    </div>
                    <div className="card-content">
                        <div className="space-y-4">
                            {stats?.recentActivities?.logs?.map((log) => (
                                <div key={log._id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                            <Activity className="h-4 w-4 text-blue-600" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">
                                            {log.project?.title}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Revenue: ৳{log.totalRevenue.toLocaleString()} - Added by{" "}
                                            {log.addedBy?.name}
                                        </p>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        {new Date(log.date).toLocaleDateString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Projects */}
            <div className="card">
                <div className="card-header">
                    <h3 className="text-lg font-medium">Top Performing Projects</h3>
                </div>
                <div className="card-content">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="table-header">
                                <tr>
                                    <th className="table-head">Project Name</th>
                                    <th className="table-head">Status</th>
                                    <th className="table-head">Total Revenue</th>
                                    <th className="table-head">Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats?.topProjects?.map((project) => (
                                    <tr key={project._id} className="table-row">
                                        <td className="table-cell font-medium">{project.title}</td>
                                        <td className="table-cell">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    project.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : project.status === "completed"
                                                          ? "bg-blue-100 text-blue-800"
                                                          : "bg-yellow-100 text-yellow-800"
                                                }`}
                                            >
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="table-cell">
                                            ৳{project.totalRevenue.toLocaleString()}
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex items-center">
                                                <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                    <div
                                                        className="bg-green-600 h-2 rounded-full"
                                                        style={{
                                                            width: `${Math.min((project.totalRevenue / 100000) * 100, 100)}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="text-sm text-gray-500">
                                                    {Math.min(
                                                        (project.totalRevenue / 100000) * 100,
                                                        100,
                                                    ).toFixed(0)}
                                                    %
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
