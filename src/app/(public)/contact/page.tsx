import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Footies by Zain.",
};

export default function ContactPage() {
  return <ContactClient />;
}
