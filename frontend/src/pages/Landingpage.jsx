import ContactSection from "../components/ContactSection";
import EmployeesSection from "../components/EmployeesSection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";


const LandingPage = () => {
  return (
    <div className="pt-20">
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <EmployeesSection />
      <ContactSection/>
      <Footer />
    </div>
  );
};

export default LandingPage;
