// src/pages/dashboard/DashboardHome.jsx
import { useState, useEffect } from "react";
import {
    PackageIcon,
    FileTextIcon,
    UsersIcon,
    MessageSquareIcon,
    TicketIcon,
    TrendingUpIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const DashboardHome = () => {
    const [stats, setStats] = useState({
        packages: 0,
        blogs: 0,
        team: 0,
        testimonials: 0,
        coupons: 0,
        activeCoupons: 0,
    });

    // Fetch all counts in parallel using React Query
    const packagesQuery = useQuery({
        queryKey: ["dashboard-packages-count"],
        queryFn: async () => {
            const { data } = await api.get("/packages");
            return data.count;
        },
    });

    const blogsQuery = useQuery({
        queryKey: ["dashboard-blogs-count"],
        queryFn: async () => {
            const { data } = await api.get("/blogs");
            return data.count;
        },
    });

    const teamQuery = useQuery({
        queryKey: ["dashboard-team-count"],
        queryFn: async () => {
            const { data } = await api.get("/team");
            return data.count;
        },
    });

    const testimonialsQuery = useQuery({
        queryKey: ["dashboard-testimonials-count"],
        queryFn: async () => {
            const { data } = await api.get("/testimonials");
            return data.count;
        },
    });

    const couponsQuery = useQuery({
        queryKey: ["dashboard-coupons-count"],
        queryFn: async () => {
            const { data } = await api.get("/admin/coupons");
            const activeCoupons = data.data.filter((c) => c.isActive).length;
            return { total: data.count, active: activeCoupons };
        },
    });

    useEffect(() => {
        if (packagesQuery.data !== undefined) {
            setStats((prev) => ({ ...prev, packages: packagesQuery.data }));
        }
    }, [packagesQuery.data]);

    useEffect(() => {
        if (blogsQuery.data !== undefined) {
            setStats((prev) => ({ ...prev, blogs: blogsQuery.data }));
        }
    }, [blogsQuery.data]);

    useEffect(() => {
        if (teamQuery.data !== undefined) {
            setStats((prev) => ({ ...prev, team: teamQuery.data }));
        }
    }, [teamQuery.data]);

    useEffect(() => {
        if (testimonialsQuery.data !== undefined) {
            setStats((prev) => ({ ...prev, testimonials: testimonialsQuery.data }));
        }
    }, [testimonialsQuery.data]);

    useEffect(() => {
        if (couponsQuery.data !== undefined) {
            setStats((prev) => ({
                ...prev,
                coupons: couponsQuery.data.total,
                activeCoupons: couponsQuery.data.active,
            }));
        }
    }, [couponsQuery.data]);

    const statCards = [
        {
            title: "Total Packages",
            value: stats.packages,
            icon: PackageIcon,
            color: "bg-blue-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            loading: packagesQuery.isLoading,
        },
        {
            title: "Total Blogs",
            value: stats.blogs,
            icon: FileTextIcon,
            color: "bg-green-500",
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            loading: blogsQuery.isLoading,
        },
        {
            title: "Team Members",
            value: stats.team,
            icon: UsersIcon,
            color: "bg-purple-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            loading: teamQuery.isLoading,
        },
        {
            title: "Testimonials",
            value: stats.testimonials,
            icon: MessageSquareIcon,
            color: "bg-pink-500",
            bgColor: "bg-pink-50",
            textColor: "text-pink-600",
            loading: testimonialsQuery.isLoading,
        },
        {
            title: "Total Coupons",
            value: stats.coupons,
            icon: TicketIcon,
            color: "bg-orange-500",
            bgColor: "bg-orange-50",
            textColor: "text-orange-600",
            loading: couponsQuery.isLoading,
        },
        {
            title: "Active Coupons",
            value: stats.activeCoupons,
            icon: TrendingUpIcon,
            color: "bg-indigo-500",
            bgColor: "bg-indigo-50",
            textColor: "text-indigo-600",
            loading: couponsQuery.isLoading,
        },
    ];

    const recentActivities = [
        { id: 1, action: "New package added", time: "2 hours ago", type: "package" },
        { id: 2, action: "Coupon code updated", time: "5 hours ago", type: "coupon" },
        { id: 3, action: "New testimonial approved", time: "1 day ago", type: "testimonial" },
        { id: 4, action: "Team member added", time: "2 days ago", type: "team" },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h2>
                <p className="text-primary-100">
                    Here's what's happening with your tourism business today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                {card.loading ? (
                                    <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-2"></div>
                                ) : (
                                    <p className="text-2xl font-bold text-gray-900 mt-2">
                                        {card.value}
                                    </p>
                                )}
                            </div>
                            <div className={`${card.bgColor} p-3 rounded-xl`}>
                                <card.icon className={`w-6 h-6 ${card.textColor}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span className="text-sm text-gray-700">{activity.action}</span>
                                </div>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            {
                                label: "Add Package",
                                path: "/dashboard/packages",
                                icon: PackageIcon,
                            },
                            { label: "Create Blog", path: "/dashboard/blogs", icon: FileTextIcon },
                            { label: "Add Team Member", path: "/dashboard/team", icon: UsersIcon },
                            { label: "Add Coupon", path: "/dashboard/coupons", icon: TicketIcon },
                        ].map((action, index) => (
                            <a
                                key={index}
                                href={action.path}
                                className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 transition-colors group"
                            >
                                <action.icon className="w-4 h-4 text-gray-500 group-hover:text-primary-600" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-primary-700">
                                    {action.label}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
