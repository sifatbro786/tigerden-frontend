"use client"
import React from "react"
import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, TagIcon } from "@heroicons/react/24/outline"
import ProductCreate from "../../components/products/ProductCreate"

const fetchProducts = async (page = 1, search = "", category = "", inStock = "") => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: "12",
  })

  if (search) params.append("search", search)
  if (category) params.append("category", category)
  if (inStock) params.append("inStock", inStock)

  const response = await fetch(`http://localhost:5000/api/products?${params}`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

const fetchCategories = async () => {
  const response = await fetch("http://localhost:5000/api/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

const deleteProduct = async (id) => {
  const token = localStorage.getItem("token")
  const response = await fetch(`http://localhost:5000/api/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to delete product")
  }
}

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")
  const [stockFilter, setStockFilter] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage, searchTerm, categoryFilter, stockFilter],
    queryFn: () => fetchProducts(currentPage, searchTerm, categoryFilter, stockFilter),
    keepPreviousData: true,
  })

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"])
      toast.success("Product deleted successfully")
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete product")
    },
  })

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setIsCreateModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
    setSelectedProduct(null)
  }

  const handleCreateClose = () => {
    setIsCreateModalOpen(false)
    setSelectedProduct(null)
  }

  const getStockStatus = (stock) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-800" }
    if (stock < 10) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
    return { text: "In Stock", color: "bg-green-100 text-green-800" }
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
        <div className="text-red-500 text-lg">Error loading products: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Products</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your product inventory</p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            onClick={() => {
              setSelectedProduct(null)
              setIsCreateModalOpen(true)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {categoriesData?.categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock Status</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.products?.map((product) => {
          const stockStatus = getStockStatus(product.stock)
          return (
            <div key={product._id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-4">
                {/* Product Image */}
                <div className="aspect-w-1 aspect-h-1 mb-4">
                  <img
                    src={product.images?.[0] || "/placeholder.svg?height=200&width=200&query=product"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                  {/* Price and Category */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {product.discountPrice ? (
                          <>
                            <span className="text-lg font-bold text-green-600">৳{product.discountPrice}</span>
                            <span className="text-sm text-gray-500 line-through">৳{product.price}</span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-500">/{product.unit}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        <span className="font-medium">Stock:</span> {product.stock}
                      </span>
                      <span className="text-gray-500">
                        <span className="font-medium">Category:</span> {product.category?.name}
                      </span>
                    </div>

                    {product.isProjectProduct && (
                      <div className="flex items-center space-x-1">
                        <TagIcon className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-blue-600 font-medium">Project Product</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          {tag}
                        </span>
                      ))}
                      {product.tags.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{product.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between pt-4 border-t">
                    <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
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
          )
        })}
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
                Showing <span className="font-medium">{(currentPage - 1) * 12 + 1}</span> to{" "}
                <span className="font-medium">{Math.min(currentPage * 12, data.total)}</span> of{" "}
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
                        ? "z-10 bg-primary-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary-600"
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
      {data?.products?.length === 0 && (
        <div className="text-center py-12">
          <TagIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
          <div className="mt-6">
            <button
              onClick={() => {
                setSelectedProduct(null)
                setIsCreateModalOpen(true)
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Product
            </button>
          </div>
        </div>
      )}

      {/* Product Create/Edit Modal */}
      {isCreateModalOpen && (
        <ProductCreate product={selectedProduct} onClose={handleCreateClose} onSuccess={handleCreateSuccess} />
      )}
    </div>
  )
}
