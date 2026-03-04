# Skill Capsule Marketplace

A modern, professional SaaS platform for buying and learning from micro-learning capsules (PDFs, videos, roadmaps). Built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Authentication
- ✅ Login with email/password
- ✅ Registration with profile avatar upload
- ✅ Google OAuth simulation
- ✅ Demo credentials for testing
- ✅ Password management
- ✅ Protected routes

### Dashboard
- ✅ Professional SaaS layout with sidebar and navbar
- ✅ User statistics (purchases, hours learned, certificates)
- ✅ Recently purchased capsules
- ✅ Recommended capsules
- ✅ Responsive design

### Capsule Marketplace
- ✅ Browse 15+ curated skill capsules
- ✅ Advanced filtering (category, level, search)
- ✅ Multiple sorting options
- ✅ Detailed capsule pages with curriculum
- ✅ Ratings and reviews
- ✅ Instructor profiles

### Payment Flow
- ✅ Complete checkout form
- ✅ Order summary
- ✅ Coupon code support (try: SAVE20)
- ✅ Tax calculation
- ✅ Payment success page
- ✅ Invoice download simulation

### Learning Experience
- ✅ My Capsules library
- ✅ Interactive learning viewer
- ✅ Module-by-module progress tracking
- ✅ Video and PDF content simulation
- ✅ Mark modules as complete
- ✅ Overall progress calculation

### Progress Tracking
- ✅ Visual analytics dashboard
- ✅ Weekly learning hours chart
- ✅ Capsule status pie chart
- ✅ Completion rate tracking
- ✅ Recent activity timeline

### Profile & Settings
- ✅ Profile management
- ✅ Password change
- ✅ Connected accounts (Google)
- ✅ Payment history
- ✅ Invoice downloads

## 🎨 Design Features

- **Modern UI**: Clean, professional SaaS design
- **Custom Color Palette**: Primary blues and accent purples
- **Typography**: Outfit (display) + Inter (body) + JetBrains Mono (code)
- **Animations**: Smooth page transitions and hover effects
- **Responsive**: Mobile-first design approach
- **Accessibility**: Semantic HTML and ARIA labels

## 📦 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Recharts** - Charts and analytics
- **LocalStorage** - Data persistence

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Steps

1. **Extract the project**
   ```bash
   cd skill-capsule-marketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔐 Demo Credentials

Use these credentials to test the application:

```
Email: demo@skillcapsule.com
Password: password123
```

Or click "Continue with Google" for Google OAuth simulation.

## 📁 Project Structure

```
skill-capsule-marketplace/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   └── CapsuleCard.jsx
│   ├── context/          # React Context providers
│   │   └── AuthContext.jsx
│   ├── data/             # Mock data
│   │   └── mockData.js
│   ├── layout/           # Layout components
│   │   ├── DashboardLayout.jsx
│   │   ├── Sidebar.jsx
│   │   └── Navbar.jsx
│   ├── pages/            # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ExploreCapsules.jsx
│   │   ├── CapsuleDetails.jsx
│   │   ├── Payment.jsx
│   │   ├── PaymentSuccess.jsx
│   │   ├── MyCapsules.jsx
│   │   ├── Progress.jsx
│   │   ├── Payments.jsx
│   │   └── ProfileAndLearn.jsx
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🎯 Key Features Explained

### Authentication Flow
1. User lands on Login page
2. Can login with demo credentials or Google
3. Upon successful auth, redirected to Dashboard
4. All routes are protected - redirects to login if not authenticated

### Purchase Flow
1. Browse capsules in Explore page
2. Click on capsule to view details
3. Click "Buy Now" to go to payment page
4. Fill billing info and apply coupon (SAVE20)
5. Proceed to payment (simulated)
6. Success page with invoice download
7. Capsule appears in "My Capsules"

### Learning Flow
1. Go to "My Capsules"
2. Click "Continue Learning" on any purchased capsule
3. View module list with progress
4. Watch/read content (simulated)
5. Mark modules as complete
6. Progress automatically tracked

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
colors: {
  primary: { ... },  // Main brand color
  accent: { ... },   // Secondary accent
  neutral: { ... }   // Grays
}
```

### Mock Data
Add/edit capsules in `src/data/mockData.js`:
```js
export const mockCapsules = [
  {
    id: 1,
    title: "Your Capsule Title",
    // ... other properties
  }
]
```

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway (Razorpay/Stripe)
- [ ] Video player integration
- [ ] PDF viewer integration
- [ ] Real-time notifications
- [ ] Email service integration
- [ ] Advanced analytics
- [ ] Social sharing
- [ ] Wishlist feature
- [ ] Reviews and ratings system

## 🤝 Contributing

This is a frontend prototype. To integrate with a backend:

1. Replace localStorage with API calls in `AuthContext.jsx`
2. Add API endpoints for capsules, payments, progress
3. Integrate real payment gateway
4. Add video/PDF hosting service
5. Implement email notifications

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Developer

Built with ❤️ using React, Vite, and Tailwind CSS

---

**Note**: This is a frontend-only prototype. All data is stored in browser localStorage and will be cleared when you clear browser data. For production use, integrate with a proper backend API and database.
