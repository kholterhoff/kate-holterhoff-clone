import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-center py-4">
      <p className="text-sm text-gray-600">© {currentYear} Kate Holterhoff</p>
    </footer>
  );
};

export default Footer;
