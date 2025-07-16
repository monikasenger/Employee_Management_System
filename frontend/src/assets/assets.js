// src/assets/data.js

import {
  FaStar,
  FaUserTie,
  FaLaptopCode,
  FaUserNurse,
  FaTools,
  FaUserCog,
  FaTasks,
  FaClock,
  FaChartLine,
   FaBell,
  FaCalendarCheck,
  FaShieldAlt,
  FaComments,
  FaDatabase,
  FaCloudUploadAlt,
} from "react-icons/fa";

import priyaImg from "./testimonials/priya.jpeg";
import raviImg from "./testimonials/ravi.jpeg";
import anjaliImg from "./testimonials/anjali.jpeg";
import sureshImg from "./testimonials/suresh.jpeg";
import meeraImg from "./testimonials/meera.jpeg";
import vikramImg from "./testimonials/vikram.jpeg";
// 🔹 EMPLOYEES DATA
export const employees = [
  {
    name: "John Smith",
    role: "Team Lead",
    icon: FaUserTie,
    experience: "5+ Years",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Leading with clarity and empathy.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Frontend Developer",
    icon: FaLaptopCode,
    experience: "3 Years",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Loves building responsive UIs with React.",
    rating: 4,
  },
  {
    name: "Ankit Verma",
    role: "Backend Engineer",
    icon: FaTools,
    experience: "4+ Years",
    image: "https://randomuser.me/api/portraits/men/40.jpg",
    quote: "API magician and database ninja.",
    rating: 4.5,
  },
  {
    name: "Riya Kapoor",
    role: "UI/UX Designer",
    icon: FaUserNurse,
    experience: "2 Years",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    quote: "Designing interfaces users fall in love with.",
    rating: 5,
  },
];

// 🔹 TESTIMONIES DATA
export const testimoniesData = [
  {
    name: "Priya Sharma",
    role: "HR Manager",
    company: "TechWave Inc.",
    image: priyaImg,
    feedback:
      "EmployEase has completely transformed how we manage our remote team. It's fast, intuitive, and beautifully designed.",
  },
  {
    name: "Ravi Mehta",
    role: "Operations Lead",
    company: "LogiCore Pvt Ltd",
    image: raviImg,
    feedback:
      "This platform saves hours of manual tracking. Our productivity improved by 40% after switching to EmployEase.",
  },
  {
    name: "Anjali Verma",
    role: "Team Lead",
    company: "InnoTech Solutions",
    image: anjaliImg,
    feedback:
      "I love the UI and task overview. It makes team coordination so much easier. Highly recommended!",
  },
  {
    name: "Suresh Nair",
    role: "CTO",
    company: "NextGen Software",
    image: sureshImg,
    feedback:
      "EmployEase offers a modern and reliable way to manage tech teams. The analytics and reports are especially useful.",
  },
  {
    name: "Meera Joshi",
    role: "Project Manager",
    company: "SoftBridge Technologies",
    image: meeraImg,
    feedback:
      "We’ve seen a 30% improvement in task delivery after switching to EmployEase. It’s perfect for hybrid teams.",
  },
  {
    name: "Vikram Singh",
    role: "Founder & CEO",
    company: "Growlytics",
    image: vikramImg,
    feedback:
      "From onboarding to daily management, EmployEase simplifies everything. A must-have for startups!",
  },
];



// 🔹 FEATURES DATA
export const features = [
  {
    icon: FaUserCog,
    iconClass: "text-3xl text-blue-600",
    title: "Employee Management",
    description:
      "Easily add, update, and manage all employee details from a single dashboard.",
  },
  {
    icon: FaTasks,
    iconClass: "text-3xl text-purple-600",
    title: "Task Assignment",
    description:
      "Assign tasks, set priorities, and track progress in real-time to boost productivity.",
  },
  {
    icon: FaClock,
    iconClass: "text-3xl text-pink-600",
    title: "Attendance & Time Tracking",
    description:
      "Track employee work hours, breaks, and attendance with accuracy and ease.",
  },
  {
    icon: FaChartLine,
    iconClass: "text-3xl text-indigo-600",
    title: "Performance Insights",
    description:
      "View data-driven performance charts and insights for informed decision-making.",
  },
  {
    icon: FaCalendarCheck,
    iconClass: "text-3xl text-green-600",
    title: "Leave Management",
    description:
      "Employees can request leaves and admins can approve or decline requests easily.",
  },
  {
    icon: FaBell,
    iconClass: "text-3xl text-yellow-500",
    title: "Real-Time Alerts",
    description:
      "Get instant notifications for task updates, deadlines, and attendance.",
  },
  {
    icon: FaShieldAlt,
    iconClass: "text-3xl text-red-500",
    title: "Secure Access",
    description:
      "Role-based access control to ensure sensitive data is protected and only authorized users have access.",
  },
  {
    icon: FaComments,
    iconClass: "text-3xl text-blue-500",
    title: "Internal Communication",
    description:
      "Facilitate easy communication between team members through internal messaging.",
  },
  {
    icon: FaDatabase,
    iconClass: "text-3xl text-gray-600",
    title: "Data Export & Reports",
    description:
      "Download reports in CSV or PDF formats to analyze productivity, attendance, and more.",
  },
  {
    icon: FaCloudUploadAlt,
    iconClass: "text-3xl text-teal-600",
    title: "Cloud Backup",
    description:
      "Keep your employee data safe and accessible with automatic cloud backups.",
  },
];
