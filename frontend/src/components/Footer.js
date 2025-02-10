import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-[50px] bg-[#242629] flex items-center justify-center">
      <p className="text-white font-Goldman text-[12px] leading-[14px] tracking-wider">
        &copy; {new Date().getFullYear()} Groove Store. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
