
    import { FaStar } from "react-icons/fa";
import { employees } from "../assets/assets";

const EmployeesSection = () => (
  <section
    className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 px-4 text-center"
    id="team"
  >
    {/*  Heading */}
    <h2 className="text-4xl font-bold text-blue-800 mb-4">Meet Our Expert Team</h2>
    <p className="text-gray-700 mb-12 max-w-2xl mx-auto text-sm md:text-base">
      Our talented and diverse team ensures productivity, creativity, and innovation in everything we do.
    </p>

    {/*  Team Members */}
    <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
      {employees.map((emp, i) => {
        const Icon = emp.icon;
        return (
          <div
            key={i}
            className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-blue-100"
          >
            <img
              src={emp.image}
              alt={emp.name}
              className="rounded-full w-24 h-24 mx-auto border-4 border-blue-300 object-cover shadow"
            />

            <h4 className="mt-4 text-lg font-bold text-gray-800">{emp.name}</h4>

            <div className="flex items-center justify-center gap-2 mt-1 text-sm text-blue-700">
              <Icon className="text-blue-500 text-xl" />
              <span>{emp.role}</span>
            </div>

            <p className="text-sm text-gray-500 mt-1">{emp.experience} Experience</p>

            <p className="mt-3 italic text-gray-600 text-sm">“{emp.quote}”</p>

            {/*  Rating */}
            <div className="flex justify-center mt-3 text-yellow-400">
              {Array.from({ length: Math.floor(emp.rating) }).map((_, idx) => (
                <FaStar key={idx} />
              ))}
              {emp.rating % 1 !== 0 && <FaStar className="opacity-50" />}
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default EmployeesSection;
