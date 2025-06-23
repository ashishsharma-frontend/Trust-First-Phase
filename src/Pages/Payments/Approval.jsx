import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { IoIosLogOut } from "react-icons/io";
import { IoLanguage } from "react-icons/io5";
import Wave1 from "../../assets/Images/wave1.svg";
import Wave2 from "../../assets/Images/wave2.svg";
import Reviewimg from "../../assets/Images/Review.png";
import { LanguageSwitchBtn } from "../../components/global";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function PaymentProcessing() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const getUser = () => JSON.parse(localStorage.getItem("user"));

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Blue Header Area */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: "#003DA5",
          padding: "24px 20px 140px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          paddingTop: "80px",
        }}
      >
        {/* Wave Images */}
        <motion.img
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={Wave1}
          alt=""
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "50%",
          }}
        />
        <motion.img
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={Wave2}
          alt=""
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "50%",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            display: "flex",
            gap: 15,
            paddingTop: "30px",
          }}
        >
          <LanguageSwitchBtn />

          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={handleLogout}
            style={{
              background: "#fff",
              border: "none",
              borderRadius: "10px",
              padding: "6px 8px",
              fontSize: "18px",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <IoIosLogOut size={20} color="#FF0000" />
          </motion.button>
        </div>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "1rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.h4
            variants={itemVariants}
            style={{ fontSize: "15px", opacity: 0.9 }}
          >
            Welcome, {getUser()?.name}👋
          </motion.h4>
          <motion.p
            variants={itemVariants}
            style={{ fontSize: "18px", fontWeight: "600", marginTop: "6px" }}
          >
            Let's get your company information set up to continue.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* White Content Area */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: "#fff",
          margin: "-100px 20px 0",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #ddd",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        {/* Processing Illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          style={{
            width: "200px",
            height: "200px",
            margin: "0 auto 20px",
          }}
        >
          <motion.img
            src={Reviewimg}
            alt="Processing"
            style={{ width: "100%" }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        {/* Status Message */}
        <motion.div variants={itemVariants} style={{ marginBottom: "30px" }}>
          <motion.h2
            variants={itemVariants}
            style={{
              fontSize: "20px",
              color: "#1a1a1a",
              marginBottom: "10px",
            }}
          >
            Your document are under review
          </motion.h2>
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.5",
            }}
          >
            Approval will be given within 24 hours please wait to start your
            earning
          </motion.p>
        </motion.div>

        {/* Refer & Earn Button */}
        <motion.button
          whileHover={{ backgroundColor: "#002d7a" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => navigate("/refer-and-earn")}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#003DA5",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Refer and Earn
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PaymentProcessing;
