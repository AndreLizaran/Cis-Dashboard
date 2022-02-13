// Modules
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Screens
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

