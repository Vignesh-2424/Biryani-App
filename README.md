# 🍛 Biryani World – Mobile-First React Frontend

A beautiful, responsive, mobile-first **Biryani App** built with **React**, styled using **Tailwind CSS**, and packed with animations, a rich menu, and interactive navigation. Designed to give users a delightful mobile food experience.

---

## 📱 Features

- ✅ Mobile-optimized UI (430px viewport max)
- 📜 Smooth animated slide-in side menu
- 🧭 Navigation buttons: Home, Menu, Contact Us
- 📷 Animated visual effects (`balls.gif`, `red-bg`, etc.)
- 🔁 React portal-based overlay rendering
- 🎨 Rich visuals and typography using Tailwind
- 📞 Footer with contact info and social icons

---

## 🧱 Tech Stack

| Tech              | Usage                        |
|------------------|------------------------------|
| **React**        | Component-based frontend     |
| **TypeScript / JS** | Strongly typed components    |
| **Tailwind CSS** | Styling and layout           |
| **Lucide Icons** | Social icons (Facebook, etc) |
| **React Router** | Navigation between pages     |
| **React Portal** | Menu overlay management      |

---

## 📁 Folder Structure

```
biryani-app/
├── public/
│   ├── images/
│   │   ├── red-bg.png
│   │   ├── red-bg.jpg
│   │   ├── bm.png
│   │   └── balls.gif
├── src/
│   ├── FinalPage.tsx   # Main page (component you shared)
│   ├── index.css       # Tailwind CSS + custom styles
│   ├── App.tsx
│   └── ...             # Other components
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🚀 Quick Start

### 1. Clone and install dependencies

```bash
git clone https://github.com/your-username/biryani-app
cd biryani-app
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or as shown) to see the app in your browser.

---

## 📸 UI Overview

### 🔻 Header
- Branding (`Biriyani World`)
- Language picker (EN)
- Red background image
- Hamburger menu icon (☰)

### 📋 Slide-In Menu
- Smooth animated right panel
- Buttons: Home, Menu, Contact Us
- Bottom image of biryani plate

### 🎯 Main Section
- Heading: "One step closer to biryani bliss"
- Subtext about confirmation call
- Orange bouncing balls GIF

### 🔚 Footer
- Quick links (Home, About Us, Contact Us)
- Brand text and contact number
- Social icons (Facebook, Twitter, Instagram)

---

## 📦 Dependencies

```bash
npm install react react-dom react-router-dom lucide-react
```

For Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then configure `tailwind.config.js` and include Tailwind in `index.css`.

---

## 💡 Tips

- Place all images in `/public/images/`
- You can easily change the max-width for mobile responsiveness by adjusting `max-w-[430px]` in the container
- Update social links and contact info in the `<Footer />` component
- Add new pages (`/menu`, `/about`) using React Router if needed

---

## 📄 License

MIT – use it freely, customize for your biryani startup or restaurant.

---

## 👨‍🍳 Author

Made with 🌶️ and 🍚 by **Vignesh R.S**

---



Add link once deployed (e.g., Netlify, Vercel):
link to view the full app
```
https://biryani-app.vercel.app/        
```

---

example in  desktop view
<img width="300" height="600" alt="image" src="https://github.com/user-attachments/assets/45ce7e68-63db-4c74-b66a-5e07dd327048" />


