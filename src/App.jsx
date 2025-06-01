import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Loader from "./Pages/Loader";
import VehicalSelection from "./Pages/VehicalSelection";
import Login from "./Pages/Login";
import OtpVerify from "./Pages/OtpVerify";
import ChangeLanguage from "./Pages/ChangesLanguages";
import Registration from "./Pages/Registration/Registration";
import RegistrationFee from "./Pages/Payments/RegistrationFee";
import ReferAndEarn from "./Pages/ReferAndEarn";
import PaymentMethod from "./Pages/Payments/PaymentMethod";
import PaymentProcessing from "./Pages/Payments/approval";
import { ProtectedRoute } from "./navigation";

function App() {
  const location = useLocation();

  const token = localStorage.getItem('accessToken');

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Loader />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute isAllowed={!token} redirectPath='/approval'>
                <Login />
              </ProtectedRoute>
            </motion.div>
          }
        />
        <Route
          path="/otpVerify"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OtpVerify />
            </motion.div>
          }
        />
        <Route
          path="/changeLanguage"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChangeLanguage />
            </motion.div>
          }
        />
        <Route
          path="/vehical-selection"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <VehicalSelection />
            </motion.div>
          }
        />
        <Route
          path="/registration"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Registration />
            </motion.div>
          }
        />
        <Route
          path="/registration-fee"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RegistrationFee />
            </motion.div>
          }
        />

        <Route
          path="/refer-and-earn"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute isAllowed={token}>
                <ReferAndEarn />
              </ProtectedRoute>
            </motion.div>
          }
        />
        <Route
          path="/payment-method"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PaymentMethod />
            </motion.div>
          }
        />
        <Route
          path="/approval"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProtectedRoute isAllowed={token}>
                <PaymentProcessing />
              </ProtectedRoute>
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default App;