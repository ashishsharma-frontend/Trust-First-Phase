import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import CarIcon from "../assets/Images/car.png";
import BikeIcon from "../assets/Images/motorcycle.png";
import MotorbikeIcon from "../assets/Images/3d-truck.png";
import AutoIcon from "../assets/Images/auto-rickshaw.png";
import Wave1 from "../assets/Images/wave1.svg";
import Wave2 from "../assets/Images/wave2.svg";
import vehicleBike from '../assets/Images/vehicle_bike.webp';
import vehicleCar from '../assets/Images/vehicle_car.webp';
import vehicleRickshaw from '../assets/Images/vehicle_erickshaw.webp';
import vehicleTruck from '../assets/Images/vehicle_truck.webp';

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

function VehicleSelection() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(null);


  const vehicles = [
    {
      type: "Passenger Car",
      description: "Comfortable 4-wheeler for personal or shared transport.",
      icon:vehicleCar,
      registrationFees: 99
    },
    {
      type: "Bike",
      description: "Efficient for fast delivery and solo transportation.",
      icon: vehicleBike,
      registrationFees: 49
    },
    {
      type: "Truck / Tempo",
      description: "Ideal for heavy-duty logistics and cargo transportation.",
      icon: vehicleTruck,
      registrationFees: 349
    },
    {
      type: "E loder/ battery rikshaw",
      description: "Eco-friendly vehicle for local and last-mile rides.",
      icon: vehicleRickshaw,
      registrationFees: 49
    },
  ];


  const handleVehicleSelect = (index) => {
    setSelectedVehicle(index);
  };

  const handleContinue = () => {
    if (selectedVehicle !== null) {
      navigate("/registration", {
        state: { vehicle: vehicles[selectedVehicle] },
      });
    } else {
      alert("Please select a vehicle to continue");
    }
  };

  const handleBack = () => {
    // navigate("/changeLanguage");
    navigate(-1);
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
      {/* Top Section with Blue + Waves */}
      <motion.div
        variants={itemVariants}
        style={{
          backgroundColor: "#003DA5",
          padding: "24px 20px 160px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <img
          src={Wave1}
          alt="wave1"
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "50%",
          }}
        />
        <img
          src={Wave2}
          alt="wave2"
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "50%",
          }}
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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

        <motion.div
          variants={itemVariants}
          style={{ marginTop: "4rem", position: "relative", zIndex: 1 }}
        >
          <motion.h1
            variants={itemVariants}
            style={{ fontSize: "22px", fontFamily: "Poppins, sans-serif" }}
          >
            Welcome 👋
          </motion.h1>
          <motion.p
            variants={itemVariants}
            style={{
              color: "#ffffffcc",
              fontSize: "15px",
              marginTop: "6px",
            }}
          >
            Choose how you want to with Trust
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Selection Card */}
      <motion.div
        variants={containerVariants}
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
        {vehicles.map((vehicle, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleVehicleSelect(index)}
            style={{
              backgroundColor: "#fff",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px",
              border:
                selectedVehicle === index
                  ? "2px solid #003DA5"
                  : "1px solid #eee",
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            <motion.div
              variants={itemVariants}
              style={{ flex: 1 }}
            >
              <motion.div
                style={{
                  color: "#003DA5",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
              >
                Rides
              </motion.div>
              <motion.div
                className="bold"
                style={{
                  color: "#000",
                  fontWeight: "600",
                  fontSize: "16px",
                  marginBottom: "4px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {vehicle.type}
              </motion.div>
              <motion.div
                style={{ color: "#666", fontSize: "14px" }}
              >
                {vehicle.description}
              </motion.div>
            </motion.div>

            <motion.img
              whileHover={{ scale: 1.1, rotate: 5 }}
              src={vehicle.icon}
              alt={vehicle.type}
              style={{ width: "50px", height: "50px" }}
            />
          </motion.div>
        ))}

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: selectedVehicle !== null ? "#003DA5" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            marginTop: "20px",
            cursor: selectedVehicle !== null ? "pointer" : "not-allowed",
            transition: "background-color 0.3s ease",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          Select Vehicle
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default VehicleSelection;
