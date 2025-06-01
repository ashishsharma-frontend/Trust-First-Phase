import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { $crud } from "../../factory/CrudFactory";
import { snackbar } from "../../service";

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

function DocumentStep({ onSubmit }) {
  const [activeDocument, setActiveDocument] = useState(null);
  const [requiredDocuments, setRequiredDocument] = useState([]);
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });
  const navigate = useNavigate();

  const documents = [
    { id: "drivingLicense", name: "Driving License" },
    { id: "aadhaar", name: "Aadhaar Card" },
    { id: "panCard", name: "Pan Card" },
    { id: "rc", name: "Registration Certificate ( RC )" },
    { id: "insurance", name: "Vehicle Insurance" },
    { id: "permit", name: "Vehicle Permit" },
    { id: "photo", name: "Profile Photo" },
  ];

  useEffect(() => {
    getNeededDocsList();
  }, []);

  useEffect(() => {
    console.log(requiredDocuments);
  }, [requiredDocuments]);

  const getNeededDocsList = async () => {
    try {
      const { data } = await $crud.get("driver/documents/needed");
      setRequiredDocument(() => data);
    } catch (e) {
      console.log(e, "error");
    }
  };

  const uploadDocuments = async () => {
    try {
      const docsFormData = new FormData();
      docsFormData.append("document_id", activeDocument.id);
      docsFormData.append("document", formData.front);
      if (activeDocument.is_front_and_back) {
        docsFormData.append("documentBack", formData.back);
      }
      for (const pair of docsFormData.entries()) {
        if (!pair[1]) {
          snackbar("Select all the document files.", "error");
          return;
        }
      }
      const { success } = await $crud.post(
        "driver/upload/documents",
        docsFormData
      );
      if (success) {
        setActiveDocument(null);
        setFormData({
          front: "",
          back: "",
        });
        getNeededDocsList();
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleDocumentClick = (docId) => {
    const selectedDoc = requiredDocuments.find((d) => d.id === docId);
    setActiveDocument(selectedDoc);
  };

  const handleFileUpload = (event, side = "front") => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [side]: file,
      }));
    }
  };

  const handleCompleteRegistration = () => {
    const notUploadedDocument = requiredDocuments.find((e) => !e.is_uploaded);
    if (notUploadedDocument) {
      snackbar(`Please upload ${notUploadedDocument.name}`, "error");
      return;
    }
    onSubmit();
    // You can add validation here if needed
    // navigate("/registration-fee");
  };

if (activeDocument) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        variants={itemVariants}
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          gap: "10px",
        }}
      >
        <motion.h2 variants={itemVariants} style={{ margin: 0 }}>
          Upload {activeDocument?.name}
        </motion.h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* Front Side Upload */}
        <motion.div variants={itemVariants} style={{ marginBottom: "20px" }}>
          {activeDocument.is_front_and_back && (
            <motion.p
              variants={itemVariants}
              style={{ marginBottom: "1.2rem" }}
            >
              Front Side
            </motion.p>
          )}
          <motion.div
            whileHover={{ scale: 1.02, borderColor: "#003DA5" }}
            whileTap={{ scale: 0.98 }}
            style={{
              border: "2px dashed #ccc",
              borderRadius: "10px",
              padding: "40px 20px",
              textAlign: "center",
              cursor: "pointer",
              minHeight: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => document.getElementById("frontFile").click()}
          >
            <input
              type="file"
              id="frontFile"
              hidden
              accept="image/*"
              onChange={(e) => handleFileUpload(e, "front")}
            />
            {!formData.front ? (
              <span>Click or drag file to this area to upload</span>
            ) : (
              <img
                src={URL.createObjectURL(formData.front)}
                style={{ height: "100px" }}
                alt="Front Preview"
              />
            )}
          </motion.div>
        </motion.div>

        {/* Back Side Upload (only if required) */}
        {activeDocument.is_front_and_back && (
          <motion.div
            variants={itemVariants}
            style={{ marginBottom: "20px" }}
          >
            <motion.p
              variants={itemVariants}
              style={{ marginBottom: "1.2rem" }}
            >
              Back Side
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.02, borderColor: "#003DA5" }}
              whileTap={{ scale: 0.98 }}
              style={{
                border: "2px dashed #ccc",
                borderRadius: "10px",
                padding: "40px 20px",
                textAlign: "center",
                cursor: "pointer",
                minHeight: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => document.getElementById("backFile").click()}
            >
              <input
                type="file"
                id="backFile"
                hidden
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "back")}
              />
              {!formData.back ? (
                <span>Click or drag file to this area to upload</span>
              ) : (
                <img
                  src={URL.createObjectURL(formData.back)}
                  style={{ height: "100px" }}
                  alt="Back Preview"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={uploadDocuments}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#003DA5",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "2.2rem",
        }}
      >
        Submit
      </button>
    </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h2 variants={itemVariants} style={{ marginBottom: "20px" }}>
        Please upload the required documents to complete your registration.
      </motion.h2>

      <motion.div
        variants={containerVariants}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {requiredDocuments.map((doc, index) => (
          <motion.button
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, borderColor: "#003DA5" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDocumentClick(doc.id)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "15px",
              backgroundColor: "transparent",
              border: "1px solid #ccc",
              borderRadius: "10px",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <span>{doc.name}</span>

            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              {doc.is_uploaded && "✅"}
              &nbsp; &nbsp; &rarr;
            </motion.span>
          </motion.button>
        ))}
      </motion.div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          margin: "32px 0 12px 0",
        }}
      >
        {requiredDocuments.map((doc, idx) => (
          <div
            key={doc.id}
            style={{
              width: "32px",
              height: "8px",
              borderRadius: "6px",
              background: doc.is_uploaded ? "#003DA5" : "#E3EAF3",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <motion.button
        variants={itemVariants}
        whileHover={{ backgroundColor: "#002d7a" }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCompleteRegistration}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#003DA5",
          color: "white",
          border: "none",
          borderRadius: "10px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Complete Registration
      </motion.button>
    </motion.div>
  );
}

export default DocumentStep;
