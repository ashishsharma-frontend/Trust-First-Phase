import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCamera, FiImage, FiX } from "react-icons/fi";

function DocumentPopup({ show, onClose, onFileSelect, label = "Upload Document" }) {
  const fileInputRef = useRef();
  const cameraInputRef = useRef();

  const handleGallery = () => fileInputRef.current.click();
  const handleCamera = () => cameraInputRef.current.click();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
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
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              bottom: "env(safe-area-inset-bottom, 0px)",
              left: 0,
              right: 0,
              background: "white",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              padding: "2rem 1.5rem 1.5rem",
              zIndex: 1001,
              maxWidth: "480px",
              margin: "0 auto",
              width: "100%",
              boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
              textAlign: "center",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                fontSize: 22,
                color: "#888",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              <FiX />
            </button>
            <h3 style={{ marginBottom: "1.5rem", fontWeight: 600, fontSize: 20 }}>
              {label}
            </h3>
            <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              <button
                onClick={handleCamera}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#F0F6FF",
                  border: "2px solid #003DA5",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "#003DA5",
                  fontWeight: 500,
                  outline: "none",
                  transition: "box-shadow 0.2s",
                  boxShadow: "0 2px 8px rgba(0,61,165,0.06)",
                }}
              >
                <FiCamera size={32} style={{ marginBottom: 8 }} />
                Camera
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </button>
              <button
                onClick={handleGallery}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#F0F6FF",
                  border: "2px solid #003DA5",
                  borderRadius: "12px",
                  padding: "18px 24px",
                  cursor: "pointer",
                  fontSize: 16,
                  color: "#003DA5",
                  fontWeight: 500,
                  outline: "none",
                  transition: "box-shadow 0.2s",
                  boxShadow: "0 2px 8px rgba(0,61,165,0.06)",
                }}
              >
                <FiImage size={32} style={{ marginBottom: 8 }} />
                Gallery
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DocumentPopup;