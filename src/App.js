import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'
import PlaidAPI from './pages/PlaidAPI';
import HomePage from './pages/HomePage';
import SignIn from './pages/authentication/SignIn';
import SignUp from './pages/authentication/SignUp';
import { useAuthContext } from './hooks/useAuthContext';

function App() {

  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path = '/plaidAPI'
              element={user ? <PlaidAPI /> : <Navigate to='/' /> }
            />
            <Route
              path = '/homePage'
              element = {user ? <HomePage/> : <Navigate to='/'/>}
            />
            <Route
              path = '/signup'
              element={!user ? <SignUp /> : <Navigate to='/plaidAPI' />}
            />
            <Route
              path = '/'
              element = {!user? <SignIn/>:<Navigate to='/homePage' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
