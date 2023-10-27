import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='header'>

        </div>
        <div className='pages'>
          <Routes>
            <Route
              path = '/'
              element = {<Login/>}
            />
          </Routes>
        </div>
        <div className='footer'>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
