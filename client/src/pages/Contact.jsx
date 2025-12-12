import React, { useState } from "react";
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to backend / email
    console.log("Contact form submitted:", form);
    alert("Your message has been sent! (Placeholder)");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-cream min-h-screen px-4 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center py-20 px-4 bg-white rounded-3xl shadow-sm">
            <h1 className="text-3xl md:text-5xl font-bold text-green-main mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-12 text-lg">
              Have questions? We're here to help you on your journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-8 bg-cream-main/30 rounded-xl">
                <HiMail className="text-4xl text-orange-main mb-4" />
                <h3 className="font-bold text-green-main mb-2">Email</h3>
                <p className="text-gray-600 break-all text-center">care@globalyogaspace.com</p>
              </div>

              <div className="flex flex-col items-center p-8 bg-cream-main/30 rounded-xl">
                <HiPhone className="text-4xl text-orange-main mb-4" />
                <h3 className="font-bold text-green-main mb-2">Phone</h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>

              <div className="flex flex-col items-center p-8 bg-cream-main/30 rounded-xl">
                <HiLocationMarker className="text-4xl text-orange-main mb-4" />
                <h3 className="font-bold text-green-main mb-2">Location</h3>
                <div className="flex flex-col text-gray-600 text-center">
                  <span>Global Headquaters,</span>
                  <span>New Delhi, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-orange-main hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
