
import { FaQuoteLeft } from "react-icons/fa";
import { testimoniesData } from "../assets/assets";

const TestimoniesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bold text-blue-800 mb-4">What Our Users Say</h2>
        <p className="text-gray-600 text-sm md:text-base mb-12 max-w-2xl mx-auto">
          Here’s how EmployEase is helping teams stay organized, productive, and efficient.
        </p>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8 px-2 md:px-0">
          {testimoniesData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100 hover:shadow-2xl transition"
            >
              <FaQuoteLeft className="text-blue-400 text-2xl mb-3" />
              <p className="text-gray-700 italic mb-5">"{item.feedback}"</p>
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full border border-gray-300 object-cover"
                />
                <div className="text-left">
                  <h4 className="text-md font-semibold text-blue-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.role}, {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimoniesPage;
