import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from "react-router-dom"

const Layout: React.FC<{}> = () => {
  
  return (
    <>
      <div className="layout-header">
        LAYOUT
      </div>
      <main className="pt-8">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;