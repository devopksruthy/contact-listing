// lib/db.ts
import fs from "fs";
import path from "path";
import { ContactInfo } from "@/type/contact.type";

const filePath = path.join(process.cwd(), "db.json");

// Get all contacts
export function getContacts(): ContactInfo[] {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data || "[]");
  } catch (err) {
    console.error("Error reading DB:", err);
    return [];
  }
}

// Save a new contact
export function saveContact(contact: ContactInfo) {
  try {
    const contacts = getContacts();
    contacts.push(contact);
    fs.writeFileSync(filePath, JSON.stringify(contacts));
  } catch (err) {
    console.error("Error writing DB:", err);
  }
}