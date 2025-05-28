import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

import {
  FaFacebookF,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};




const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const ContactUs = () => {
    useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-white to-indigo-50 p-6 sm:p-10 mt-24 max-w-4xl mx-auto rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.nav
        className="mb-6 text-sm text-indigo-600 font-semibold"
        variants={itemVariants}
        custom={0}
      >
        <Link to="/" className="hover:underline">
          Home
        </Link>{" "}
        &lt; Contact Us
      </motion.nav>

      <motion.h1
        className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-6 drop-shadow-lg"
        variants={itemVariants}
        custom={1}
      >
        Get In Touch With Us
      </motion.h1>

      <motion.p
        className="mb-8 text-gray-700 text-base sm:text-lg leading-relaxed"
        variants={itemVariants}
        custom={2}
      >
        Have questions or need help? Reach out to us anytime. We're here to
        assist you and provide the best service for your electronics needs.
      </motion.p>

      <motion.div
        className="bg-white p-6 sm:p-10 rounded-xl shadow-xl space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            title: "Store Name",
            icon: null,
            info: "Buy Online Shop",
          },
          {
            title: "Address",
            icon: null,
            info: "123 Main Street, Cairo, Egypt",
          },
          {
            title: "Phone",
            icon: <FaPhone className="inline mr-2 text-indigo-600" />,
            info: (
              <a
                href="tel:+201279905676"
                className="hover:text-indigo-800 transition underline"
              >
                01279905676
              </a>
            ),
          },
          {
            title: "Email",
            icon: <FaEnvelope className="inline mr-2 text-indigo-600" />,
            info: (
              <a
                href="mailto:adelmarawan638@gmail.com"
                className="hover:text-indigo-800 transition underline"
              >
                adelmarawan638@gmail.com
              </a>
            ),
          },

          {
            title: "Working Hours",
            icon: null,
            info: "Saturday - Thursday: 9:00 AM - 8:00 PM",
          },
          {
            title: "Follow Us",
            icon: null,
            info: (
              <div className="flex flex-wrap gap-6 text-indigo-600 font-semibold text-lg">
                <a
                  href="https://www.facebook.com/share/1AHavxyUiV/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-800 transition"
                >
                  <FaFacebookF />
                  Facebook
                </a>
                <a
                  href="http://www.linkedin.com/in/marwan-elsaka-41ba70356"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-800 transition"
                >
                  <FaLinkedin />
                  Linkedin
                </a>
                <a
                  href="https://github.com/marwan-adel8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-800 transition"
                >
                  <FaGithub />
                  Github
                </a>
                <a
                  href="https://wa.me/201234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-800 transition"
                >
                  <FaWhatsapp />
                  WhatsApp
                </a>
              </div>
            ),
          },
        ].map(({ title, icon, info }, i) => (
          <motion.div
            key={title}
            className="border-l-4 border-indigo-600 pl-4"
            custom={i + 3}
            variants={itemVariants}
          >
            <h3 className="text-xl font-semibold text-indigo-700 flex items-center gap-2">
              {icon} {title}
            </h3>
            <div className="mt-2 text-gray-700">{info}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
