# E-Commerce Frontend

A modern, professional e-commerce frontend built with React, Vite, and Tailwind CSS.

## Features

### Professional Navbar

- **Responsive Design**: Fully responsive with mobile-first approach
- **User Authentication**: Login/logout functionality with user dropdown menu
- **Shopping Cart**: Real-time cart count with local storage persistence
- **Wishlist**: Wishlist functionality with item count display
- **Product Search**: Integrated search bar for product discovery
- **Category Navigation**: Organized product categories with hover effects
- **Mobile Menu**: Collapsible hamburger menu for mobile devices

### Technical Stack

- **React 18** with modern hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Icons** for consistent iconography
- **Context API** for state management

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Navbar Features

### Desktop Features

- Logo with hover animation
- Search bar with integrated search button
- User account dropdown (Sign In / Account options)
- Wishlist with item count badge
- Shopping cart with item count badge
- Category navigation bar

### Mobile Features

- Hamburger menu toggle
- Collapsible category menu
- Mobile-optimized search bar
- Simplified icon layout
- Touch-friendly interactions

### State Management

- **AuthContext**: Handles user authentication state
- **CartContext**: Manages shopping cart and wishlist with localStorage persistence

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Professional navbar component
│   ├── ui/
│   │   └── InputField.jsx  # Reusable input component
│   └── ...
├── context/
│   ├── AuthContext.jsx     # Authentication state management
│   └── CartContext.jsx     # Cart and wishlist state management
├── pages/
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   └── ...
└── ...
```

## Customization

The navbar is highly customizable. Key areas you can modify:

- **Colors**: Update Tailwind classes in the component
- **Categories**: Modify the `categories` array
- **Icons**: Change icons from React Icons library
- **Routes**: Update NavLink destinations
- **Styling**: Adjust Tailwind classes for different themes

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
