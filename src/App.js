import {HashRouter, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated/Authenticated';
import Dashboard from './components/Authenticated/Dashboard/Dashboard';
import { AuthProvider } from './components/Context/AuthContext';
import ForgotPassword from './components/Unauthenticated/ForgotPassword/ForgotPassword';
import Landing from './components/Unauthenticated/Landing/Landing';
import Login from './components/Unauthenticated/Login/Login';
import Generalinfo from './components/Unauthenticated/Signup/Generalinfo';
import Setpassword from './components/Unauthenticated/Signup/Setpassword';
import Signup from './components/Unauthenticated/Signup/Signup';

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="App">
          <Routes>

            {/* Validated */}

            <Route path='/' element={
            <Authenticated>
              <Dashboard />
            </Authenticated>
            } />
            <Route path='/folder/:folderId' element={
            <Authenticated>
              <Dashboard />
            </Authenticated>
            } />

            {/* SignUp */}
            <Route path='/info' element={
              <Signup>
                <Generalinfo />
              </Signup>
            } />

            <Route path='/setpassword' element={
              <Signup>
                <Setpassword />
              </Signup>
            } />

            {/* Login */}
            <Route path='/login' element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />

            {/* LandingPage */}
            <Route path='/landing' element={<Landing />} />
            

          </Routes>
        </div>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
