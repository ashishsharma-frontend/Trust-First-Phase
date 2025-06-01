import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import USFlag from "../assets/Images/English.png";
import IndiaFlag from "../assets/Images/Hindi.png";
import ArabicFlag from "../assets/Images/Arabic.png";
import FrenchFlag from "../assets/Images/French.png";
import GermanFlag from "../assets/Images/German.png";
import { $crud } from "../factory/CrudFactory";

const languages = [
  { name: "English", value: "en", flag: USFlag },
  { name: "Hindi", value: "hi", flag: IndiaFlag },
  // { name: "Arabic", value: "ar", flag: ArabicFlag },
  // { name: "French", value: "fr", flag: FrenchFlag },
  // { name: "German", value: "de", flag: GermanFlag },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.1 },
  },
  exit: { opacity: 0, y: -20 },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const ChangeLanguage = () => {
  const [selected, setSelected] = useState("en");
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);



  useEffect(() => {
    const res = JSON.parse(localStorage.getItem('selectedLanguage'));
    if (res?.value) {
      setSelected(() => res.value);
    }
  }, []);

  const changeContentLocation = (lang) => {
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
      googleSelect.value = lang;
      googleSelect.dispatchEvent(new Event("change"));
      // console.log(googleSelect.value, "======")
    }
  }

  const getUser = async () => {
    try {
      const { data } = await $crud.post('user/driver-profile');
      localStorage.setItem('user', JSON.stringify(data));
      return data
    } catch (e) {
      console.log(e, "error");
    }
  }

  const onsubmit = async () => {

    try {
      await $crud.post('user/update-my-lang', { lang: selected });
      const user = await getUser();
      if (!user.uploaded_document) {
        navigate("/registration", {
          state: {
            step: 3,
          }
        });
        // navigate("/refer-and-earn");
      } else if (!user.approve) {
        navigate("/approval");
      } else {
        navigate("/refer-and-earn");
      }

      // navigate("/vehical-selection");
    } catch (e) {
      console.log(e, "eeeee")
    }
  }

  const handleSave = () => {
    if (selected) {
      onsubmit()
    } else {
      alert("Please select a language");
    }
  };
  const handleBack = () => {
    navigate("/login");
  };

  const onLanguageSelect = (lang) => {
    // console.log(lang)
    setSelected(lang.value);
    changeContentLocation(lang.value);
    localStorage.setItem('selectedLanguage', JSON.stringify(lang));
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        maxWidth: "393px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <motion.div variants={itemVariants}>
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "4rem",
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
          <motion.h3
            variants={itemVariants}
            style={{
              margin: 0,
              fontSize: "20px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
            }}
          >
            Change Language
          </motion.h3>
          <motion.span variants={itemVariants}></motion.span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          style={{
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "'Inter', sans-serif",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {languages.map((lang, index) => (
            <motion.div
              key={lang.value}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              // onClick={() => setSelected(lang.value)}
              onClick={() => onLanguageSelect(lang)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border:
                  selected === lang.value
                    ? "1.5px solid #003DA5"
                    : "1.5px solid #ddd",
                borderRadius: "10px",
                padding: "12px 16px",
                cursor: "pointer",
                backgroundColor: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={lang.flag}
                  alt={lang.name}
                  style={{ width: "30px" }}
                />
                <motion.div>
                  <motion.div style={{ fontSize: "16px", fontWeight: "bold" }}>
                    {lang.name}
                  </motion.div>
                  <motion.div style={{ fontSize: "13px", color: "#666" }}>
                    {lang.name}
                  </motion.div>
                </motion.div>
              </div>
              <motion.div
                animate={{
                  backgroundColor:
                    selected === lang.value ? "#003DA5" : "transparent",
                }}
                transition={{ duration: 0.2 }}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: "2px solid #003DA5",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: "#002d7a" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
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
          position: "fixed",
          bottom: "20px",
          maxWidth: "353px",
        }}
      >
        Save
      </motion.button>
    </motion.div>
  );
};

export default ChangeLanguage;
