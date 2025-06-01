import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import TrustLogo from "../assets/Images/TrustLogo.png";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function OtpVerification() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const location = useLocation();
  const mobile = location.state?.mobile;

  useEffect(() => {
    let interval = null;
    if (!showResend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setShowResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer, showResend]);

  const handleResend = () => {
    // Trigger resend OTP API here
    console.log("Resending OTP...");
    setTimer(30);
    setShowResend(false);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleContinue = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      navigate('/changeLanguage', { replace: true });
      // navigate("/changeLanguage");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };
  const handleBack = () => {
    navigate("/login"); // This will go back to the previous page
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        maxWidth: "393px",
        margin: "0 auto",
        padding: "10px",
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          style={{
            background: "#f5f5f5",
            borderRadius: "8px",
            border: "2px solid #ccc",
            padding: "8px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          {"←"}
        </motion.button>
        <motion.img
          variants={itemVariants}
          src={TrustLogo}
          alt="Trust Logo"
          style={{ width: "80px" }}
        />
      </motion.div>

      {/* Text Section */}
      <motion.div variants={itemVariants} style={{ marginTop: "40px" }}>
        <motion.h2
          variants={itemVariants}
          style={{ fontWeight: "bold", fontSize: "24px" }}
        >
          Enter code
        </motion.h2>
        <motion.p
          variants={itemVariants}
          style={{
            color: "#555",
            marginBottom: "20px",
            lineHeight: "1.5",
            fontSize: "1.2rem",
          }}
        >
          We've sent an SMS with an activation code to your phone{" "}
          <b>+91 {mobile}</b>
        </motion.p>
      </motion.div>

      {/* OTP Input Section */}
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "30px",
        }}
      >
        {otp.map((digit, idx) => (
          <motion.input
            key={idx}
            whileFocus={{ scale: 1.1, borderColor: "#003DA5" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            id={`otp-${idx}`}
            type="tel"
            maxLength="1"
            inputMode="numeric"
            pattern="[0-9]*"
            value={digit}
            onChange={(e) => handleOtpChange(idx, e.target.value)}
            style={{
              width: "45px",
              height: "50px",
              fontSize: "24px",
              textAlign: "center",
              borderRadius: "10px",
              border: "1.5px solid #ccc",
              outline: "none",
              fontWeight: "bold",
              marginTop: "1rem",
            }}
          />
        ))}
      </motion.div>

      {/* Timer/Resend Section */}
      <motion.div
        variants={itemVariants}
        style={{
          textAlign: "center",
          fontSize: "15px",
          color: "#444",
          marginTop: "1.5rem",
        }}
      >
        {showResend ? (
          <motion.button
            whileHover={{ scale: 1.05, color: "#002d7a" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleResend}
            style={{
              background: "transparent",
              color: "#003DA5",
              border: "none",
              fontWeight: "bold",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Send code again
          </motion.button>
        ) : (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <strong>Send code again</strong> 00:
            {timer.toString().padStart(2, "0")}
          </motion.span>
        )}
      </motion.div>

      {/* Continue Button */}
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.02, backgroundColor: "#002d7a" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContinue}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#003DA5",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          marginTop: "1.5rem",
        }}
      >
        Continue
      </motion.button>
    </motion.div>
  );
}

export default OtpVerification;
