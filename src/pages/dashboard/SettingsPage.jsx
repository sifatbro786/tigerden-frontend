"use client";
import React from "react";

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Save, User, Lock, Bell, Globe } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");

    const tabs = [
        { id: "profile", name: "Profile", icon: User },
        { id: "security", name: "Security", icon: Lock },
        { id: "notifications", name: "Notifications", icon: Bell },
        { id: "system", name: "System", icon: Globe },
    ];

    const handleSave = () => {
        toast.success("Settings saved successfully!");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Settings
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your account and system preferences
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64">
                    <nav className="space-y-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id
                                            ? "bg-primary-100 border-primary-500 text-primary-700"
                                            : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    } group flex items-center px-3 py-2 text-sm font-medium border-l-4 w-full text-left`}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="card">
                        <div className="card-content">
                            {activeTab === "profile" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Profile Information
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Update your account profile information.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="input mt-1"
                                                defaultValue={user?.name}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                className="input mt-1"
                                                defaultValue={user?.email}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                className="input mt-1"
                                                defaultValue={user?.phone}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                className="input mt-1"
                                                value={user?.role}
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Bio
                                        </label>
                                        <textarea
                                            rows={3}
                                            className="input mt-1"
                                            placeholder="Tell us about yourself..."
                                        />
                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={handleSave} className="btn-primary">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "security" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Security Settings
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Manage your account security preferences.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                className="input mt-1"
                                                placeholder="Enter current password"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="input mt-1"
                                                placeholder="Enter new password"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                className="input mt-1"
                                                placeholder="Confirm new password"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={handleSave} className="btn-primary">
                                            <Save className="h-4 w-4 mr-2" />
                                            Update Password
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notifications" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Notification Preferences
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Choose what notifications you want to receive.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    Email Notifications
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Receive notifications via email
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-primary-600"
                                                defaultChecked
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    Investment Updates
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Get notified about investment activities
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-primary-600"
                                                defaultChecked
                                            />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-sm font-medium text-gray-900">
                                                    Payment Alerts
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    Receive payment confirmation alerts
                                                </p>
                                            </div>
                                            <input
                                                type="checkbox"
                                                className="h-4 w-4 text-primary-600"
                                                defaultChecked
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={handleSave} className="btn-primary">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Preferences
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "system" && (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">
                                            System Settings
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Configure system-wide settings.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Platform Name
                                            </label>
                                            <input
                                                type="text"
                                                className="input mt-1"
                                                defaultValue="AgriInvest Platform"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Currency
                                            </label>
                                            <select className="input mt-1">
                                                <option value="BDT">BDT (৳)</option>
                                                <option value="USD">USD ($)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Time Zone
                                            </label>
                                            <select className="input mt-1">
                                                <option value="Asia/Dhaka">Asia/Dhaka</option>
                                                <option value="UTC">UTC</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">
                                                Language
                                            </label>
                                            <select className="input mt-1">
                                                <option value="en">English</option>
                                                <option value="bn">বাংলা</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button onClick={handleSave} className="btn-primary">
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Settings
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
