import React, { useState } from 'react';
import { Calendar, Facebook, Twitter, Instagram, Plus, Minus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import './index.css';

// PORTAL COMPONENT
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

// Header Component
const Header: React.FC<{ onMenuClick?: () => void }> = ({ onMenuClick }) => {
  return (
    <header className=" bg-[url('/images/red-bg.png')]">
      <h1 className="text-4xl font-bold text-amber-400 font-['Kaushan_Script'] text-center">
      </h1>
    </header>
  );
};

// Hero Component
interface HeroProps {
  onOrderClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <div className="relative bg-[url('/images/red-bg.png')] bg-cover px-2 pt-2 pb-0">
      {/* Biryani World Title */}
      <div className="text-center pt-2">
        <h1
          className="text-amber-400 text-4xl font-bold"
          style={{
            fontFamily: 'Kebagraph',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Biryani World
        </h1>
      </div>

      {/* Hero Text */}
      <div className="text-white font-['Kaushan_Script'] text-4xl leading-snug mb-2 z-50 relative text-left mt-10 px-4 space-y-2">
        <div>Hosting a feast?</div>
        <div>Get your favorite</div>
        <div><span className="text-amber-400">Biryani in bulk</span></div>
        <div>and serve up</div>
        <div>smiles!</div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-10 bg-white z-0"></div>

      {/* Biryani Bowls Section */}
      <div className="relative h-[420px] w-full flex justify-center items-end mt-2">
        {/* Back row bowls */}
        <img
          src="/images/biryanibowls.png"
          alt="Back Left Bowl"
          className="absolute bottom-40 left-1/2 transform -translate-x-[110%] w-[230px] z-20 opacity-100"
        />
        <img
          src="/images/biryanibowls.png"
          alt="Back Right Bowl"
          className="absolute bottom-40 transform translate-x-[60%] w-[230px] z-20 opacity-100"
        />

        {/* Middle row bowls */}
        <img
          src="/images/biryanibowls.png"
          alt="Middle Left Bowl"
          className="absolute bottom-18 left-1/2 transform -translate-x-[90%] w-[360px] z-10 opacity-100"
        />
        <img
          src="/images/biryanibowls.png"
          alt="Middle Right Bowl"
          className="absolute bottom-18 transform translate-x-[30%] w-[360px] z-10 opacity-100"
        />

        <img
          src="/images/biryanibowls.png"
          alt=" above Center Bowl"
          className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-[270px] z-30"
        />

        {/* Front center bowl - Enlarged */}
        <img
          src="/images/biryanibowls.png"
          alt="Center Bowl"
          className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 w-[380px] z-40"
        />
      </div>
    </div>
  );
};

// MenuItem Component
interface ComboItem {
  name: string;
  quantity: number;
}

interface MenuItemProps {
  item: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    minOrder: number;
    comboItems?: ComboItem[];
  };
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, quantity, onQuantityChange }) => {
  const { name, price, image, description, minOrder, comboItems } = item;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-visible pb-10 relative">
      <div className="p-4 flex flex-col h-full">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>

        <div className="flex">
          <div className="w-2/5 pr-2">
            <p className="text-[11px] mb-2 leading-tight">{description}</p>

            {comboItems && (
              <div className="mt-2 text-xs">
                {comboItems.map((comboItem, index) => (
                  <div key={index} className="flex justify-between mb-1">
                    <span>{comboItem.name}</span>
                    <span>X{comboItem.quantity}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-base font-semibold pt-3">Rs.{price.toFixed(2)}</p>
          </div>

          <div className="w-3/5 flex justify-center items-center">
            <img
              src={image}
              alt={name}
              className="object-cover h-44 w-44 rounded-full shadow"
            />
          </div>
        </div>

        <p className="text-xs text-red-600 font-medium mt-4 text-center">
          Min. order Qty.-{minOrder}
        </p>
      </div>

      {/* ✅ Quantity controls positioned like the sample */}
      <div className="bg-black text-white rounded-full flex justify-between items-center w-[60%] mx-auto px-5 py-3 -mb-4 absolute left-1/2 transform -translate-x-1/2 bottom-0 shadow-md">
        <button
          onClick={() => onQuantityChange(quantity - 1)}
          className="text-white font-semibold text-xl w-8 h-8 flex items-center justify-center focus:outline-none"
          aria-label="Decrease quantity"
        >
          <Minus size={20} />
        </button>
        <span className="font-semibold text-sm">{quantity}</span>
        <button
          onClick={() => onQuantityChange(quantity + 1)}
          className="text-white font-semibold text-xl w-8 h-8 flex items-center justify-center focus:outline-none"
          aria-label="Increase quantity"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

// MenuItems Component
interface MenuItemData {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  minOrder: number;
  comboItems?: { name: string; quantity: number }[];
}

interface MenuItemsProps {
  menuItems: MenuItemData[];
  cartItems: Record<string, number>;
  onQuantityChange: (name: string, quantity: number) => void;
}

const MenuItems: React.FC<MenuItemsProps> = ({ 
  menuItems, 
  cartItems, 
  onQuantityChange 
}) => {
  return (
    <div className="px-4 py-6 bg-white">
      <div className="space-y-6">
        {menuItems.map(item => (
          <MenuItem
            key={item.id}
            item={item}
            quantity={cartItems[item.name]}
            onQuantityChange={(newQuantity) => onQuantityChange(item.name, newQuantity)}
          />
        ))}
      </div>
    </div>
  );
};

// OrderSummary Component
interface OrderSummaryProps {
  cartItems: Record<string, number>;
  menuItems: any[];
  subtotal: number;
  deliveryCharge: number;
  total: number;
  onQuantityChange: (name: string, quantity: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  cartItems,
  menuItems,
  subtotal,
  deliveryCharge,
  total,
  onQuantityChange
}) => {
  // Filter out items with quantity > 0
  const itemsInCart = Object.entries(cartItems)
    .filter(([_, quantity]) => quantity > 0)
    .map(([name, quantity]) => {
      const menuItem = menuItems.find(item => item.name === name);
      return {
        name,
        quantity,
        price: menuItem ? menuItem.price : 0
      };
    });

  const hasItems = itemsInCart.length > 0;

  return (
    <div className="bg-white p-4 mt-6">
      {hasItems ? (
        <>
          <div className="space-y-4 mb-4">
            {itemsInCart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{item.name}</span>
                <div className="flex items-center space-x-4">
                  <div className="border border-black rounded-sm flex items-center">
                    <button 
                      onClick={() => onQuantityChange(item.name, item.quantity - 1)}
                      className="px-1 py-0.5"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      onClick={() => onQuantityChange(item.name, item.quantity + 1)}
                      className="px-1 py-0.5"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-sm">Rs.{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 border-t border-gray-300">
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>Rs.{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Delivery Charges</span>
              <span>Rs.{deliveryCharge}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-400 flex justify-between mt-2">
              <span className="text-xs font-medium">Total</span>
              <span className="text-xs font-medium">Rs.{total.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="mt-5 flex justify-center">
            <button 
              onClick={() => {
                const checkoutForm = document.getElementById('checkout-form');
                if (checkoutForm) {
                  checkoutForm.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-black text-white font-semibold py-3 px-10 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105"
            >
              Order
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-6 text-gray-500">
          Your cart is empty. Add items to see order summary.
        </div>
      )}
    </div>
  );
};

// CheckoutForm Component - Updated with required fields
interface CheckoutFormProps {
  cartItems: Record<string, number>;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, total }) => {
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to review page with cart and form data
    navigate('/review', {
      state: {
        cartItems,
        formData,
        orderTotal: total
      }
    });
  };

  return (
    <div className="bg-white p-6" id="checkout-form">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Full Name <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Phone Number <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Select the nearest branch
          </label>
          <div className="relative">
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black appearance-none bg-transparent"
            >
              <option value="" disabled>Select</option>
              <option value="downtown">Downtown</option>
              <option value="uptown">Uptown</option>
              <option value="midtown">Midtown</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Select Delivery Time
          </label>
          <div className="relative">
            <input
              type="datetime-local"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black pr-8"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Address <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your Address"
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Pincode <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter your Pincode"
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-gray-900">
            Landmark
          </label>
          <div className="relative">
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Enter your Landmark"
              className="w-full py-2 text-sm border-b border-gray-800 focus:outline-none focus:border-black"
            />
          </div>
        </div>
        
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="bg-black text-white font-semibold py-3 px-12 rounded-full hover:bg-opacity-90 transition-transform hover:scale-105"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

// MenuPopup Component - Updated slideshow style
interface MenuPopupProps {
  onClose: () => void;
}

const MenuPopup: React.FC<MenuPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 w-full h-[70vh] rounded-b-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 ease-out animate-slide-down z-50"
      style={{
        backgroundImage: `url('/images/red-bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        animation: 'slideDown 0.3s ease-out'
      }}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-amber-400 hover:text-amber-300 transition-colors z-10"
        aria-label="Close menu"
      >
        <X size={30} />
      </button>
      
      <nav className="flex flex-col items-center justify-center h-80 space-y-12 pt-16">
        <a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            onClose();
          }}
          className="text-2xl font-medium text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          Home
        </a>
        <a 
          href="/menu"
          onClick={(e) => {
            e.preventDefault();
            navigate('/menu');
            onClose();
          }}
          className="text-2xl font-medium text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          Menu
        </a>
        <a 
          href="#footer"
          onClick={(e) => {
            e.preventDefault();
            const footer = document.getElementById('footer');
            if (footer) {
              onClose();
              setTimeout(() => {
                footer.scrollIntoView({ behavior: 'smooth' });
              }, 300);
            }
          }}
          className="text-2xl font-medium text-white opacity-80 hover:opacity-100 transition-opacity"
        >
          Contact Us
        </a>
      </nav>
      
      <div className="flex justify-center pb-8 mt-8">
        <img 
          src="/images/bm.png" 
          alt="Biryani" 
          className="w-32 h-28 object-contain"
        />
      </div>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <footer id="footer" className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-90" 
        style={{ 
          backgroundImage: "url('/images/red-bg.png')",
        }}
      />
      
      <div className="relative z-10 pt-8 pb-10 text-white text-center">
        <h4 className="text-2xl font-semibold mb-4">Quick Links</h4>
        
        <nav className="flex flex-col items-center space-y-4 mb-8">
          <a 
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="text-xl opacity-80 hover:opacity-100 transition-opacity"
          >
            Home
          </a>
          <a href="#" className="text-xl opacity-80 hover:opacity-100 transition-opacity">About Us</a>
          <a href="#" className="text-xl opacity-80 hover:opacity-100 transition-opacity">Contact Us</a>
        </nav>
        
        <h2 className="text-4xl font-['Kaushan_Script'] text-amber-400 mb-6">Biryani World</h2>
        
        <p className="opacity-70 max-w-xs mx-auto mb-2">
          Barcalys is an all-in-one mobile banking app full of tools.
        </p>
        <p className="opacity-70 mb-8">Phone No: 7451212545</p>
        
        <div className="flex justify-center space-x-6 mb-6">
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all">
            <Facebook size={20} className="text-white" />
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all">
            <Twitter size={20} className="text-white" />
          </button>
          <button className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-full transition-all">
            <Instagram size={20} className="text-white" />
          </button>
        </div>
        
        <p className="text-xs opacity-70">© Biryani Culture all rights reserved</p>
      </div>
    </footer>
  );
};

// Main Menu Page Component
const MenuPage: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState({
    'Chicken Biryani': 0,
    'Mutton Biryani': 0,
    'Plain Biryani': 0,
    'Biryani Combo': 0,
    'Naan': 0
  });
  
  const menuItemsData = [
    {
      id: 1,
      name: 'Chicken Biryani',
      price: 250,
      image: '/images/c.png',
      description: 'Indulge in our aromatic, perfectly spiced Chicken Biryani, made with tender, juicy chicken, fragrant basmati rice, and a blend of rich, handpicked spices.',
      minOrder: 50
    },
    {
      id: 2,
      name: 'Mutton Biryani',
      price: 250,
      image: '/images/m.png',
      description: 'Savor the irresistible taste of our Mutton Biryani, crafted with succulent, slow-cooked mutton, fragrant basmati rice, and a blend of aromatic spices.',
      minOrder: 50
    },
    {
      id: 3,
      name: 'Plain Biryani',
      price: 250,
      image: '/images/p.png',
      description: 'Enjoy the rich aroma and delicate flavors of our perfectly cooked Plain Biryani. Made with premium basmati rice and a blend of fragrant spices.',
      minOrder: 50
    },
    {
      id: 4,
      name: 'Biryani Combo',
      price: 250,
      image: '/images/c.png',
      description: 'Enjoy the ultimate feast with our Biryani Combo! A perfect combination of aromatic biryani, flavorful side dishes, and refreshing raita.',
      minOrder: 50,
      comboItems: [
        { name: 'Bread Halwa', quantity: 1 },
        { name: 'Biryani', quantity: 1 },
        { name: 'Naan', quantity: 2 }
      ]
    },
    {
      id: 5,
      name: 'Naan',
      price: 250,
      image: '/images/n.png',
      description: 'Freshly baked to perfection, our Naan is soft, buttery, and slightly crisp on the edges. Made with the finest ingredients.',
      minOrder: 50
    }
  ];

  // Calculate totals
  const calculateSubtotal = () => {
    return Object.entries(cartItems).reduce((total, [name, quantity]) => {
      const menuItem = menuItemsData.find(item => item.name === name);
      return total + (menuItem ? menuItem.price * quantity : 0);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryCharge = 100;
  const total = subtotal + deliveryCharge;

  const handleQuantityChange = (name: string, newQuantity: number) => {
    if (newQuantity >= 0) {
      setCartItems({
        ...cartItems,
        [name]: newQuantity
      });
    }
  };

  const scrollToOrderForm = () => {
    const orderFormElement = document.getElementById('checkout-form');
    if (orderFormElement) {
      orderFormElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-100">
      {/* Mobile container that maintains mobile view even on desktop */}
      <div className="w-full max-w-[430px] bg-white min-h-screen shadow-lg relative overflow-x-hidden">
        <div className="relative w-full overflow-hidden">
          <div className="relative z-10">
            <Header onMenuClick={() => setMenuOpen(true)} />
            <Hero onOrderClick={scrollToOrderForm} />
          </div>
        </div>
        
        <MenuItems 
          menuItems={menuItemsData} 
          cartItems={cartItems} 
          onQuantityChange={handleQuantityChange} 
        />
        
        <OrderSummary 
          cartItems={cartItems} 
          menuItems={menuItemsData} 
          subtotal={subtotal} 
          deliveryCharge={deliveryCharge} 
          total={total} 
          onQuantityChange={handleQuantityChange}
        />
        
        <div data-scroll-to="getYourBiryani" className="px-8 py-12 text-center">
          <h2 className="text-4xl font-['Kaushan_Script'] leading-relaxed">
            Get your biryani hassle-free—no heavy sign-ins, just pure indulgence!
          </h2>
        </div>
        
        <div id="checkout-form" className="scroll-mt-4">
          <CheckoutForm cartItems={cartItems} total={total} />
        </div>
        
        <Footer />
        
        {isMenuOpen && (
          <Portal>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40\" onClick={() => setMenuOpen(false)}>
              <MenuPopup onClose={() => setMenuOpen(false)} />
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
};

export default MenuPage;