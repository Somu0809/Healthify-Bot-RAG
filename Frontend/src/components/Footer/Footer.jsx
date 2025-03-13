import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Games", path: "/games" }
  ];

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white py-8 px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10"></div>

      <motion.div
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left relative z-10 gap-12"
        variants={containerVariants}
      >
        {/* Left Section - Brand Info */}
        <motion.div
          className="mb-8 md:mb-0"
          variants={itemVariants}
        >
          <motion.h2
            className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight leading-relaxed py-1"
            whileHover={{ scale: 1.05 }}
          >
            Healthify
          </motion.h2>
          <motion.p
            className="text-xl text-white/90 mt-2 font-medium tracking-wide flex justify-center items-center"
            variants={itemVariants}
          >
            Your AI-powered wellness companion
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              <Heart className=" fill-blue-700"/>
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Center Section - Navigation Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-12 text-lg"
          variants={itemVariants}
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-medium transition-all duration-300 ${isActive
                    ? "text-blue-300"
                    : "text-white hover:text-blue-200"
                  }`
                }
              >
                {link.name}
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transform origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom Section */}
      <motion.div
        className="text-center text-sm text-white/60 mt-8 pt-8 border-t border-white/10"
        variants={itemVariants}
      >
        <motion.p
          whileHover={{ color: "#fff" }}
          transition={{ duration: 0.3 }}
        >
          © {new Date().getFullYear()} Healthify. All Rights Reserved.
        </motion.p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
