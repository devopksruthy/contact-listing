import { NextResponse } from "next/server";
import { ContactInfo } from "@/type/contact.type";
import { saveContact } from "@/lib/db";

export async function POST(req: Request) {
  const data: ContactInfo = await req.json();

  if (!data.name || !data.email || !data.phone) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const newContact: ContactInfo = {
    ...data,
  };

  saveContact(newContact);
  return NextResponse.json(newContact);
}