// src/pages/dashboard/TeamManagement.jsx
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusIcon, PencilIcon, TrashIcon, SearchIcon, CrownIcon, UsersIcon } from "lucide-react";
import toast from "react-hot-toast";
import api, { formDataApi } from "../../services/api";
import TeamFormModal from "../../components/dashboard/TeamFormModal";
import ConfirmDeleteModal from "../../components/dashboard/ConfirmDeleteModal";

const TeamManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberToDelete, setMemberToDelete] = useState(null);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["team"],
        queryFn: async () => {
            const { data } = await api.get("/team");
            return data;
        },
    });

    const createMutation = useMutation({
        mutationFn: (teamData) => formDataApi.post("/admin/team", teamData),
        onSuccess: () => {
            queryClient.invalidateQueries(["team"]);
            toast.success("Team member added successfully!");
            setIsModalOpen(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to add team member");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => formDataApi.put(`/admin/team/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["team"]);
            toast.success("Team member updated successfully!");
            setIsModalOpen(false);
            setSelectedMember(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to update team member");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => api.delete(`/admin/team/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries(["team"]);
            toast.success("Team member removed successfully!");
            setIsDeleteModalOpen(false);
            setMemberToDelete(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to delete team member");
        },
    });

    const handleEdit = (member) => {
        setSelectedMember(member);
        setIsModalOpen(true);
    };

    const handleDelete = (member) => {
        setMemberToDelete(member);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (formData) => {
        if (selectedMember) {
            updateMutation.mutate({ id: selectedMember._id, data: formData });
        } else {
            createMutation.mutate(formData);
        }
    };

    const members = data?.data || [];
    const filteredMembers = members.filter(
        (member) =>
            member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.designation?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const ceo = members.find((m) => m.isCEO);
    const teamMembers = members.filter((m) => !m.isCEO);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-600">Error loading team: {error.message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries(["team"])}
                    className="mt-4 btn-primary"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
                <button
                    onClick={() => {
                        setSelectedMember(null);
                        setIsModalOpen(true);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg shadow-emerald-500/30"
                >
                    <PlusIcon className="w-5 h-5" />
                    <span>Add Team Member</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
            </div>

            {/* CEO Section */}
            {ceo && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <CrownIcon className="w-5 h-5 text-amber-600" />
                        <h3 className="font-semibold text-amber-800">CEO / Founder</h3>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-amber-200 flex-shrink-0">
                            {ceo.image?.url ? (
                                <img
                                    src={ceo.image.url}
                                    alt={ceo.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-2xl">
                                    👤
                                </div>
                            )}
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900">{ceo.name}</h4>
                            <p className="text-sm text-gray-600">{ceo.designation}</p>
                            {ceo.ceoMessage?.en && (
                                <p className="text-sm text-gray-500 mt-1 italic">
                                    "{ceo.ceoMessage.en}"
                                </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                                <button
                                    onClick={() => handleEdit(ceo)}
                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(ceo)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Team Members Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teamMembers.map((member) => (
                    <div
                        key={member._id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-teal-100">
                            {member.image?.url ? (
                                <img
                                    src={member.image.url}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <UsersIcon className="w-12 h-12 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            <p className="text-sm text-emerald-600 font-medium">
                                {member.designation}
                            </p>
                            {member.expertise && member.expertise.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {member.expertise.slice(0, 3).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {member.expertise.length > 3 && (
                                        <span className="text-xs text-gray-400">
                                            +{member.expertise.length - 3}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => handleEdit(member)}
                                    className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded transition-colors"
                                >
                                    <PencilIcon className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(member)}
                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {teamMembers.length === 0 && !ceo && (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No team members added yet</p>
                </div>
            )}

            {/* Modals */}
            <TeamFormModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedMember(null);
                }}
                onSubmit={handleSubmit}
                initialData={selectedMember}
                hasCEO={!!ceo}
                isLoading={createMutation.isLoading || updateMutation.isLoading}
            />

            <ConfirmDeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setMemberToDelete(null);
                }}
                onConfirm={() => deleteMutation.mutate(memberToDelete._id)}
                title="Remove Team Member"
                message={`Are you sure you want to remove "${memberToDelete?.name}" from the team? This action cannot be undone.`}
                isLoading={deleteMutation.isLoading}
            />
        </div>
    );
};

export default TeamManagement;
