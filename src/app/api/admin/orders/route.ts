import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "../../../../lib/firebaseAdmin";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const isAuthenticated = cookieStore.get("admin-auth")?.value === "true";
    
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ordersSnapshot = await db.collection("orders").orderBy("createdAt", "desc").get();
    const orders = ordersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
