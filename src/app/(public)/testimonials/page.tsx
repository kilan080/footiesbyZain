import Testimonials from "../../components/testimonials/testimonials";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Testimonials",
  description: "See what our customers say about Footies by Zain.",
};
export default function TestimonialsPage() {
  return <Testimonials />;
}