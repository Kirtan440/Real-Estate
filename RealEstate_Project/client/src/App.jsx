import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';
import AdminSignIn from './pages/AdminSignin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter >
    <Header/>
      <Routes>
        <Route path='/' element= {<Home />}/> 
        <Route path='/sign-in' element= {<Signin />}/> 
        <Route path='/sign-up' element= {<SignUp />} /> 
        <Route path='/about' element= {<About />}/> 
        <Route path='/search' element= {<Search />}/> 
        <Route path='/listing/:listingId' element= {<Listing />}/> 
        <Route element= {<PrivateRoute />}> 
          <Route path='/profile' element= {<Profile />}/> 
          <Route path='/create-listing' element= {<CreateListing />}/> 
          <Route path='/update-listing/:listingId' element= {<UpdateListing />}/> 
        </Route>
        <Route path='/admin' element={<AdminSignIn/>} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}
