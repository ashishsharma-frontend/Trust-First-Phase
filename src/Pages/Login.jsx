import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import TrustLogo from '../assets/Images/TrustLogo.png';
import IndiaFlag from '../assets/Images/Hindi.png';
import { $crud } from '../factory/CrudFactory';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      const formatted = value.split('').reduce((acc, digit, index) => {
        if (index === 3 || index === 6) {
          return `${acc} ${digit}`;
        }
        return acc + digit;
      }, '');
      setPhoneNumber(formatted);
    }
  };

  const handleContinue = () => {
    if (phoneNumber.replace(/\s/g, '').length === 10) {
      console.log(phoneNumber)
      handleLogin(phoneNumber.replace(/\s/g, ''));
    } else {
      alert('Please enter a valid 10-digit phone number');
    }
  };
  const handleLogin = async (mobile) => {
    try {
      const data = await $crud.post('driver/login', { mobile });
      const token = data.access_token.split('|')[1];
      localStorage.setItem('accessToken', token);
      navigate('/otpVerify', {
        state: {
          mobile,
        },
      });
    } catch (e) {
      console.log(e, "eeeee")
    }

  }

  return (
    <motion.div
      className="font-inter max-w-[393px] mx-auto min-h-screen flex flex-col p-5 gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div>

        {/* Header */}
        <motion.div
          className="flex justify-end"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        >
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={TrustLogo}
            alt="Trust Logo"
            className="w-20"
          />
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="mt-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <motion.h2
            className="font-poppins font-bold text-2xl mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Log in
          </motion.h2>
          <p style={{ color: '#555', marginBottom: '30px' }}>
            Please confirm your country code and enter your phone number.
          </p>

          {/* Country Selector */}
          <motion.div
            whileHover={{ backgroundColor: "#f8f8f8" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              padding: '14px 0',
              marginBottom: '20px',
              cursor: 'pointer',
            }}
          >
            <motion.div
              style={{ display: 'flex', alignItems: 'center' }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={IndiaFlag}
                alt="India Flag"
                style={{ width: '25px', marginRight: '10px' }}
              />
              <span style={{ fontSize: '16px', fontWeight: '500' }}>India</span>
            </motion.div>
          </motion.div>

          {/* Phone Input */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              borderTop: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              padding: '14px 0',
              marginBottom: '30px',
            }}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              style={{ fontSize: '16px', fontWeight: '500', marginRight: '1.5rem' }}
            >
              +91
            </motion.span>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter mobile number"
              maxLength="12"
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                width: '100%',
                fontFamily: "'Inter', sans-serif",
                caretColor: '#003DA5',
                backgroundColor: 'transparent',
              }}
            />
          </motion.div>

          {/* Sync Contacts */}
          {/* <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px',
            }}
          >
            <motion.span
              whileHover={{ x: 5 }}
              style={{ fontSize: '16px', fontWeight: '500' }}
            >
              Sync Contacts
            </motion.span>
            <motion.label
              className="switch"
              whileTap={{ scale: 0.9 }}
            >
              <input type="checkbox" defaultChecked />
              <motion.span
                className="slider round"
                whileHover={{ backgroundColor: "#002d7a" }}
              />
            </motion.label>
          </motion.div> */}

          {/* Continue Button */}
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#002d7a" }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
            onClick={handleContinue}
            className="w-full py-3.5 bg-[#003DA5] text-white text-base rounded-lg font-medium"
          >
            Continue
          </motion.button>


        </motion.div>
      </motion.div>

      <motion.h6
        className="font-poppins text-sm text-center cursor-pointer "
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={() => navigate('/vehical-selection')}
      >
        No account? <motion.a style={{ color: 'rgb(0, 61, 165)' }}> Sign up  here.</motion.a>
      </motion.h6>
    </motion.div>
  );
}

export default Login;
