import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import Wave1 from "../assets/Images/wave1.svg";
import Wave2 from "../assets/Images/wave2.svg";
import InviteMemberimg from "../assets/Images/Invite.png";
import { $crud } from "../factory/CrudFactory";

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

function ReferAndEarn() {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState("");
  const [walletDetails, setWalletDetails] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [friends] = useState([
    { id: 1, name: "Tongkun Lee", platform: "Facebook", status: "pending" },
    { id: 2, name: "Rehmem Khilal", platform: "TikTok", status: "pending" },
    { id: 3, name: "Fazur Nalim", platform: "Gmail", status: "accepted" },
    { id: 4, name: "Bon Polegleam", platform: "Google", status: "accepted" },
    {
      id: 5,
      name: "Gurkir Glorymore",
      platform: "LinkedIn",
      status: "pending",
    },
  ]);

  useEffect(() => {
    getReferralDetails();
    getWalletDetails();
  }, []);

  const getReferralDetails = async () => {
    try {
      const { data } = await $crud.get("get/referral");
      // console.log(data);
      setReferralCode(data.refferal_code);
    } catch (e) {
      console.log(e);
    }
  };

  const getWalletDetails = async () => {
    try {
      const data = await $crud.get("payment/wallet/history");
      console.log(data);
      setWalletDetails(() => data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const onClickShareBtn = () => {
    if (window.AndroidBridge && window.AndroidBridge.share) {
      const text = `Use ${referralCode} when you sign up and enjoy exclusive benefits! 💸`;
      window.AndroidBridge.share(text);
    } else {
      alert("Sharing not supported in this browser.");
    }
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
        variants={itemVariants}
        style={{
          backgroundColor: "#003DA5",
          padding: "24px 20px 140px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            bottom: 0,
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
            bottom: 0,
            width: "50%",
          }}
        />

        {/* Wallet Icon Button on Right */}
        {/* Wallet Icon Button on Right with Label */}
        <motion.button
          // whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          // onClick={() => alert("Go to Wallet")}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "6px 12px",
            fontSize: "16px",
            fontWeight: 500,
            color: "#003DA5",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            // cursor: "pointer",
            zIndex: 1,
          }}
        >
          <span role="img" aria-label="wallet">
            👛
          </span>{" "}
          Wallet ₹ {walletDetails.wallet_balance ?? 0}
        </motion.button>

        {/* Referral Content */}
        <motion.div
          variants={itemVariants}
          style={{
            textAlign: "center",
            marginTop: "4rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <motion.img
            src={InviteMemberimg}
            alt="Earn Money"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              width: "200px",
              margin: "0 auto",
              display: "block",
              marginBottom: "1.2rem",
            }}
          />
          <motion.h1
            variants={itemVariants}
            style={{ fontSize: "24px", margin: "0 0 20px" }}
          >
            Earn Money By Refer
          </motion.h1>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              background: "rgba(255, 255, 255, 0.1)",
              padding: "10px",
              borderRadius: "10px",
              maxWidth: "300px",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <motion.div style={{ fontSize: "18px" }}>{referralCode}</motion.div>
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    color: "#4CAF50",
                    fontSize: "14px",
                  }}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Copy
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
              onClick={onClickShareBtn}
            >
              Share
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              marginTop: "18px",
              color: "#fff",
              background: "rgba(0,61,165,0.10)",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "15px",
              fontWeight: 500,
              maxWidth: "340px",
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 2px 8px rgba(0,61,165,0.06)",
            }}
          >
            <span role="img" aria-label="info" style={{ marginRight: 6 }}>
              ⏳
            </span>
            Referral rewards will be credited within <b>5-7 business days</b>{" "}
            after your friend’s successful registration.
          </motion.div>
          {/* Total Referrals Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{
              marginTop: "10px",
              fontSize: "16px",
              color: "#fff",
              fontWeight: "500",
            }}
          >
            {/* Total Referrals: {friends.length} */}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ReferAndEarn;
