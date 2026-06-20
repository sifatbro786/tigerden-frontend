"use client"
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import Project from "../dashboard/Project"
import ProjectCreate from "../dashboard/ProjectCreate"

const fetchProjects = async (page = 1, search = "", status = "") => {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5000/api/projects?page=${page}&search=${search}&status=${status}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch projects")
  }
  return response.json()
}

const deleteProject = async (id) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to delete project")
  }
}

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [viewMode, setViewMode] = useState("list")
  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", currentPage, searchTerm, statusFilter],
    queryFn: () => fetchProjects(currentPage, searchTerm, statusFilter),
    keepPreviousData: true,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"])
      toast.success("Project deleted successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete project")
    },
  })

  const handleEdit = (project) => {
    setSelectedProject(project)
    setIsCreateModalOpen(true)
  }

  const handleView = (projectId) => {
    setSelectedProjectId(projectId)
    setViewMode("detail")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedProjectId(null)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleCreateSuccess = (newProject) => {
    queryClient.invalidateQueries(["projects"])
    setIsCreateModalOpen(false)
    setSelectedProject(null)
    toast.success("Project created successfully!")
  }

  const handleCreateClose = () => {
    setIsCreateModalOpen(false)
    setSelectedProject(null)
  }

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  // Show project detail view
  if (viewMode === "detail" && selectedProjectId) {
    return <Project projectId={selectedProjectId} onBack={handleBackToList} />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Error loading projects: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">Manage agricultural investment projects</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => {
              setSelectedProject(null)
              setIsCreateModalOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Project
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search projects..."
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.projects?.map((project) => (
          <div key={project._id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              {/* Project Image */}
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <img
                  src={project.images?.coverImage || "/placeholder.svg?height=200&width=300"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{project.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3">{project.description}</p>

                {/* Project Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-gray-500">
                    <span className="font-medium">Shares:</span> {project.features?.totalShares || 0}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Price:</span> ৳{project.features?.pricePerShare || 0}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">Start:</span>{" "}
                    {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"}
                  </div>
                  <div className="text-gray-500">
                    <span className="font-medium">End:</span>{" "}
                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : "N/A"}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{project.fundingPercentage?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full"
                      style={{ width: `${Math.min(project.fundingPercentage || 0, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <button
                    onClick={() => handleView(project._id)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <EyeIcon className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      disabled={deleteMutation.isPending}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(data.totalPages, currentPage + 1))}
              disabled={currentPage === data.totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * 10, data.total)}</span> of{" "}
                <span className="font-medium">{data.total}</span> results
              </p>
            </div>
            <div>
              <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                      page === currentPage
                        ? "z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                        : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(data.totalPages, currentPage + 1))}
                  disabled={currentPage === data.totalPages}
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {data?.projects?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No projects found</div>
          <button
            onClick={() => {
              setSelectedProject(null)
              setIsCreateModalOpen(true)
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Create First Project
          </button>
        </div>
      )}

      {/* Project Create/Edit Modal */}
      {isCreateModalOpen && (
        <ProjectCreate project={selectedProject} onClose={handleCreateClose} onSuccess={handleCreateSuccess} />
      )}
    </div>
  )
}
