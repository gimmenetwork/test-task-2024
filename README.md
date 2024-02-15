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


# Screenshots of the project

### HomePage
<img width="1430" alt="Screenshot 2024-02-15 at 3 43 48 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/60d7c272-ab9b-4b63-a14f-d711cc36c3c5">

<img width="1434" alt="Screenshot 2024-02-15 at 3 44 12 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/d63ee80d-0688-40dc-9484-282bb04d42cd">

<img width="1421" alt="Screenshot 2024-02-15 at 3 44 45 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/711e8374-f853-4c53-85bd-fa0049659b48">

<img width="1424" alt="Screenshot 2024-02-15 at 3 45 08 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/965c3425-ee23-4150-86fe-b594f808e307">

<img width="1429" alt="Screenshot 2024-02-15 at 3 45 34 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/7c6bd55e-31b8-47b8-a01b-f8c809fba059">

### LoginPage
<img width="1418" alt="Screenshot 2024-02-15 at 3 48 30 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/dea21140-93d2-433e-b96a-903c63b1c7fa">

### SignUpPage
<img width="1432" alt="Screenshot 2024-02-15 at 3 48 51 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/fc617b78-193e-4872-8362-888abcbbe76e">

### Dashboard Pannel
<img width="1425" alt="Screenshot 2024-02-15 at 3 50 17 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/d7bf71dd-9b7e-4520-8720-17a62342fa23">

<img width="1424" alt="Screenshot 2024-02-15 at 3 50 43 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/54ee2b86-37d5-4ae6-b654-2474a7383b26">

### Logout Window
<img width="1427" alt="Screenshot 2024-02-15 at 3 51 17 AM" src="https://github.com/hi-malik/test-task-2024/assets/65464676/3ec16bd4-0647-4348-b5a2-cc764e09f386">


# Architecture
```
┌────────────┐
│   React    │──────────────────┐
└────────────┘                  │
        │                       │
┌────────────┐          ┌─────────────────┐
│    Yarn    │          │  TailwindCss    │
└────────────┘          └─────────────────┘
        │                       │
┌────────────┐          ┌─────────────────┐
│   Redux    │──┐       │  flowbite-react │
└────────────┘  │       └─────────────────┘
        │       │               │
        │  ┌───────────────┐    │
        └─►│redux-persist  │    │
           └───────────────┘    │
        │                       │
┌──────────────┐       ┌─────────────────┐
│ React Router │       │      Vite       │
└──────────────┘       └─────────────────┘
        │                       │
        │               ┌────────────┐
        │               │  firebase  │
        │               └────────────┘
        │                       │
        │               ┌────────────┐
        └──────────────►│   swiper   │
                        └────────────┘
```

```
┌──────────┐
│ Node.js  │────────────┐
└──────────┘            │
        │               │
┌──────────┐    ┌────────────┐
│  Express │    │ MongoDB    │
└──────────┘    │   Atlas    │
        │       └────────────┘
        │               │
        │       ┌────────────┐
        └──────►│  mongoose  │
                └────────────┘
        │               │
┌───────────────┐┌────────────┐
│JSON Web Tokens││  Bcrypt    │
└───────────────┘└────────────┘

```
 
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
