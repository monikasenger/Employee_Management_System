// src/components/FeaturesSection.jsx
import { features } from "../assets/assets";

const FeaturesSection = () => {
  const topThreeFeatures = features.slice(0, 3); // 👈 Top 3 features only

  return (
    <section id="features" className="py-20 px-4 bg-white text-center">
      {/*  Heading */}
      <h2 className="text-4xl font-bold text-blue-800 mb-4">
        Powerful Features Built for Smart Teams
      </h2>
      <p className="text-gray-700 mb-12 text-base max-w-2xl mx-auto">
        Empower your workforce with tools designed for productivity, clarity, and collaboration.
      </p>

      {/*  Features Grid */}
      <div className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto">
        {topThreeFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl border border-blue-100 p-8 transition duration-300"
            >
             
              <div className="flex justify-center items-center mb-5">
                <Icon className={`${feature.iconClass}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/*  CTA Button */}
      <a
        href="/features"
        className="inline-block mt-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
      >
        Explore More Features
      </a>
    </section>
  );
};

export default FeaturesSection;
