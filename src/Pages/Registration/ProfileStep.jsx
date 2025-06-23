import React, { useState, useRef } from 'react';
import { motion } from "framer-motion";
import { $crud } from '../../factory/CrudFactory';
import OtpPopup from './OtpPopup';
import { FiUser, FiPhone, FiMail, FiLock, FiGift } from "react-icons/fi";
import { MdOutlineWc } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [errors, setErrors] = useState({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Refs for each input
  const nameRef = useRef();
  const mobileRef = useRef();
  const emailRef = useRef();
  const genderRef = useRef();
  const passwordRef = useRef();
  const referralRef = useRef();

  // Scroll input into view on focus (for mobile keyboard)
  const scrollIntoViewIfNeeded = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Validation
  const validate = () => {
    let err = {};
    if (!formData.name.trim()) err.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(formData.mobile)) err.mobile = "Enter valid 10-digit mobile";
    if (!/\S+@\S+\.\S+/.test(formData.email)) err.email = "Enter valid email";
    if (!formData.gender) err.gender = "Select gender";
    if (formData.password.length < 6) err.password = "Password min 6 chars";
    if (!formData.acceptPolicy) err.acceptPolicy = "Accept policy";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
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
      alert('Something went wrong. Please try again.');
    }
    setLoading(false);
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
      alert('Something went wrong while applying referral code.');
    }
  };

  const inputWrap = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  };

  const iconStyle = {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#003DA5',
    fontSize: 20,
    pointerEvents: 'none'
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 14px 14px 42px',
    border: '1.5px solid #ddd',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    background: '#fff'
  };

  const selectIconStyle = {
    ...iconStyle,
    fontSize: 22
  };

  return (
    <>
      <motion.form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          paddingBottom: '30px',
          maxWidth: "393px",
          margin: "0 auto",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Name */}
        <motion.div>
          <label htmlFor="name">Name</label>
          <div style={inputWrap}>
            <FiUser style={iconStyle} />
            <motion.input
              ref={nameRef}
              id="name"
              type="text"
              value={formData.name}
              onFocus={() => scrollIntoViewIfNeeded(nameRef)}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={inputStyle}
              required
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
            />
          </div>
          {errors.name && <div id="name-error" style={{color: 'red', fontSize: 13}}>{errors.name}</div>}
        </motion.div>

        {/* Mobile Number */}
        <motion.div>
          <label htmlFor="mobile">Phone No.</label>
          <div style={inputWrap}>
            <FiPhone style={iconStyle} />
            <span
              style={{
                position: 'absolute',
                left: 38,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#003DA5',
                fontWeight: 600,
                fontSize: 15,
                pointerEvents: 'none'
              }}
            >+91</span>
            <motion.input
              ref={mobileRef}
              id="mobile"
              type="tel"
              value={formData.mobile}
              onFocus={() => scrollIntoViewIfNeeded(mobileRef)}
              onChange={e => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, '') })}
              style={{ ...inputStyle, paddingLeft: 70 }}
              required
              autoComplete="tel"
              maxLength={10}
              pattern="[0-9]{10}"
              aria-invalid={!!errors.mobile}
              aria-describedby="mobile-error"
            />
          </div>
          {errors.mobile && <div id="mobile-error" style={{color: 'red', fontSize: 13}}>{errors.mobile}</div>}
        </motion.div>

        {/* Email */}
        <motion.div>
          <label htmlFor="email">Email</label>
          <div style={inputWrap}>
            <FiMail style={iconStyle} />
            <motion.input
              ref={emailRef}
              id="email"
              type="email"
              value={formData.email}
              onFocus={() => scrollIntoViewIfNeeded(emailRef)}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              style={inputStyle}
              required
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
            />
          </div>
          {errors.email && <div id="email-error" style={{color: 'red', fontSize: 13}}>{errors.email}</div>}
        </motion.div>

        {/* Gender */}
        <motion.div>
          <label htmlFor="gender">Gender</label>
          <div style={inputWrap}>
            <MdOutlineWc style={selectIconStyle} />
            <motion.select
              ref={genderRef}
              id="gender"
              value={formData.gender}
              onFocus={() => scrollIntoViewIfNeeded(genderRef)}
              onChange={e => setFormData({ ...formData, gender: e.target.value })}
              style={{ ...inputStyle, paddingLeft: 44 }}
              required
              aria-invalid={!!errors.gender}
              aria-describedby="gender-error"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </motion.select>
          </div>
          {errors.gender && <div id="gender-error" style={{color: 'red', fontSize: 13}}>{errors.gender}</div>}
        </motion.div>

        {/* Password */}
        <motion.div>
          <label htmlFor="password">Password</label>
          <div style={inputWrap}>
            <FiLock style={iconStyle} />
            <motion.input
              ref={passwordRef}
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onFocus={() => scrollIntoViewIfNeeded(passwordRef)}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              style={inputStyle}
              required
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
            />
            <span
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 14,
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                color: '#888',
                fontSize: 20,
                userSelect: 'none'
              }}
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>
          {errors.password && <div id="password-error" style={{color: 'red', fontSize: 13}}>{errors.password}</div>}
        </motion.div>

        {/* Referral Code */}
        <motion.div>
          <label htmlFor="referralCode">Referral Code (optional)</label>
          <div style={inputWrap}>
            <FiGift style={iconStyle} />
            <motion.input
              ref={referralRef}
              id="referralCode"
              type="text"
              value={formData.referralCode}
              onFocus={() => scrollIntoViewIfNeeded(referralRef)}
              onChange={e => setFormData({ ...formData, referralCode: e.target.value })}
              placeholder="Enter referral code"
              style={inputStyle}
              autoComplete="off"
            />
          </div>
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
            aria-invalid={!!errors.acceptPolicy}
            aria-describedby="acceptPolicy-error"
          />
          <label htmlFor="acceptPolicy" style={{ fontSize: '14px' }}>
            I accept the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>.
          </label>
        </motion.div>
        {errors.acceptPolicy && <div id="acceptPolicy-error" style={{color: 'red', fontSize: 13}}>{errors.acceptPolicy}</div>}

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ backgroundColor: '#002d7a' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: loading ? '#b3c6e6' : '#003DA5',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '1rem',
            fontWeight: 600,
            letterSpacing: 1
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
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