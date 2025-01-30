import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./contexts/Context";
import Course from "./pages/Course";
import SignUp from "./pages/auth pages/signup";
import SignIn from "./pages/auth pages/signin";

// border border-black
// import Profile from './pages/profile/Profile';
// import Footer from './components/layout/footer';
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import Enrollment from "./pages/Enrollment";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./utils/ProtectRoute";

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          
            <Route element={<MainLayout />}>
            <Route path="/" element={ <ProtectedRoute><Course /></ProtectedRoute>} />
              <Route path="/enrollment" element={<ProtectedRoute><Enrollment /></ProtectedRoute>} />
            </Route>
          

          <Route element={<AuthLayout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Route>
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* <Footer /> */}
      </BrowserRouter>
    </Provider>
  );
}

export default App;
