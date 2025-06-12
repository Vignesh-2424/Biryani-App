import React, { useState, useCallback } from 'react';
import { Menu as MenuIcon, X, Facebook, Twitter, Instagram, Edit } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate, useLocation } from 'react-router-dom';
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

// REVIEW SECTION COMPONENT
const ReviewSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data from navigation state or use default values
  const { cartItems = {}, formData = {}, orderTotal = 0 } = location.state || {};
  
  // Sample cart items if none provided (only items with quantity > 0)
  const defaultCartItems = {
    'Chicken Biriyani': 70,
    'Naan': 50
  };
  
  const defaultFormData = {
    fullName: 'Arjitha',
    phoneNumber: '+91 9566293703',
    branch: 'Porur',
    deliveryTime: '18th March 2025, 02:00 p.m',
    address: 'Porur',
    pincode: '6000087',
    landmark: '-'
  };
  
  // Filter cart items to only show items with quantity > 0
  const filteredCartItems = Object.entries(cartItems).reduce((acc, [name, quantity]) => {
    if (quantity > 0) {
      acc[name] = quantity;
    }
    return acc;
  }, {} as Record<string, number>);
  
  // Use filtered cart items or default if no items in cart
  const currentCartItems = Object.keys(filteredCartItems).length > 0 ? filteredCartItems : defaultCartItems;
  const currentFormData = Object.keys(formData).length > 0 ? formData : defaultFormData;
  
  // Calculate totals
  const menuPrices: Record<string, number> = {
    'Chicken Biriyani': 250,
    'Mutton Biriyani': 250,
    'Plain Biriyani': 250,
    'Biryani Combo': 250,
    'Naan': 250
  };
  
  const subtotal = Object.entries(currentCartItems).reduce((total, [name, quantity]) => {
    return total + (menuPrices[name] || 250) * (quantity as number);
  }, 0);
  
  const deliveryCharges = 100;
  const total = subtotal + deliveryCharges;

  const handleExploreMenu = () => {
    navigate('/menu');
  };

  const handleSubmit = () => {
    navigate('/final');
  };

  return (
    <div className="bg-white px-6 py-8">
      {/* Review Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-black">Review</h2>
      </div>
      
      {/* Explore Menu Link */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handleExploreMenu}
          className="text-black underline text-sm font-medium flex items-center gap-1"
        >
          Explore Menu →
        </button>
        <Edit size={16} className="text-gray-400" />
      </div>
      
      {/* Cart Items - Only show items with quantity > 0 */}
      <div className="space-y-4 mb-6">
        {Object.entries(currentCartItems).map(([name, quantity]) => (
          <div key={name} className="flex justify-between items-center">
            <span className="text-black font-medium">{name} x{quantity}</span>
            <span className="text-black font-medium">Rs.{((menuPrices[name] || 250) * (quantity as number)).toLocaleString()}</span>
          </div>
        ))}
      </div>
      
      {/* Order Summary */}
      <div className="border-t border-gray-200 pt-4 space-y-2 mb-8">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>Rs.{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Delivery Charges</span>
          <span>Rs.{deliveryCharges}</span>
        </div>
        <div className="flex justify-between font-semibold text-black border-t border-gray-300 pt-2">
          <span>Total</span>
          <span>Rs.{total.toLocaleString()}</span>
        </div>
      </div>
      
      {/* Details Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-black">Details</h3>
          <Edit size={16} className="text-gray-400" />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Full Name :</span>
            <span className="text-black">{currentFormData.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Phone Number:</span>
            <span className="text-black">{currentFormData.phoneNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Nearest Branch:</span>
            <span className="text-black">{currentFormData.branch}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Delivery Time:</span>
            <span className="text-black">{currentFormData.deliveryTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Address:</span>
            <span className="text-black">{currentFormData.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Pincode:</span>
            <span className="text-black">{currentFormData.pincode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Landmark:</span>
            <span className="text-black">{currentFormData.landmark || '-'}</span>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-black text-white font-semibold py-4 px-16 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105"
        >
          Submit
        </button>
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

// MAIN REVIEW PAGE COMPONENT
const ReviewPage: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-lg relative overflow-x-hidden">
        <Header openMenu={openMenu} />
        <ReviewSection />
        <Footer />
        
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </div>
    </div>
  );
};

export default ReviewPage;