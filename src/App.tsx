// Modules
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

// Screens
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useGetData } from './hooks/useGetData';
import { useEffect } from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

function AppRouter () {

  const navigation = useNavigate();
  const { useValidateToken } = useGetData();
  const { mutateAsync, isLoading } = useValidateToken();

  useEffect(() => {
    validateToken();
  }, [])

  async function validateToken () {
    const token = localStorage.getItem('cis-dashboard-token');
    if (!token) {
      navigation('/login');
      return;
    }
    try {
      // const { data } = await mutateAsync(token);
    } catch (error:any) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center w-full h-screen bg-gray-800'>
        <FontAwesomeIcon icon={faSpinner} className='fa-spin text-white' fontSize={30}/>
      </div>
    )
  } else {
    return (
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    )
  }
  
}

