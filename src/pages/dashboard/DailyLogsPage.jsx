"use client"
import React from "react"

import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Plus, Calendar, TrendingUp, Package, AlertTriangle } from "lucide-react"
import DailyLogModal from "../../components/modals/DailyLogModal"

const fetchDailyLogs = async (page = 1, project = "", startDate = "", endDate = "") => {
  const response = await axios.get(
    `/api/daily-logs?page=${page}&project=${project}&startDate=${startDate}&endDate=${endDate}`,
  )
  return response.data
}

const fetchProjects = async () => {
  const response = await axios.get("/api/projects")
  return response.data.projects
}

export default function DailyLogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [projectFilter, setProjectFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery(
    ["dailyLogs", currentPage, projectFilter, startDate, endDate],
    () => fetchDailyLogs(currentPage, projectFilter, startDate, endDate),
    { keepPreviousData: true },
  )

  const { data: projects } = useQuery("projects", fetchProjects)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Daily Logs</h2>
          <p className="mt-1 text-sm text-gray-500">Track daily production, sales, and activities</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button onClick={() => setIsModalOpen(true)} className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            Add Log
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ৳{data?.stats?.totalRevenue?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Production</p>
                <p className="text-2xl font-semibold text-gray-900">{data?.stats?.totalProduction || 0} kg</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-semibold text-gray-900">{data?.stats?.totalSales || 0} kg</p>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-gray-500">Total Damage</p>
                <p className="text-2xl font-semibold text-gray-900">{data?.stats?.totalDamage || 0} kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <select className="input" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
            <option value="">All Projects</option>
            {projects?.map((project) => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input
            type="date"
            className="input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
        </div>
        <div>
          <input
            type="date"
            className="input"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
        </div>
      </div>

      {/* Daily Logs */}
      <div className="space-y-4">
        {data?.logs?.map((log) => (
          <div key={log._id} className="card">
            <div className="card-content">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{log.project?.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(log.date).toLocaleDateString()} - Added by {log.addedBy?.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-green-600">৳{log.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                </div>
              </div>

              {/* Entries */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {log.entries?.map((entry, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{entry.productName}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Production:</span>
                        <span>
                          {entry.production?.quantity || 0} {entry.production?.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sales:</span>
                        <span>
                          {entry.sales?.quantity || 0} {entry.sales?.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Revenue:</span>
                        <span className="text-green-600">৳{entry.sales?.revenue || 0}</span>
                      </div>
                      {entry.damage?.quantity > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Damage:</span>
                          <span className="text-red-600">
                            {entry.damage.quantity} {entry.damage.unit}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500">Market Price:</span>
                        <span>৳{entry.marketPrice || 0}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weather & Activities */}
              {(log.weather || log.activities?.length > 0) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {log.weather && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Weather</h5>
                        <div className="text-sm text-gray-600">
                          <p>Condition: {log.weather.condition}</p>
                          <p>Temperature: {log.weather.temperature}°C</p>
                          <p>Humidity: {log.weather.humidity}%</p>
                          <p>Rainfall: {log.weather.rainfall}mm</p>
                        </div>
                      </div>
                    )}
                    {log.activities?.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Activities</h5>
                        <div className="space-y-1">
                          {log.activities.map((activity, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              <span className="font-medium">{activity.type}:</span> {activity.description}
                              {activity.cost && <span className="text-red-600"> (৳{activity.cost})</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {log.notes && (
                <div className="mt-4 pt-4 border-t">
                  <h5 className="font-medium text-gray-900 mb-2">Notes</h5>
                  <p className="text-sm text-gray-600">{log.notes}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Log Modal */}
      <DailyLogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={projects}
        onSuccess={() => {
          queryClient.invalidateQueries("dailyLogs")
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
