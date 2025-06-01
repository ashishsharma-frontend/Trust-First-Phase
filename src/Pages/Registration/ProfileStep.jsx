import React, { useState } from 'react';
import { motion } from "framer-motion";
import { $crud } from '../../factory/CrudFactory';
import OtpPopup from './OtpPopup'; // Ensure path is correct

function ProfileStep({ onNext }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    gender: "",
    password: "",
    referralCode: "",
    lang: 'eng',
    country: '+91',
    login_by: 'android',
    device_token: 'fcm12898273847shjgdhasg23209',
    acceptPolicy: false,
  });

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');

  const onSubmit = async () => {
    if (!formData.acceptPolicy) {
      alert("Please accept the Privacy Policy and Terms.");
      return;
    }

    try {
      const data = await $crud.post('driver/register', formData);
      if (data.success) {
        const token = data.access_token.split('|')[1];
        localStorage.setItem('accessToken', token);
        setShowOtpPopup(true);
      } else {
        alert('Registration failed: ' + (data.message || 'Unknown error'));
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      setShowOtpPopup(false);
      if (formData.referralCode) {
        ApplyReferCode();
      } else {
        onNext();
      }
    } else {
      alert("Please enter a valid 6-digit OTP.");
    }
  };

  const ApplyReferCode = async () => {
    try {
      const data = await $crud.post('update/driver/referral', {
        refferal_code: formData.referralCode
      });
      if (data.success) {
        onNext();
      } else {
        alert('Referral code update failed');
      }
    } catch (e) {
      console.error(e);
      alert('Something went wrong while applying referral code.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
      >
        {/* Name */}
        <motion.div>
          <label htmlFor="name">Name</label>
          <motion.input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            style={inputStyle}
            required
          />
        </motion.div>

        {/* Mobile Number */}
        <motion.div>
          <label htmlFor="mobile">Phone No.</label>
          <div style={{ display: 'flex' }}>
            <motion.span
              className="country-code"
              style={{
                padding: '14px 16px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #ddd',
                borderRight: 'none',
                borderRadius: '10px 0 0 10px',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              +91
            </motion.span>
            <motion.input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              style={{ ...inputStyle, flex: 1, borderRadius: '0 10px 10px 0' }}
              required
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div>
          <label htmlFor="email">Email</label>
          <motion.input
            id="email"
            type="email"
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            style={inputStyle}
            required
          />
        </motion.div>

        {/* Gender */}
        <motion.div>
          <label htmlFor="gender">Gender</label>
          <motion.select
            id="gender"
            value={formData.gender}
            onChange={e => setFormData({ ...formData, gender: e.target.value })}
            style={inputStyle}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </motion.select>
        </motion.div>

        {/* Password */}
        <motion.div>
          <label htmlFor="password">Password</label>
          <motion.input
            id="password"
            type="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
            style={inputStyle}
            required
          />
        </motion.div>

        {/* Referral Code */}
        <motion.div>
          <label htmlFor="referralCode">Referral Code (optional)</label>
          <motion.input
            id="referralCode"
            type="text"
            value={formData.referralCode}
            onChange={e => setFormData({ ...formData, referralCode: e.target.value })}
            placeholder="Enter referral code"
            style={inputStyle}
          />
        </motion.div>

        {/* Accept Policy Checkbox */}
        <motion.div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="acceptPolicy"
            type="checkbox"
            checked={formData.acceptPolicy}
            onChange={e => setFormData({ ...formData, acceptPolicy: e.target.checked })}
            required
            style={{ marginRight: '10px' }}
          />
          <label htmlFor="acceptPolicy" style={{ fontSize: '14px' }}>
            I accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ backgroundColor: '#002d7a' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: '#003DA5',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Register
        </motion.button>
      </motion.form>

      {/* OTP Popup */}
      <OtpPopup
        show={showOtpPopup}
        otp={otp}
        setOtp={setOtp}
        onSubmit={handleOtpSubmit}
        onClose={() => setShowOtpPopup(false)}
      />
    </>
  );
}

export default ProfileStep;
