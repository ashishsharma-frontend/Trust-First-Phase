import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TrustLogo from "../assets/Images/TrustLogo.png";
import BgImage from "../assets/Images/Taxi.png";

function Loader() {
  const navigate = useNavigate();
  const [opacity, setOpacity] = useState(0);
  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    // Initial white background with logo
    setOpacity(1);

    // After 2 seconds, show background image
    const bgTimer = setTimeout(() => {
      setShowBg(true);
    }, 2000);

    // After 4 seconds, navigate to login
    const navigationTimer = setTimeout(() => {
      navigate("/login");
    }, 4000);

    return () => {
      clearTimeout(bgTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          // backgroundImage: `url(${BgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: showBg ? 1 : 0,
          transition: "opacity 1.5s ease-in-out",
        }}
      />

      {/* Logo */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: opacity,
          transition: "opacity 1s ease-in-out",
        }}
      >
        <img
          src={TrustLogo}
          alt="Trust Logo"
          style={{
            width: '250px',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
}

export default Loader;
