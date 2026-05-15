Amazon_clone — Full Project Description

Amazon_clone is a full-stack e-commerce web application that recreates the experience of a modern marketplace like Amazon.
Architecture
•	Frontend: React + Vite + Tailwind CSS
•	Backend: Express.js + Node.js
•	Database: MongoDB via Mongoose
•	Authentication: JWT-based auth with protected routes
•	API: RESTful endpoints for products, cart, orders, authentication, and chat
Frontend Features
•	Multi-page React application with react-router-dom
•	Product browsing and search
•	Product detail pages
•	Shopping cart and checkout flow
•	User authentication: login, registration, forgot password
•	Protected user areas: profile dashboard, order history, wishlist
•	Site-wide layout with header, footer, and chatbot
•	Static informational pages: About, Contact, FAQ, Terms, Privacy, Returns, Shipping, Careers, Press Releases, Sell, Affiliate, Advertise, Gift Cards, Payment Methods, and more
•	Animated and responsive UI with framer-motion and icon libraries
Backend Features
•	Express API server with these route groups:
o	/api/auth
o	/api/products
o	/api/cart
o	/api/orders
o	/api/chat
•	MongoDB data models for:
o	Users
o	Products
o	Cart items
o	Orders
o	Chat history
o	User preferences
•	Product filtering, sorting, search, categories, and pagination
•	Secure middleware and HTTP headers via helmet
•	CORS support for frontend/backend integration
•	Database seed script to populate initial product data
•	Central error handling and health check endpoint
Key Functionality
•	Full shopping experience: browse, add to cart, checkout
•	User account management and protected shopping flows
•	Product detail retrieval and category listing
•	Admin-style product creation support in the backend
•	Chatbot interaction component integrated into the site
•	Mobile-friendly layout and full UI navigation
Tech Stack
•	Frontend:
o	React 19
o	Vite
o	Tailwind CSS
o	Axios
o	React Router
o	Framer Motion
•	Backend:
o	Node.js
o	Express 5
o	MongoDB / Mongoose
o	JSON Web Tokens
o	bcryptjs
o	express-validator
o	helmet
o	cors
o	dotenv

