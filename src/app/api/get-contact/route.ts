import { NextResponse } from "next/server";
import { getContacts } from "@/lib/db";

export async function GET() {
  const contacts = getContacts();
  return NextResponse.json(contacts);
}