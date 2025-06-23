import React, { useEffect, useState, useRef } from 'react';
import { motion } from "framer-motion";
import { $crud } from '../../factory/CrudFactory';
import { FaCarSide } from "react-icons/fa";
import { MdOutlineLocationOn, MdOutlineDirectionsCar, MdOutlineNumbers } from "react-icons/md";
import { TbCarSuv } from "react-icons/tb";

function LocationStep({ onNext }) {
  const [formData, setFormData] = useState({
    serviceType: 'taxi',
    location: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleNumber: '',
    vehicleYear: ''
  });

  const [serviceLocations, setServiceLocation] = useState([]);

  // Refs for each input
  const locationRef = useRef();
  const makeRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();
  const numberRef = useRef();

  useEffect(() => {
    getServiceLocation();
  }, []);

  const getServiceLocation = async () => {
    try {
      const { data } = await $crud.get('servicelocation');
      setServiceLocation(data);
    } catch (e) {
      console.log(e, "error");
    }
  };

  const onSubmit = async () => {
    try {
      const { success } = await $crud.post('user/driver-profile', {
        vehicle_year: formData.vehicleYear,
        car_number: formData.vehicleNumber,
        car_model_name: formData.vehicleModel,
        car_make_name: formData.vehicleMake,
        service_location_name: formData.location,
        transport_type: formData.serviceType
      });
      if (success) {
        onNext();
      }
    } catch (e) {
      console.log(e, "error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const selectedStyle = (value) => ({
    border: formData.serviceType === value ? '2px solid #003DA5' : '1.5px solid #ddd',
    backgroundColor: formData.serviceType === value ? '#F0F6FF' : '#fff',
    color: '#333',
  });

  // Scroll input into view on focus (for mobile keyboard)
  const scrollIntoViewIfNeeded = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
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

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        maxWidth: '393px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
        overflowY: 'auto',
        paddingBottom: '30px', // for keyboard on mobile
      }}
    >
      {/* Service Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ marginBottom: '2.2rem' }}
      >
        <motion.h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '18px' }}>
          Register For
        </motion.h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          {[
            { type: 'taxi', icon: <FaCarSide size={22} /> },
            { type: 'delivery', icon: <TbCarSuv size={22} /> },
            { type: 'both', icon: <MdOutlineDirectionsCar size={22} /> }
          ].map(({ type, icon }, index) => (
            <motion.div
              key={type}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 24
              }}
              onClick={() => setFormData({ ...formData, serviceType: type })}
              style={{
                flex: 1,
                padding: '12px',
                textAlign: 'center',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '500',
                fontSize: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                ...selectedStyle(type),
              }}
            >
              {icon}
              <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Service Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '22px' }}
      >
        <label htmlFor="location">Service Location</label>
        <div style={inputWrap}>
          <MdOutlineLocationOn style={iconStyle} />
          <motion.select
            ref={locationRef}
            id="location"
            onFocus={() => scrollIntoViewIfNeeded(locationRef)}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            style={inputStyle}
            required
          >
            <option value="">Select Location</option>
            {serviceLocations.map(({ name, id }) =>
              <option key={id} value={name}>{name}</option>
            )}
          </motion.select>
        </div>
      </motion.div>

      {/* Vehicle Make */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '22px' }}
      >
        <label htmlFor="vehicleMake">Vehicle Make</label>
        <div style={inputWrap}>
          <FaCarSide style={iconStyle} />
          <motion.input
            ref={makeRef}
            id="vehicleMake"
            onFocus={() => scrollIntoViewIfNeeded(makeRef)}
            type="text"
            placeholder="e.g. Honda"
            value={formData.vehicleMake}
            onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
            style={inputStyle}
            required
          />
        </div>
      </motion.div>

      {/* Vehicle Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: '22px' }}
      >
        <label htmlFor="vehicleModel">Vehicle Model</label>
        <div style={inputWrap}>
          <MdOutlineDirectionsCar style={iconStyle} />
          <motion.input
            ref={modelRef}
            id="vehicleModel"
            onFocus={() => scrollIntoViewIfNeeded(modelRef)}
            type="text"
            placeholder="e.g. Amaze"
            value={formData.vehicleModel}
            onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
            style={inputStyle}
            required
          />
        </div>
      </motion.div>

      {/* Vehicle Model Year */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: '22px' }}
      >
        <label htmlFor="vehicleYear">Vehicle Model Year</label>
        <div style={inputWrap}>
          <MdOutlineNumbers style={iconStyle} />
          <motion.input
            ref={yearRef}
            id="vehicleYear"
            onFocus={() => scrollIntoViewIfNeeded(yearRef)}
            type='text'
            placeholder="e.g. 2020"
            maxLength={4}
            value={formData.vehicleYear}
            onChange={({ target: { value } }) => {
              if (!isNaN(value)) {
                setFormData({ ...formData, vehicleYear: value })
              }
            }}
            style={inputStyle}
            required
          />
        </div>
      </motion.div>

      {/* Vehicle Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '25px' }}
      >
        <label htmlFor="vehicleNumber">Vehicle Number</label>
        <div style={inputWrap}>
          <TbCarSuv style={iconStyle} />
          <motion.input
            ref={numberRef}
            id="vehicleNumber"
            onFocus={() => scrollIntoViewIfNeeded(numberRef)}
            type="text"
            placeholder="e.g. DL 01 AB 1234"
            value={formData.vehicleNumber}
            onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
            style={inputStyle}
            required
          />
        </div>
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ backgroundColor: '#002d7a' }}
        whileTap={{ scale: 0.95 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
          delay: 0.7
        }}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#003DA5',
          color: '#fff',
          fontWeight: '600',
          fontSize: '16px',
          borderRadius: '10px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '2rem',
        }}
      >
        Continue
      </motion.button>
    </motion.form>
  );
}

export default LocationStep;