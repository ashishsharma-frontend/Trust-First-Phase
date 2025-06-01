import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { FiEdit } from "react-icons/fi";
import ProfileStep from "./ProfileStep";
import LocationStep from "./LocationStep";
import DocumentStep from "./DocumentStep";
import Wave1 from "../../assets/Images/wave1.svg";
import Wave2 from "../../assets/Images/wave2.svg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
  exit: { opacity: 0 },
};

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

function Registration() {
  const location = useLocation();
  const state = location.state || {};

  const [currentStep, setCurrentStep] = useState(state.step ?? 1);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    referralCode: "",
    serviceType: "taxi",
    location: "",
    city: "",
    postalCode: "",
    companyTaxNumber: "",
  });

  const navigate = useNavigate();

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/vehical-selection");
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

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
        variants={stepVariants}
        style={{
          backgroundColor: "#003DA5",
          padding: "24px 20px 140px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        {/* Wave Images */}
        <img
          src={Wave1}
          alt=""
          style={{ position: "absolute", top: 0, right: 0, width: "50%" }}
        />
        <img
          src={Wave2}
          alt=""
          style={{ position: "absolute", bottom: 0, left: 0, width: "50%" }}
        />

        {/* Back Button with Touch Animation */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={handleBack}
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            background: "#fff",
            color: "#242424",
            border: "none",
            borderRadius: "10px",
            padding: "6px 8px",
            fontSize: "18px",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          ←
        </motion.button>

        {/* Profile Section with Animation */}
        <motion.div variants={stepVariants}>
          {currentStep === 1 ? (
            <motion.div
              whileTap={{ scale: 0.95 }}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#fff",
                margin: "40px auto 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
                overflow: "visible", // <-- Allow icon to overflow if needed
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("profilePicture").click()}
            >
              <input
                type="file"
                id="profilePicture"
                hidden
                accept="image/*"
                onChange={(e) => setSelectedProfilePicture(e.target.files[0])}
              />
              {selectedProfilePicture ? (
                <img
                  src={URL.createObjectURL(selectedProfilePicture)}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%", // <-- Ensure the image is perfectly circular
                  }}
                />
              ) : (
                <span style={{ fontSize: "24px", color: "#003DA5" }}>👤</span>
              )}

              {/* Edit Icon Circle */}
              <div
                style={{
                  position: "absolute",
                  bottom: "4px", // <-- shifted inside
                  right: "4px", // <-- shifted inside
                  width: "24px",
                  height: "24px",
                  backgroundColor: "#003DA5",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #fff",
                  boxSizing: "border-box",
                  boxShadow: "0 0 4px rgba(0,0,0,0.15)", // optional subtle shadow for better visibility
                }}
              >
                <FiEdit color="#fff" size={14} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={stepVariants}
              style={{
                padding: "40px 0 20px",
                position: "relative",
                marginTop: "10px",
                zIndex: 1,
              }}
            >
              <motion.h2 style={{ margin: "0 0 8px", fontSize: "18px" }}>
                Welcome, {formData.name} 👋
              </motion.h2>
              <motion.p style={{ margin: 0, opacity: 0.8, fontSize: "14px" }}>
                Let's get your company information set up to continue.
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* White Content Area */}
      <motion.div
        variants={stepVariants}
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          margin: "-100px 0 0",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Stepper Card with Touch Animations */}
        <motion.div
          variants={stepVariants}
          style={{
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            {[
              { step: 1, label: "Profile" },
              { step: 2, label: "Location" },
              { step: 3, label: "Document" },
            ].map((item, index) => (
              <React.Fragment key={item.step}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  style={{ textAlign: "center", flex: 1, position: "relative" }}
                >
                  <motion.div
                    animate={{
                      backgroundColor:
                        item.step <= currentStep ? "#003DA5" : "#fff",
                      scale: item.step === currentStep ? 1.1 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 17 }}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: `2px solid ${
                        item.step <= currentStep ? "#003DA5" : "#ccc"
                      }`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.step <= currentStep ? "#fff" : "#ccc",
                      margin: "0 auto",
                      fontSize: "18px",
                      fontWeight: "bold",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    {item.step < currentStep ? "✓" : item.step}
                  </motion.div>
                  <motion.div
                    animate={{
                      color: item.step <= currentStep ? "#003DA5" : "#ccc",
                    }}
                    style={{
                      fontSize: "14px",
                      marginTop: "4px",
                    }}
                  >
                    {item.label}
                  </motion.div>
                </motion.div>
                {index < 2 && (
                  <motion.div
                    animate={{
                      backgroundColor:
                        item.step < currentStep ? "#003DA5" : "#ccc",
                    }}
                    style={{
                      position: "absolute",
                      left: `${(index + 1) * 33.33}%`,
                      width: "33.33%",
                      height: "2px",
                      top: "25px",
                      zIndex: 1,
                      transform: "translateX(-50%)",
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Step Content with Animation */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {currentStep === 1 && <ProfileStep onNext={handleNext} />}
          {currentStep === 2 && <LocationStep onNext={handleNext} />}
          {currentStep === 3 && (
            <DocumentStep
              onSubmit={() => {
                navigate("/registration-fee", {
                  state: { vehicle: state.vehicle },
                  replace: true,
                });
              }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Registration;