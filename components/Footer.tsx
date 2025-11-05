"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Copyright */}
          <div>
            <Link href="/" className="text-2xl font-bold mb-4 block">
              Section Eight
            </Link>
            <p className="text-sm text-gray-300 mb-4">
              Premium products crafted for your lifestyle. Discover quality and
              elegance in every purchase.
            </p>
          </div>

          {/* Talk to Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Talk to us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@section8.com"
                  className="hover:text-accent transition-colors"
                >
                  accounts@sectioneight.ng
                </a>
              </li>
              <li className="text-gray-400">Monday - Friday: 9AM - 6PM</li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-return"
                  className="hover:text-accent transition-colors"
                >
                  Refund & Return Policy
                </Link>
              </li>
              
             
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-300 mb-4">
              Get the latest updates on new products and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white text-primary placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                className="w-full bg-accent text-white py-2 px-4 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Section Eight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
