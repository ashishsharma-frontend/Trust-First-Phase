import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertOffsetToTimes, motion } from "motion/react";
import { IoMdArrowBack } from "react-icons/io";
import Wave1 from "../../assets/Images/wave1.svg";
import Wave2 from "../../assets/Images/wave2.svg";
// import Razorpay from 'razorpay';
// import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 }
  },
  exit: { opacity: 0 }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

function PaymentMethod() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('razorpay');
  // const { error, isLoading, Razorpay } = useRazorpay();

  const paymentMethods = [
    { id: 'razorpay', name: 'Razerpay' },
    { id: 'razorpayUPI', name: 'Razerpay' },
    { id: 'flutterwave', name: 'FlutterWave' },
    { id: 'stripe', name: 'Stripe' },
  ];


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

        {/* Back Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={() => navigate('/registration-fee')}
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
          <motion.h4 variants={itemVariants} style={{ fontSize: "18px", opacity: 0.9 }}>
            Subscription
          </motion.h4>
          <motion.p variants={itemVariants} style={{ fontSize: "16px", marginTop: "6px" }}>
            Choose your preferred payment method to continue.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* White Content Area */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          margin: "-60px 0 0",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {paymentMethods.map((method, index) => (
          <motion.div
            key={method.id}
            variants={itemVariants}
            whileHover={{ backgroundColor: "#f8f8f8" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedMethod(method.id)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              borderBottom: '1px solid #eee',
              cursor: 'pointer'
            }}
          >
            <motion.div
              animate={{
                scale: selectedMethod === method.id ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '2px solid #003DA5',
                marginRight: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {selectedMethod === method.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#003DA5'
                  }}
                />
              )}
            </motion.div>
            {method.name}
          </motion.div>
        ))}

        <motion.button
          variants={itemVariants}
          whileHover={{ backgroundColor: "#002d7a" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          // onClick={() => navigate('/approval')}
          onClick={handlePayment}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#003DA5',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            marginTop: '3.2rem',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
          }}
        >
          Select Payment
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default PaymentMethod;