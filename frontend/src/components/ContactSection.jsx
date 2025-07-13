import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactSection = () => (
  <section className="py-20 px-4 bg-blue-50" id="contact">
    <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-4">Get In Touch</h2>
    <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
      Questions? Feedback? Just want to chat? We’re here to help you grow your team better.
    </p>

    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      
      {/*  Left Side - Contact Info */}
      <div className="space-y-6 px-4 text-left">
        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-blue-600 text-xl mt-1 animate-pulse" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Phone</h4>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaEnvelope className="text-blue-600 text-xl mt-1 animate-pulse" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Email</h4>
            <p className="text-gray-600">contact@employease.com</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-blue-600 text-xl mt-1 animate-pulse" />
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Office</h4>
            <p className="text-gray-600">32-B, Tech Park Road, Gurugram, Haryana - 122001</p>
          </div>
        </div>

        <a
          href="https://www.google.com/maps"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition"
        >
           View on Map
        </a>
      </div>

      {/*  Right Side - Contact Form */}
      <form className="bg-white/70 backdrop-blur p-8 rounded-2xl shadow-lg border border-blue-100 space-y-5">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <textarea
          placeholder="Your Message"
          rows="4"
          className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-full font-bold shadow-md hover:scale-105 transition-all"
        >
          ✉️ Send Message
        </button>
      </form>
    </div>
  </section>
);

export default ContactSection;
