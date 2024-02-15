# E-Book Reading WebApp

- Frontend
  - ```React```
  - Yarn
  - TailwindCss
  - Redux (redux-persist)
  - React Router
  - Vite
  - firebase
  - swiper
  - flowbite-react

- Backend
  - ```Node.js```
  - ```Express```
  - ```MongoDB Atlas (mongoose)```
  - JSON Web Tokens
  - Bcrypt
 
# Application Structure

## FrontEnd 

```
client
├── public
│   └── vite.svg
src
├── assets
│   ├── banner-books
│   │   ├── awardbooks.png
│   │   └── book.webp
│   ├── facebook-logo.svg
│   ├── favoritebook.jpg
│   ├── github-cover.jpg
│   ├── google-logo.svg
│   ├── profile.jpg
│   └── react.svg
├── components
│   ├── About.jsx
│   ├── Banner.jsx
│   ├── Blog.jsx
│   ├── BookCards.jsx
│   ├── Login.jsx
│   ├── Logout.jsx
│   ├── Navbar.jsx
│   ├── Signup.jsx
│   └── SingleBook.jsx
├── contexts
│   └── AuthProvider.jsx
├── dashboard
│   ├── Dashboard.jsx
│   ├── DashboardLayout.jsx
│   ├── DashboardSideBar.jsx
│   ├── EditBooks.jsx
│   ├── ManageBook.jsx
│   └── UploadBook.jsx
├── firebase
│   └── firebase.config.js
├── home
│   ├── BannerCard.css
│   ├── BannerCard.jsx
│   ├── BestSellerBooks.jsx
│   ├── FavBook.jsx
│   ├── Footer.jsx
│   ├── Home.jsx
│   ├── OtherBooks.jsx
│   ├── PromoBanner.jsx
│   └── Testimonials.jsx
├── PrivateRoute
│   └── PrivateRoute.jsx
├── routers
│   └── router.jsx
└── shop
│   ├── Shop.jsx
│   └── SingleBook.jsx
├── .eslintrc.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Backend

```
server
├── node_modules
├── .gitignore
├── index.js
├── package-lock.json
└── package.json
```

## Running the Frontend
1. Clone the repo\
`git clone https://github.com/hi-malik/test-task-2024/`

2. CD into repo\
`cd client`

3. Install npm packages\
`npm i`
or
`yarn dev`

5. Start website\
`npm run dev`

## Running the Backend
1. Clone the repo\
`git clone https://github.com/hi-malik/test-task-2024/`

2. CD into repo\
`cd server`

3. Install npm packages\
`npm i`

5. Start server\
`npm start`
