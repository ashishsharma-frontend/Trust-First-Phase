import React, { useEffect, useState } from "react";
import { IoLanguage } from "react-icons/io5"
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";


const LanguageSwitchBtn = () => {

    const [selectedLanguage, setSelectedLanguage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const res = JSON.parse(localStorage.getItem('selectedLanguage'));
        if (res) {
            setSelectedLanguage(() => res);
        }
    }, []);
    
    return (
        <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => navigate('/changeLanguage')}
            style={{
                background: "#fff",
                borderRadius: "10px",
                padding: "6px 8px",
                cursor: "pointer",
                zIndex: 1,
                display:'flex',
                alignItems:'center',
                gap:5
            }}
        >
            <motion.h7 style={{ color: '#000', fontSize:14 }}>

                {
                    selectedLanguage?.name
                }
            </motion.h7>
            <IoLanguage size={20} color="#000" />
        </motion.div>
    )
}

export default LanguageSwitchBtn;