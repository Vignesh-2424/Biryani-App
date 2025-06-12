import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Menu as MenuIcon, X, Facebook, Twitter, Instagram, Calendar, ShoppingCart } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';
import './productcard.css';

export const Portal: React.FC<{
  children: React.ReactNode;
  containerId?: string;
}> = ({
  children,
  containerId = "portals",
}) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
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

// PORTAL POPUP COMPONENT
const PortalPopup: React.FC<{
  children: React.ReactNode;
  overlayColor?: string;
  placement?: 'Centered' | 'Top left' | 'Top center' | 'Top right' | 'Bottom left' | 'Bottom center' | 'Bottom right';
  onOutsideClick?: () => void;
  zIndex?: number;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  relativeLayerRef?: React.RefObject<Element>;
}> = ({
  children,
  overlayColor,
  placement = "Centered",
  onOutsideClick,
  zIndex = 100,
  left = 0,
  right = 0,
  top = 0,
  bottom = 0,
  relativeLayerRef
}) => {
  const relContainerRef = useRef<HTMLDivElement>(null);
  const [relativeStyle, setRelativeStyle] = useState<React.CSSProperties>({
    opacity: 0,
  });
  
  const popupStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    style.zIndex = zIndex;
    
    if (overlayColor) {
      style.backgroundColor = overlayColor;
    }
    
    if(!relativeLayerRef?.current) {
      switch (placement) {
        case "Centered":
          style.alignItems = "center";
          style.justifyContent = "center";
          break;
        case "Top left":
          style.alignItems = "flex-start";
          break;
        case "Top center":
          style.alignItems = "center";
          break;
        case "Top right":
          style.alignItems = "flex-end";
          break;
        case "Bottom left":
          style.alignItems = "flex-start";
          style.justifyContent = "flex-end";
          break;
        case "Bottom center":
          style.alignItems = "center";
          style.justifyContent = "flex-end";
          break;
        case "Bottom right":
          style.alignItems = "flex-end";
          style.justifyContent = "flex-end";
          break;
      }
    }
    
    style.opacity = 1;
    return style;
  }, [placement, overlayColor, zIndex, relativeLayerRef?.current]);

  const setPosition = useCallback(() => {
    const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
    const containerItem = relContainerRef?.current?.getBoundingClientRect();
    const style: React.CSSProperties = { opacity: 1 };
    
    if(relativeItem && containerItem) {
      const {x: relativeX, y: relativeY, width: relativeW, height: relativeH} = relativeItem;
      const {width: containerW, height: containerH} = containerItem;
      style.position = "absolute";
      
      switch (placement) {
        case "Top left":
          style.top = relativeY-containerH-top;
          style.left = relativeX+left;
          break;
        case "Top right":
          style.top = relativeY-containerH-top;
          style.left = relativeX+relativeW-containerW-right;
          break;
        case "Bottom left":
          style.top = relativeY+relativeH+bottom;
          style.left = relativeX+left;
          break;
        case "Bottom right":
          style.top = relativeY+relativeH+bottom;
          style.left = relativeX+relativeW-containerW-right;
          break;
      }
      setRelativeStyle(style);
    } else {
      style.maxWidth = "90%";
      style.maxHeight = "90%";
      setRelativeStyle(style);
    }
  }, [left, right, top, bottom, placement, relativeLayerRef?.current, relContainerRef?.current]);

  useEffect(() => {
    setPosition();
    window.addEventListener('resize', setPosition);
    window.addEventListener('scroll', setPosition, true);
    
    return () => {
      window.removeEventListener('resize', setPosition);
      window.removeEventListener('scroll', setPosition, true);
    };
  }, [setPosition]);

  const onOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (onOutsideClick && (e.target as HTMLElement).classList.contains("portalPopupOverlay")) {
        onOutsideClick();
      }
      e.stopPropagation();
    },
    [onOutsideClick]
  );

  return (
    <Portal>
      <div
        className="flex flex-col fixed inset-0 portalPopupOverlay"
        style={popupStyle}
        onClick={onOverlayClick}
      >
        <div ref={relContainerRef} style={relativeStyle}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

// HEADER COMPONENT
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
        className="absolute top-16 right-4 w-48 bg-red-700 text-white rounded-lg shadow-lg z-50"

        style={{
          backgroundImage: `url('/images/red-bg.jpg')`,
          backgroundSize: 'cover'
        }}
      >
      </div>
    </div>
  );
};

// HERO SECTION COMPONENT
const HeroSection: React.FC = () => {
  return (
    <div className="w-full relative">
      {/* Hero image with overlaid text */}
      <div
        className="relative w-full h-[600px] bg-cover bg-center flex flex-col items-center justify-center text-white"
        style={{ backgroundImage: `url('/images/hero.png')` }}
      >
        <div className="text-center">
          <div className="font-kaushan text-5xl md:text-6xl mb-2 drop-shadow-md">Feast with</div>
          <div className="font-luckiest text-6xl md:text-7xl mb-2 drop-shadow-md">BIRIYANI</div>
          <div className="font-kaushans text-4xl md:text-5xl mb-2 drop-shadow-md">Served at your</div>
          <div className="font-luckiest text-5xl md:text-6xl drop-shadow-md">HOME</div>
        </div>
        
        {/* Wave curve at bottom of hero */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            className="relative block w-full h-[60px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0 C400,80 800,80 1200,0 L1200,120 L0,120 Z"
              className="fill-[#F1B93B]"
            />
          </svg>
        </div>
      </div>

      {/* "Biriyani is an emotion" section */}
      <div className="w-full bg-[#F1B93B] py-6 relative">
        <div className="text-center font-kaushan text-maroon leading-tight relative z-10">
          <div className="text-[48px] md:text-[68px]">
            Biriyani is an
          </div>
          <div className="text-[52px] md:text-[72px] mt-1">
            emotion
          </div>
        </div>
      </div>
    </div>
  );
};

// PRODUCT CARD COMPONENT
interface ProductCardProps {
  name: string;
  price: string;
  minOrder: string;
  imageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, minOrder, imageUrl }) => {
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/menu');
  };

  return (
    <div className="relative w-[240px] mx-auto mt-2 product-card">
      <div className="bg-white rounded-3xl shadow-lg p-4 pt-6 h-[330px] relative z-10 mt-2">
        <div className="h-[160px] w-[160px] rounded-full overflow-hidden mx-auto">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover product-image" />
        </div>
        <div className="mt-4 text-center">
          <h3 className="text-lg text-black font-semibold">{name}</h3>
          <p className="text-base font-bold text-black mt-1">{price}</p>
          <p className="text-sm font-medium text-black opacity-80 mt-1">{minOrder}</p>
        </div>
      </div>

      {/* Order Now button */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-20">
        <button
          onClick={handleOrderClick}
          className="w-[120px] h-[36px] flex items-center justify-center rounded-full bg-black text-white font-semibold text-sm shadow-md order-button"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

// PRODUCT SHOWCASE COMPONENT
const ProductShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const products = [
    {
      name: 'Chicken Biriyani',
      price: 'Rs.250.00',
      minOrder: 'Min. order 50',
      imageUrl: '/images/chicken.png',
    },
    {
      name: 'Naan',
      price: 'Rs.250.00',
      minOrder: 'Min. order 50',
      imageUrl: '/images/n.png',
    },
    {
      name: 'Mutton Biriyani',
      price: 'Rs.250.00',
      minOrder: 'Min. order 50',
      imageUrl: '/images/m.png',
    },
    {
      name: 'Plain Biriyani',
      price: 'Rs.250.00',
      minOrder: 'Min. order 50',
      imageUrl: '/images/p.png',
    },
    {
      name: 'Combo Biriyani',
      price: 'Rs.250.00',
      minOrder: 'Min. order 50',
      imageUrl: '/images/cb.png',
    },
  ];

  // Mouse drag functionality
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    containerRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Intersection Observer for tracking active slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.intersectionRatio > 0.9) {
            setActiveIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.9,
      }
    );

    const items = container.querySelectorAll('.product-slide');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-[#F1B93B] flex flex-col items-center w-full pb-8">
        {/* Title */}
        <div className="text-center mt-6 mb-4">
          <h2 className="mx-auto max-w-[360px] text-black leading-snug">
            <span className="block text-[24px] md:text-[28px]">
              Order in bulk, share the joy
            </span>
            <span className="block text-[24px] md:text-[28px] mt-1">
              with your friends and family!
            </span>
          </h2>
        </div>

        {/* Scrollable Product Cards */}
        <div className="relative w-full max-w-[800px]">
          <div
            ref={containerRef}
            className="overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide w-full cursor-grab active:cursor-grabbing"
            style={{ userSelect: 'none' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex gap-6 justify-start w-max pb-10 px-[calc(50%-130px)]">
              {products.map((product, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`product-slide snap-center flex-shrink-0 w-[260px] transition-transform duration-300 ${
                    activeIndex === index ? 'scale-110' : 'scale-90 opacity-80'
                  }`}
                >
                  <ProductCard
                    name={product.name}
                    price={product.price}
                    minOrder={product.minOrder}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))} 
            </div>
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-black text-white rounded-t-2xl rounded-b-2xl px-6 py-6 w-[320px] mx-auto mt-4">
          <div className="text-sm font-semibold leading-tight text-left">
            <p>Craving Biryani? Order</p>
            <p>now & feast at home!</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <button 
              className="text-xs underline font-medium"
              onClick={() => navigate('/menu')}
            >
              Explore Menu →
            </button>
            <ShoppingCart size={18} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

// CALL TO ACTION COMPONENT
const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreMenu = () => {
    navigate('/menu');
  };

  return (
    <div className="px-3 py-5">
      {/* Gallery section */}
      <div className="mb-2 space-y-1">
        <img 
          src="/images/bb1.png"
          alt="Biryani served on banana leaf"
          className="w-full h-[240px] object-cover rounded-2xl"
        />
        <img 
          src="/images/bb2.png"
          alt="Large scale biryani cooking"
          className="w-full h-[240px] object-cover rounded-2xl"
        />
        <img 
          src="/images/bb3.png"
          alt="Hot biryani being served"
          className="w-full h-[240px] object-cover rounded-2xl"
        />
      </div>

      {/* Center aligned tagline split into three lines */}
      <div className="text-xl font-kaushan text-black mb-8 leading-relaxed text-center">
        <div>Get your biryani hassle-free—</div>
        <div>no heavy sign-ins,</div>
        <div>just pure indulgence!</div>
      </div>
    </div>
  );
};

// ORDER FORM COMPONENT
const OrderForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    branch: '',
    deliveryTime: '',
    address: '',
    pincode: '',
    landmark: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Navigate to menu preview page after submit
    navigate('/menu-preview');
  };

  return (
    <div id="order-form" className="px-8 py-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <div className="text-black mb-2">
            Full Name <span className="text-[firebrick]">*</span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-black mb-2">
            Phone Number <span className="text-[firebrick]">*</span>
          </div>
          <div className="relative">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-black mb-2">
            Select the nearest branch
          </div>
          <div className="relative">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none appearance-none"
            >
              <option value="">Select</option>
              <option value="downtown">Downtown</option>
              <option value="uptown">Uptown</option>
              <option value="suburban">Suburban</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">▼</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-black mb-2">
            Select Delivery Time
          </div>
          <div className="relative">
            <input
              type="datetime-local"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your delivery time"
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-black mb-2">
            Address <span className="text-[firebrick]">*</span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your Address"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="text-black mb-2">
            Pincode <span className="text-[firebrick]">*</span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your Pincode"
              required
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="text-black mb-2">
            Landmark
          </div>
          <div className="relative">
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full p-2 text-xs text-gray-800 border-b border-gray-900 focus:outline-none"
              placeholder="Enter your Landmark"
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-60 h-12 rounded-full bg-black text-white text-xl font-semibold mx-auto block"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

// FOOTER COMPONENT
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

// MENU COMPONENT - Fixed with proper event handling and slide animation
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
      setIsClosing(true);
      setTimeout(() => {
        onClose();
        navigate(item.href);
      }, 300);
    } else if (item.href.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(item.href);
      if (element) {
        setIsClosing(true);
        setTimeout(() => {
          onClose();
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  };

  return (
    <div 
      className={`absolute top-0 right-0 w-[427px] h-[265px] overflow-hidden shadow-2xl z-[9999] rounded-lg ${
        isClosing ? 'animate-slide-out-right' : 'animate-slide-in-right'
      }`}
      style={{
        backgroundImage: `url('/images/red-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        pointerEvents: 'auto'
      }}
    >
      {/* Close button with improved positioning and event handling */}
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
        <nav className="flex flex-col items-center space-y-2 mt-3 flex-1 justify-center">
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
        <div className="flex justify-center pb-8">
          <img 
            src="/images/bm.png" 
            alt="Biryani" 
            className="w-50 h-40 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

// MOBILE VIEW COMPONENT (MAIN COMPONENT)
const HomePage: React.FC = () => {
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
        <HeroSection />
        <ProductShowcase />
        <CallToAction />
        <OrderForm />
        <Footer />    
        
        {isMenuOpen && <Menu onClose={closeMenu} />}
      </div>
    </div>
  );
};

export default HomePage;