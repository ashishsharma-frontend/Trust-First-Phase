import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowBack } from "react-icons/io";
import Wave1 from "../../assets/Images/wave1.svg";
import Wave2 from "../../assets/Images/wave2.svg";
import { $crud } from "../../factory/CrudFactory";

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

const fallbackVehicle = {
  type: "Bike",
  emoji: "🚲",
  registrationFees: 49,
  icon: "", // fallback icon if needed
};

const RegistrationFee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicle } = location.state || {};
  const selectedVehicle = vehicle || fallbackVehicle;

  const getUser = async () => {
    try {
      const { data } = await $crud.post('user/driver-profile');
      return data;
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handlePayment = async () => {
    const user = await getUser();
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: selectedVehicle.registrationFees * 100,
      currency: "INR",
      name: "Trust",
      description: "Test Transaction",
      handler: (response) => {
        navigate('/approval');
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.mobile || "",
      },
      theme: {
        color: "#003da5",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Top Section with Blue BG */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: "#003DA5",
          color: "#fff",
          padding: "24px 20px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Wave Background Images */}
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

        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => navigate("/registration")}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "6px 8px",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          <IoMdArrowBack size={20} color="#003DA5" />
        </motion.button>

        {/* Content */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.h4
            variants={itemVariants}
            style={{ fontSize: "15px", opacity: 0.9 }}
          >
            Registration Fee
          </motion.h4>
          <motion.p
            variants={itemVariants}
            style={{ fontSize: "18px", fontWeight: "600", marginTop: "6px" }}
          >
            Pay Onboarding Fee and start earning with full access.
          </motion.p>

          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            style={{
              backgroundColor: "#fff",
              margin: "20px 20px",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #ddd",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <motion.div
              variants={itemVariants}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "30px",
                marginBottom: "6px",
              }}
            >
              <motion.input type="radio" checked readOnly />
              {selectedVehicle.icon ? (
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={selectedVehicle.icon}
                  alt={selectedVehicle.type}
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                <span style={{ fontSize: "2rem" }}>
                  {selectedVehicle.emoji || "🚗"}
                </span>
              )}
              <motion.span
                variants={itemVariants}
                style={{ fontWeight: "600", fontSize: "16px", color: '#000' }}
              >
                {selectedVehicle.type} — ₹{selectedVehicle.registrationFees}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Payment Method - Razorpay Only */}
      <motion.div
        variants={itemVariants}
        style={{ padding: "0 20px", marginTop: "3rem" }}
      >
        <motion.button
          variants={itemVariants}
          whileHover={{ backgroundColor: "#002d7a" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handlePayment}
          style={{
            width: "100%",
            backgroundColor: "#003DA5",
            color: "#fff",
            fontWeight: "600",
            fontSize: "16px",
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Proceed with Razorpay
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default RegistrationFee;