import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get("admin-auth")?.value === "true";
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!db) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    // Get the order from Firebase
    const orderDoc = await db.collection("orders").doc(orderId).get();
    
    if (!orderDoc.exists) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orderDoc.data();

    if (!order) {
      return NextResponse.json({ error: "Order data not found" }, { status: 404 });
    }

    // Check if order is already completed
    if (order.status === "completed") {
      return NextResponse.json({ message: "Order already completed" }, { status: 200 });
    }

    // Update order status to "completed"
    await db.collection("orders").doc(orderId).update({
      status: "completed",
      completedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, message: "Order marked as completed" });
  } catch (err) {
    console.error("Error completing order:", err);
    const errorMessage = err instanceof Error ? err.message : "Failed to complete order";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

