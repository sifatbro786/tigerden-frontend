"use client"
import React from "react"
import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import {
  PlusIcon,
  XMarkIcon,
  PhotoIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline"

const createProject = async (projectData) => {
  const token = localStorage.getItem("token")
  const response = await fetch("http://localhost:5000/api/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to create project")
  }

  return response.json()
}

export default function ProjectCreate({ onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    bulletPoints: [""],
    features: {
      landSize: {
        amount: "",
        unit: "acre",
      },
      totalShares: "",
      pricePerShare: "",
      minimumPurchase: 1,
      irrigation: "manual",
      fertilizer: "",
      expectedROI: "",
    },
    landDetails: {
      location: {
        address: "",
        coordinates: {
          lat: "",
          lng: "",
        },
      },
      soilType: "",
      climate: "",
      googleMapEmbed: "",
    },
    status: "upcoming",
    startDate: "",
    endDate: "",
    harvestDate: "",
    images: {
      coverImage: "",
      featuredImages: [""],
      galleryImages: [""],
    },
    faq: [{ question: "", answer: "" }],
  })

  const [currentStep, setCurrentStep] = useState(1)
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      toast.success("Project created successfully!")
      queryClient.invalidateQueries(["projects"])
      onSuccess?.(data.project)
      onClose?.()
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create project")
    },
  })

  const handleInputChange = (path, value) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current = newData

      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {}
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleArrayChange = (path, index, value) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]][index] = value
      return newData
    })
  }

  const addArrayItem = (path, defaultValue = "") => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]].push(defaultValue)
      return newData
    })
  }

  const removeArrayItem = (path, index) => {
    setFormData((prev) => {
      const newData = { ...prev }
      const keys = path.split(".")
      let current = newData

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]].splice(index, 1)
      return newData
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Prepare data for submission
    const submitData = {
      ...formData,
      features: {
        ...formData.features,
        totalShares: Number.parseInt(formData.features.totalShares),
        pricePerShare: Number.parseFloat(formData.features.pricePerShare),
        minimumPurchase: Number.parseInt(formData.features.minimumPurchase),
        expectedROI: Number.parseFloat(formData.features.expectedROI),
        landSize: {
          ...formData.features.landSize,
          amount: Number.parseFloat(formData.features.landSize.amount),
        },
      },
      landDetails: {
        ...formData.landDetails,
        location: {
          ...formData.landDetails.location,
          coordinates: {
            lat: Number.parseFloat(formData.landDetails.location.coordinates.lat) || null,
            lng: Number.parseFloat(formData.landDetails.location.coordinates.lng) || null,
          },
        },
      },
      bulletPoints: formData.bulletPoints.filter((point) => point.trim()),
      images: {
        ...formData.images,
        featuredImages: formData.images.featuredImages.filter((img) => img.trim()),
        galleryImages: formData.images.galleryImages.filter((img) => img.trim()),
      },
      faq: formData.faq.filter((item) => item.question.trim() && item.answer.trim()),
    }

    createMutation.mutate(submitData)
  }

  const steps = [
    { id: 1, name: "Basic Info", icon: PlusIcon },
    { id: 2, name: "Features", icon: CurrencyDollarIcon },
    { id: 3, name: "Location", icon: MapPinIcon },
    { id: 4, name: "Timeline", icon: CalendarIcon },
    { id: 5, name: "Media & FAQ", icon: PhotoIcon },
  ]

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
        <input
          type="text"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="Enter project title"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.subtitle}
          onChange={(e) => handleInputChange("subtitle", e.target.value)}
          placeholder="Enter project subtitle"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          required
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your project in detail"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Key Points</label>
        {formData.bulletPoints.map((point, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={point}
              onChange={(e) => handleArrayChange("bulletPoints", index, e.target.value)}
              placeholder={`Key point ${index + 1}`}
            />
            {formData.bulletPoints.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("bulletPoints", index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("bulletPoints")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add Key Point
        </button>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Land Size *</label>
          <div className="flex gap-2">
            <input
              type="number"
              required
              step="0.01"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.features.landSize.amount}
              onChange={(e) => handleInputChange("features.landSize.amount", e.target.value)}
              placeholder="0.00"
            />
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.features.landSize.unit}
              onChange={(e) => handleInputChange("features.landSize.unit", e.target.value)}
            >
              <option value="acre">Acre</option>
              <option value="hectare">Hectare</option>
              <option value="bigha">Bigha</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Shares *</label>
          <input
            type="number"
            required
            min="1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.features.totalShares}
            onChange={(e) => handleInputChange("features.totalShares", e.target.value)}
            placeholder="100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price Per Share (৳) *</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.features.pricePerShare}
            onChange={(e) => handleInputChange("features.pricePerShare", e.target.value)}
            placeholder="1000.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Purchase</label>
          <input
            type="number"
            min="1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.features.minimumPurchase}
            onChange={(e) => handleInputChange("features.minimumPurchase", e.target.value)}
            placeholder="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Irrigation Type</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.features.irrigation}
            onChange={(e) => handleInputChange("features.irrigation", e.target.value)}
          >
            <option value="manual">Manual</option>
            <option value="drip">Drip</option>
            <option value="sprinkler">Sprinkler</option>
            <option value="flood">Flood</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Expected ROI (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.features.expectedROI}
            onChange={(e) => handleInputChange("features.expectedROI", e.target.value)}
            placeholder="15.5"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Details</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.features.fertilizer}
          onChange={(e) => handleInputChange("features.fertilizer", e.target.value)}
          placeholder="Describe fertilizer usage and type"
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <textarea
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.landDetails.location.address}
          onChange={(e) => handleInputChange("landDetails.location.address", e.target.value)}
          placeholder="Enter complete address"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
          <input
            type="number"
            step="any"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.landDetails.location.coordinates.lat}
            onChange={(e) => handleInputChange("landDetails.location.coordinates.lat", e.target.value)}
            placeholder="23.8103"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
          <input
            type="number"
            step="any"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.landDetails.location.coordinates.lng}
            onChange={(e) => handleInputChange("landDetails.location.coordinates.lng", e.target.value)}
            placeholder="90.4125"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Soil Type</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.landDetails.soilType}
            onChange={(e) => handleInputChange("landDetails.soilType", e.target.value)}
            placeholder="e.g., Clay, Sandy, Loamy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Climate</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.landDetails.climate}
            onChange={(e) => handleInputChange("landDetails.climate", e.target.value)}
            placeholder="e.g., Tropical, Subtropical"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Google Map Embed URL</label>
        <input
          type="url"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.landDetails.googleMapEmbed}
          onChange={(e) => handleInputChange("landDetails.googleMapEmbed", e.target.value)}
          placeholder="https://www.google.com/maps/embed?pb=..."
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Project Status</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
          <input
            type="date"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
          <input
            type="date"
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Harvest Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.harvestDate}
            onChange={(e) => handleInputChange("harvestDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  )

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image URL *</label>
        <input
          type="url"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.images.coverImage}
          onChange={(e) => handleInputChange("images.coverImage", e.target.value)}
          placeholder="https://example.com/cover-image.jpg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Featured Images</label>
        {formData.images.featuredImages.map((image, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={image}
              onChange={(e) => handleArrayChange("images.featuredImages", index, e.target.value)}
              placeholder={`Featured image ${index + 1} URL`}
            />
            {formData.images.featuredImages.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("images.featuredImages", index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("images.featuredImages")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add Featured Image
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
        {formData.images.galleryImages.map((image, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="url"
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={image}
              onChange={(e) => handleArrayChange("images.galleryImages", index, e.target.value)}
              placeholder={`Gallery image ${index + 1} URL`}
            />
            {formData.images.galleryImages.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayItem("images.galleryImages", index)}
                className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("images.galleryImages")}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add Gallery Image
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">FAQ</label>
        {formData.faq.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">FAQ {index + 1}</h4>
              {formData.faq.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayItem("faq", index)}
                  className="text-red-600 hover:bg-red-50 p-1 rounded"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.question}
                onChange={(e) => handleArrayChange("faq", index, { ...item, question: e.target.value })}
                placeholder="Question"
              />
              <textarea
                rows={2}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={item.answer}
                onChange={(e) => handleArrayChange("faq", index, { ...item, answer: e.target.value })}
                placeholder="Answer"
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem("faq", { question: "", answer: "" })}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          + Add FAQ
        </button>
      </div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Step Navigation */}
        <div className="px-6 py-4 border-b">
          <nav className="flex space-x-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`flex items-center space-x-2 pb-2 border-b-2 font-medium text-sm ${
                    currentStep === step.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{step.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t bg-gray-50">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {createMutation.isPending ? "Creating..." : "Create Project"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
