import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function OtpPopup({ show, otp, setOtp, onSubmit, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "black",
              zIndex: 1000,
            }}
          />

          {/* Popup */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "env(safe-area-inset-bottom, 0px)", // updated
              left: 0,
              right: 0,
              background: "white",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding: "2rem",
              zIndex: 1001,
              maxWidth: "480px",
              margin: "0 auto",
              width: "100%",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
              maxHeight: "90vh", // added
              overflowY: "auto", // added
              marginBottom: "10vh", // added for keyboard space
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>Enter OTP</h3>
            <input
              type="tel"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onFocus={(e) => {
                setTimeout(() => {
                  e.target.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }, 300);
              }}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setOtp(val);
              }}
              placeholder="6-digit OTP"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "18px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                marginBottom: "1rem",
                textAlign: "center",
                letterSpacing: "0.3em",
              }}
            />
            <button
              onClick={onSubmit}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: "#003DA5",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Submit OTP
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default OtpPopup;
