"use client"
import React, { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline"

const fetchProject = async (id) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    throw new Error("Failed to fetch project")
  }
  return response.json()
}

const Project = ({ onEdit }) => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const { data, isLoading, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => fetchProject(id),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    toast.error(error.message)
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg">Error loading project</div>
      </div>
    )
  }

  const project = data?.project
  const stats = data?.stats

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  if (!project) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back
        </button>
        <button
          onClick={() => onEdit(project)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200"
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Edit
        </button>
      </div>

      {/* Project Header */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="relative">
          <img
            src={project.images?.coverImage || "/placeholder.svg"}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">{project.title}</h1>
                <p className="text-gray-200">{project.subtitle}</p>
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(project.status)}`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("overview")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "overview"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "details"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "faq"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "gallery"
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Gallery
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="py-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Description</h2>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                </div>

                {project.bulletPoints?.length > 0 && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Key Points</h2>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
                      {project.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Total Shares</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {project.features?.totalShares?.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Available Shares</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {project.features?.availableShares?.toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Price Per Share</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      ৳{project.features?.pricePerShare?.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Funding Progress</h3>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{(project.fundingPercentage || 0).toFixed(1)}% funded</span>
                        <span>
                          {stats?.totalInvestors || 0} investor{stats?.totalInvestors !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${Math.min(project.fundingPercentage || 0, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Expected ROI</h3>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                      {project.features?.expectedROI || 0}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(project.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">End Date</h3>
                    <p className="mt-1 text-lg font-semibold text-gray-900">
                      {new Date(project.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  {project.harvestDate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500">Harvest Date</h3>
                      <p className="mt-1 text-lg font-semibold text-gray-900">
                        {new Date(project.harvestDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900">Land Details</h2>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Location</h3>
                      <p className="mt-1 text-gray-900">
                        {project.landDetails?.location?.address || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Soil Type</h3>
                      <p className="mt-1 text-gray-900">
                        {project.landDetails?.soilType || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Climate</h3>
                      <p className="mt-1 text-gray-900">
                        {project.landDetails?.climate || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Land Size</h3>
                      <p className="mt-1 text-gray-900">
                        {project.features?.landSize?.amount
                          ? `${project.features.landSize.amount} ${project.features.landSize.unit}`
                          : "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Irrigation</h3>
                      <p className="mt-1 text-gray-900 capitalize">
                        {project.features?.irrigation || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Fertilizer</h3>
                      <p className="mt-1 text-gray-900">
                        {project.features?.fertilizer || "Not specified"}
                      </p>
                    </div>
                  </div>
                </div>

                {project.landDetails?.googleMapEmbed && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Location Map</h2>
                    <div
                      className="mt-4 w-full h-64"
                      dangerouslySetInnerHTML={{ __html: project.landDetails.googleMapEmbed }}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-6">
                {project.faq?.length > 0 ? (
                  <div className="space-y-4">
                    {project.faq.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                        <p className="mt-1 text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No FAQ items available</p>
                )}
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-6">
                {project.images?.galleryImages?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.images.galleryImages.map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No gallery images available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project