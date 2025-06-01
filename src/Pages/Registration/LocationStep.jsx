import React, { useEffect, useState } from 'react';
import { motion } from "motion/react";
import { $crud } from '../../factory/CrudFactory';

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
  }
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
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // onNext();
    //  console.log( Object.values(formData).some((e)=>!e))
    onSubmit();
  };

  const selectedStyle = (value) => ({
    border: formData.serviceType === value ? '2px solid #003DA5' : '1.5px solid #ddd',
    backgroundColor: formData.serviceType === value ? '#F0F6FF' : '#fff',
    color: '#333',
  });

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
          {['taxi', 'delivery', 'both'].map((type, index) => (
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
                ...selectedStyle(type),
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
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
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '15px', color: '#333' }}>
          Service Location
        </label>
        <motion.select
          type="text"
          placeholder="Enter your location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.01, borderColor: '#003DA5' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            padding: '13px 14px',
            border: '1.5px solid #ccc',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
          }}
          required
        >
          <motion.option value=''>Select Location</motion.option>
          {
            serviceLocations.map(({ name, id }, index) =>
              <motion.option key={index}>{name}</motion.option>
            )
          }
        </motion.select>
      </motion.div>

      {/* Vehicle Make */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginBottom: '22px' }}
      >
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '15px', color: '#333' }}>
          Vehicle Make
        </label>
        <motion.input
          type="text"
          placeholder="e.g. Honda"
          value={formData.vehicleMake}
          onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.01, borderColor: '#003DA5' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            padding: '13px 14px',
            border: '1.5px solid #ccc',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
          }}
          required
        />
      </motion.div>

      {/* Vehicle Model */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ marginBottom: '22px' }}
      >
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '15px', color: '#333' }}>
          Vehicle Model
        </label>
        <motion.input
          type="text"
          placeholder="e.g. Amaze"
          value={formData.vehicleModel}
          onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.01, borderColor: '#003DA5' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            padding: '13px 14px',
            border: '1.5px solid #ccc',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
          }}
          required
        />
      </motion.div>

      {/* Vehicle Model Year */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{ marginBottom: '22px' }}
      >
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '15px', color: '#333' }}>
          Vehicle Model Year
        </label>
        <motion.input
          type='text'
          placeholder="e.g. 2020"
          maxLength={4}
          value={formData.vehicleYear}
          onChange={({ target: { value } }) => {
            if (!isNaN(value)) {
              setFormData({ ...formData, vehicleYear: value })
            }
          }}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.01, borderColor: '#003DA5' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            padding: '13px 14px',
            border: '1.5px solid #ccc',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
          }}
          required
        />
      </motion.div>

      {/* Vehicle Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ marginBottom: '25px' }}
      >
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', fontSize: '15px', color: '#333' }}>
          Vehicle Number
        </label>
        <motion.input
          type="text"
          placeholder="e.g. DL 01 AB 1234"
          value={formData.vehicleNumber}
          onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
          whileTap={{ scale: 0.98 }}
          whileFocus={{ scale: 1.01, borderColor: '#003DA5' }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          style={{
            width: '100%',
            padding: '13px 14px',
            border: '1.5px solid #ccc',
            borderRadius: '10px',
            fontSize: '16px',
            outline: 'none',
          }}
          required
        />
      </motion.div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
