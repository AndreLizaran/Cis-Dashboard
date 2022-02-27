// Modules
import { useState } from 'react';

// Classes
import { lightInput } from '../classes';

// Components
import RoundedButton from '../components/RoundedButton';

// Hooks
import useFormValues from '../hooks/useFormValues';
import { useGetData } from '../hooks/useGetData';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  return (
    <div className='w-full h-screen flex justify-center items-center p-6 bg-gray-800'>
      <div className='w-full sm:w-8/12 md:w-6/12 2xl:w-4/12 rounded flex flex-col'>
        <div 
          className='p-6 py-8 flex justify-between items-center rounded-t' 
          style={{ 
            backgroundImage:'url(https://www.elegantthemes.com/blog/wp-content/uploads/2019/01/web-design-blog.png)',
            backgroundSize:'cover'
          }}
        >
          <h1 className='text-white font-semibold text-xl'>CIS Dashboard</h1>
        </div>
        <div className='bg-white p-6 rounded-b flex flex-col'>  
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

const initialState = {
  email:'andrelizaran@gmail.com',
  password:'12345678'
}

function LoginForm () {

  const { inputValues, handleInputs } = useFormValues(initialState);
  const [errorInputs, setErrorInputs] = useState({ errorEmail:'', errorPassword:'' });
  const { errorEmail, errorPassword } = errorInputs;
  const { email, password } = inputValues;
  const { useLoginUser } = useGetData();
  const { mutateAsync, isLoading } = useLoginUser();
  const [error500, setError500] = useState(false);
  const navigation = useNavigate();

  function login () {
    if (!validateInformation()) return;
    try {
      // mutateAsync(inputValues);
      localStorage.setItem('cis-dashboard-token', 'token-super-secreto');
      navigation('/');
    } catch (error:any) {
      setError500(true);
    }
  }

  function ErrorAlert () {
    return (
      <div className='px-4 py-3 bg-red-500 text-white mb-4 rounded text-center'>
        <span>Algo a salido mal, inténtalo más tarde</span>
      </div>
    )
  }

  function validateInformation () {
    if (!email && !password) {
      setErrorInputs({ 
        errorPassword:'No has ingresado información', 
        errorEmail:'No has ingresado información' 
      });
      cleanErrors();
      return false;
    }   
    if (!email) {
      setErrorInputs({ 
        ...errorInputs,
        errorEmail:'No has ingresado información' 
      });
      cleanErrors();
      return false;
    }
    if (!password) {
      setErrorInputs({ 
        ...errorInputs,
        errorPassword:'No has ingresado información' 
      });
      cleanErrors();
      return false;
    }
    if (password.length < 8) {
      setErrorInputs({ ...errorInputs, errorPassword:'La contraseña debe ser mayor igual a 8 caracteres'});
      cleanErrors();
      return false;
    }
    return true;
  }

  function cleanErrors () {
    setTimeout(() => {
      setErrorInputs({ errorEmail:'', errorPassword:'' })
    }, 3000);
  }

  return (
    <form className='flex flex-col' onSubmit={(e) => { e.preventDefault(); login(); }}>
      {error500 && <ErrorAlert/>}
      <label>Correo</label>   
      <input 
        className={`${lightInput}`} 
        value={email} 
        onChange={handleInputs} 
        autoComplete='off' 
        type='email'
        name='email'
        disabled={isLoading}
      />
      {errorEmail && <small className='text-red-500 mt-1'>{errorEmail}</small>}
      <label className='mt-4'>Contraseña</label> 
      <input 
        className={`${lightInput}`} 
        value={password} 
        onChange={handleInputs} 
        autoComplete='off'
        type='password'
        name='password'
        disabled={isLoading}
      /> 
      {errorPassword && <small className='text-red-500 mt-1'>{errorPassword}</small>}
      <RoundedButton 
        color='blue-500' 
        text='Iniciar sesión'
        style={{ alignSelf:'start' }}
        type='submit'
        className='mt-6'
        isLoading={isLoading}
      />
    </form>
  )
}