"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  zipCode?: string;
  service: string;
  serviceType?: string;
  hours?: string;
  bedrooms?: number;
  bathrooms?: number;
  ecoCleaning?: boolean;
  additionalServices?: string[];
  datetime: string;
  status: string;
  amountCents: number;
  createdAt: string;
  paidAt?: string;
  acceptedAt?: string;
  notes?: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/orders");
      if (res.status === 401) {
        setIsAuthenticated(false);
        // Use replace instead of push to avoid adding to history
        router.replace("/admin/login");
        // Fallback redirect in case router doesn't work
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 100);
        return;
      }
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Failed to fetch orders" }));
        throw new Error(errorData.error || "Failed to fetch orders");
      }
      setIsAuthenticated(true);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load orders";
      setError(errorMessage);
      // If it's an auth error, redirect to login
      if (err instanceof Error && (err.message.includes("Unauthorized") || err.message.includes("401"))) {
        router.replace("/admin/login");
        setTimeout(() => {
          window.location.href = "/admin/login";
        }, 100);
      }
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  function formatDate(dateString: string) {
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if invalid
      }
      
      // Check if time is included in the date string
      const hasTime = dateString.includes('T') && dateString.split('T')[1];
      
      if (hasTime) {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      } else {
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      }
    } catch {
      return dateString; // Return original string on error
    }
  }

  function formatAmount(cents: number) {
    return `$${(cents / 100).toFixed(2)}`;
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "in progress": return "text-blue-600 bg-blue-50";
      case "completed": return "text-green-600 bg-green-50";
      case "paid": return "text-green-600 bg-green-50";
      case "accepted": return "text-blue-600 bg-blue-50"; // Legacy support
      default: return "text-gray-600 bg-gray-50";
    }
  }

  const pendingOrders = orders.filter(order => order.status === "pending");
  const inProgressOrders = orders.filter(order => order.status === "in progress" || order.status === "accepted");
  const completedOrders = orders.filter(order => order.status === "completed");

  async function handleAcceptOrder(orderId: string) {
    if (!confirm("Are you sure you want to accept this order? An email will be sent to the client.")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/orders/accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to accept order");
      }

      // Refresh orders list
      await fetchOrders();
      alert("Order accepted! Status changed to 'In Progress'. Email sent to client.");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to accept order. Please try again.";
      alert(errorMessage);
      console.error("Accept order error:", err);
    }
  }

  async function handleCompleteOrder(orderId: string) {
    if (!confirm("Mark this order as completed?")) {
      return;
    }

    try {
      const res = await fetch("/api/admin/orders/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(errorData.error || "Failed to complete order");
      }

      // Refresh orders list
      await fetchOrders();
      alert("Order marked as completed!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to complete order. Please try again.";
      alert(errorMessage);
      console.error("Complete order error:", err);
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-700">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-700">Redirecting to login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={fetchOrders} className="btn">
            Refresh
          </button>
          <button 
            onClick={() => {
              document.cookie = "admin-auth=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
              router.replace("/admin/login");
            }}
            className="btn bg-gray-500 hover:bg-gray-600"
          >
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {/* New/Pending Orders Section */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">New Orders ({pendingOrders.length})</h2>
        
        {pendingOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No new orders</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.firstName} {order.lastName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.service}</div>
                        {order.serviceType && (
                          <div className="text-sm text-gray-500">{order.serviceType}</div>
                        )}
                        {order.hours && (
                          <div className="text-sm text-gray-500">{order.hours}</div>
                        )}
                        {order.bedrooms && order.bathrooms && (
                          <div className="text-sm text-gray-500">
                            {order.bedrooms} bed, {order.bathrooms} bath
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div>{formatDate(order.datetime)}</div>
                        <div className="text-sm text-gray-500">{order.address}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatAmount(order.amountCents)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="text-sm font-medium px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Accept
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* In Progress Orders Section */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">In Progress ({inProgressOrders.length})</h2>
        
        {inProgressOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No orders in progress</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inProgressOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.firstName} {order.lastName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.service}</div>
                        {order.serviceType && (
                          <div className="text-sm text-gray-500">{order.serviceType}</div>
                        )}
                        {order.hours && (
                          <div className="text-sm text-gray-500">{order.hours}</div>
                        )}
                        {order.bedrooms && order.bathrooms && (
                          <div className="text-sm text-gray-500">
                            {order.bedrooms} bed, {order.bathrooms} bath
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div>{formatDate(order.datetime)}</div>
                        <div className="text-sm text-gray-500">{order.address}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatAmount(order.amountCents)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status === "accepted" ? "in progress" : order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleCompleteOrder(order.id)}
                          className="text-sm font-medium px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700"
                        >
                          Mark as Done
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Completed Orders Section */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Completed ({completedOrders.length})</h2>
        
        {completedOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No completed orders</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Date & Time</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {completedOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.firstName} {order.lastName}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{order.service}</div>
                        {order.serviceType && (
                          <div className="text-sm text-gray-500">{order.serviceType}</div>
                        )}
                        {order.hours && (
                          <div className="text-sm text-gray-500">{order.hours}</div>
                        )}
                        {order.bedrooms && order.bathrooms && (
                          <div className="text-sm text-gray-500">
                            {order.bedrooms} bed, {order.bathrooms} bath
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div>{formatDate(order.datetime)}</div>
                        <div className="text-sm text-gray-500">{order.address}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {formatAmount(order.amountCents)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Customer</label>
                    <p className="text-lg">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p className="text-lg">{selectedOrder.email}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Phone</label>
                    <p className="text-lg">{selectedOrder.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Amount</label>
                    <p className="text-lg font-semibold">{formatAmount(selectedOrder.amountCents)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Service Address</label>
                  <p className="text-lg">{selectedOrder.address}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Service</label>
                    <p className="text-lg">{selectedOrder.service}</p>
                  </div>
                  {selectedOrder.serviceType && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Service Type</label>
                      <p className="text-lg">{selectedOrder.serviceType}</p>
                    </div>
                  )}
                  {selectedOrder.hours && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Duration</label>
                      <p className="text-lg">{selectedOrder.hours}</p>
                    </div>
                  )}
                  {selectedOrder.bedrooms && selectedOrder.bathrooms && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">Property Size</label>
                      <p className="text-lg">{selectedOrder.bedrooms} bedrooms, {selectedOrder.bathrooms} bathrooms</p>
                    </div>
                  )}
                </div>
                
                {selectedOrder.ecoCleaning && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Eco Cleaning</label>
                    <p className="text-lg">Yes</p>
                  </div>
                )}
                
                {selectedOrder.additionalServices && selectedOrder.additionalServices.length > 0 && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Additional Services</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedOrder.additionalServices.map((service, idx) => (
                        <span key={idx} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-lg">{formatDate(selectedOrder.datetime)}</p>
                </div>
                
                {selectedOrder.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="text-lg">{selectedOrder.notes}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p className="text-lg">
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <p className="text-lg">{formatDate(selectedOrder.createdAt)}</p>
                  </div>
                </div>

                {selectedOrder.status === "pending" && (
                  <div className="mt-6 pt-6 border-t">
                    <button
                      onClick={async () => {
                        await handleAcceptOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="w-full px-6 py-3 rounded-xl text-white font-semibold bg-green-600 hover:bg-green-700 transition"
                    >
                      Accept Order & Send Email
                    </button>
                  </div>
                )}
                {(selectedOrder.status === "in progress" || selectedOrder.status === "accepted") && (
                  <div className="mt-6 pt-6 border-t">
                    <button
                      onClick={async () => {
                        await handleCompleteOrder(selectedOrder.id);
                        setSelectedOrder(null);
                      }}
                      className="w-full px-6 py-3 rounded-xl text-white font-semibold bg-purple-600 hover:bg-purple-700 transition"
                    >
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
