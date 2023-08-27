import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Drawer as AntDrawer } from 'antd';
import FrenchPressLoader from '../loaders/frenchPressLoader';
const CoffeeDrawer = ({ 
  open, handleOk, handleCancel, title, subtitle, validated, loading, footer, body, 
  closable, size, width, cancelText, okText, update = 0, isLoading=true
}) => {
  const [drawerWidth, setDrawerWidth] = useState("30%"); // Default width, adjust as needed

  // Update Drawer width based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 576) {
        setDrawerWidth("100%");
      } else if (window.innerWidth < 992) {
        setDrawerWidth("90%");
      } else {
        setDrawerWidth("70%");
      }
    };

    // Initial setup
    handleResize();

    // Attach event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <AntDrawer
        open={open}
        title={title}
        size={size}
        width={drawerWidth}
        onClose={handleCancel}
        footer={footer}
        closable={closable}
        >

        {isLoading && <FrenchPressLoader/>}
        {body}
        
      </AntDrawer>
    </>
  );
};

export default CoffeeDrawer;
