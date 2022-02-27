import { lightInput } from '../classes';
import RoundedButton from '../components/RoundedButton';

export default function Login() {
  return (
    <div 
      className='w-full h-screen flex justify-center items-center p-6 bg-gray-800' 
      style={{ 
        // backgroundImage:'url(https://kinsta.com/wp-content/uploads/2020/04/code-review-tools.png)',
        // backgroundSize:'cover'
      }}
    >
      <div className='w-full sm:w-8/12 md:w-6/12 2xl:w-4/12 rounded flex flex-col'>
        <div className='bg-blue-500 p-4 flex justify-between items-center rounded-t'>
          <h1 className='text-white font-semibold text-xl'>Iniciar sesión</h1>
        </div>
        <div className='bg-white p-6 rounded-b flex flex-col'>  
          <LoginForm/>
        </div>
      </div>
    </div>
  )
}

function LoginForm () {
  return (
    <>
      <label>Correo</label>   
      <input className={`${lightInput} mb-4`}/>
      <label>Contraseña</label> 
      <input className={`${lightInput} mb-6`}/> 
      <RoundedButton 
        color='blue-500' 
        text='Iniciar sesión'
        style={{ alignSelf:'start' }}
      />
    </>
  )
}