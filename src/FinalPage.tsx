import React, { useState, useCallback } from 'react';
import { Menu as MenuIcon, X, Facebook, Twitter, Instagram } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

// PORTAL COMPONENT (reused from HomePage)
export const Portal: React.FC<{
  children: React.ReactNode;
  containerId?: string;
}> = ({
  children,
  containerId = "portals",
}) => {
  const [mounted, setMounted] = useState(false);
  
  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;
  
  let portalsDiv = document.getElementById(containerId);
  if (!portalsDiv) {
    portalsDiv = document.createElement("div");
    portalsDiv.setAttribute("id", containerId);
    document.body.appendChild(portalsDiv);
  }
  return createPortal(children, portalsDiv);
};

// HEADER COMPONENT (same as HomePage)
interface HeaderProps {
  openMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ openMenu }) => {
  return (
    <div 
      className="relative z-10 flex items-center justify-between p-4 pt-8"
      style={{
        backgroundImage: `url('/images/red-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="flex items-center gap-2">
        <div className="text-base font-Kebagraph text-white">
          <span className=" font-Kebagraph text-goldenrod-100">En</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-Kebagraph text-goldenrod-100">
          Biriyani World
        </h1>
      </div>
      <button 
        onClick={openMenu}
        className="p-1 rounded-md hover:bg-black/10 transition-colors"
      >
        <MenuIcon size={28} className="text-goldenrod-100" />
      </button>
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-30 mix-blend-difference -z-10"
        style={{
          backgroundImage: `url('/images/red-bg.jpg')`,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
  );
};

// MENU COMPONENT (with proper close function)
interface MenuProps {
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [isClosing, setIsClosing] = useState(false);
  
  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'Contact Us', href: '#footer' },
  ];

  // Handle close button click with proper event handling and animation
  const handleCloseClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleMenuClick = (item: { name: string; href: string }) => {
    if (item.href.startsWith('/')) {
      // Navigate to different page
      onClose();
      navigate(item.href);
    } else if (item.href.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(item.href);
      if (element) {
        onClose();
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  return (
    <div 
      className={`absolute top-0 right-0 w-[427px] h-[360px] overflow-hidden shadow-2xl z-50 ${
        isClosing ? 'animate-slide-to-right' : 'animate-slide-from-right'
      }`}
      style={{
        backgroundImage: `url('/images/red-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Close button */}
      <button 
        onClick={handleCloseClick}
        className="absolute top-4 right-4 text-white hover:text-goldenrod-100 transition-colors z-[10000] bg-black/20 rounded-full p-2 hover:bg-black/40"
        style={{ pointerEvents: 'auto' }}
        type="button"
      >
        <X size={20} />
      </button>
      
      {/* Menu content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Menu items - centered */}
        <nav className="flex flex-col items-center space-y-6 mt-12 flex-1 justify-center">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleMenuClick(item)}
              className="text-white text-lg font-medium hover:text-goldenrod-100 transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>
        
        {/* Biryani image positioned at bottom */}
        <div className="flex justify-center pb-6">
          <img 
            src="/images/bm.png" 
            alt="Biryani" 
            className="w-30 h-25 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// MAIN CONTENT COMPONENT
const MainContent: React.FC = () => {
  return (
    <div className="bg-white px-6 py-10 flex-1 flex flex-col items-center justify-center text-center">
      {/* Main heading */}
      <h2 className="text-3xl font-semibold text-red-600 mb-6 leading-tight">
        One step closer to<br />
        biryani bliss!
      </h2>
      
      {/* Subtext */}
      <p className="text-black text-lg mb-2 max-w-xs leading-relaxed">
        We'll give you a quick call soon<br />
        stay tuned for the feast!
      </p>
      
      {/* Ball image */}
      <div className="flex justify-center items-center flex-1 max-w-sm">
        <img 
          src="/images/balls.gif" 
          alt="Orange ball" 
          className="w-190 h-250 object-contain"
        />
      </div>
    </div>
  );
};

// FOOTER COMPONENT (same as HomePage)
const Footer: React.FC = () => {
  return (
    <footer id="footer" className="pt-8 pb-4 bg-[url('/images/red-bg.png')] bg-cover text-white">
      {/* Quick Links Section */}
      <div className="mb-8">
        <h3 className="text-5xl font-semibold text-center mb-4">Quick Links</h3>
        <div className="flex flex-col items-center space-y-4 text-xl opacity-80">
          <a href="#" className="hover:text-goldenrod-100 transition-colors">Home</a>
          <a href="#" className="hover:text-goldenrod-100 transition-colors">About Us</a>
          <a href="#" className="hover:text-goldenrod-100 transition-colors">Contact Us</a>
        </div>
      </div>
      
      {/* Brand Logo */}
      <div className="text-center mb-4">
        <h2 className="text-3xl font-kebagh text-goldenrod-100">Biriyani World</h2>
      </div>
      
      {/* Contact Info */}
      <div className="text-center mb-6 px-8">
        <p className="text-base opacity-70 mb-2">
          Barcalys is an all-in-one mobile banking app full of tools.
        </p>
        <p className="text-base opacity-70">
          Phone No: 7451212545
        </p>
      </div>
      
      {/* Social Media */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-6">
          <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Facebook size={18} className="text-white" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Twitter size={18} className="text-white" />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Instagram size={18} className="text-white" />
          </a>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center text-xs opacity-70">
        © Biriyani Culture all rights reserved
      </div>
    </footer>
  );
};

// MAIN FINAL PAGE COMPONENT
const FinalPage: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-lg relative overflow-x-hidden flex flex-col">
        <Header openMenu={openMenu} />
        <MainContent />
        <Footer />
        
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </div>
    </div>
  );
};

export default FinalPage;