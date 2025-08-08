import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-200px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
