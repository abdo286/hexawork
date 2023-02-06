import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Loading from "./Pages/Loading";
import { lazy, Suspense } from "react";
// import Error from "./Pages/Error";
import { Book, Features, NotFound } from "./Pages";

const About = lazy(() => import("./Pages/About"));
const Account = lazy(() => import("./Pages/Account"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const ForgetPassword = lazy(() => import("./Pages/ForgetPassword"));
const Pricing = lazy(() => import("./Pages/Pricing"));
const Profile = lazy(() => import("./Pages/Profile"));
const SignUp = lazy(() => import("./Pages/SignUp"));
const SinIn = lazy(() => import("./Pages/SinIn"));
const AddBook = lazy(() => import("./Pages/AddBook"));
const AddCategory = lazy(() => import("./Pages/AddCategory"));
const Category = lazy(() => import("./Pages/Category"));
const Header = lazy(() => import("./Components/Header"));
const Footer = lazy(() => import("./Components/Footer"));

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Header />
                <Dashboard />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-category"
            element={
              <ProtectedRoute>
                <Header />
                <AddCategory />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="add-book"
            element={
              <ProtectedRoute>
                <Header />
                <AddBook />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="pricing"
            element={
              <ProtectedRoute>
                <Header />
                <Pricing />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="features"
            element={
              <ProtectedRoute>
                <Header />
                <Features />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="about"
            element={
              <ProtectedRoute>
                <Header />
                <About />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Category />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="categories/:categoryId/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Book />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="sign-in" element={<SinIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Header />
                <Account />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile/:id"
            element={
              <ProtectedRoute>
                <Header />
                <Profile />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer position="top-center" className="z-[1000000000000]" />
      </Suspense>
    </div>
  );
};

export default App;
