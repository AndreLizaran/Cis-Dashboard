import { lightInput } from '../classes';
import RoundedButton from '../components/simple/RoundedButton';

export default function Login() {
  return (
    <div className='w-full h-screen bg-gray-800 flex justify-center items-center p-6'>
      <div className='w-full sm:w-8/12 md:w-6/12 xl:w-4/12 rounded flex flex-col'>
        <div className='bg-purple-600 p-4 flex justify-between items-center rounded-t'>
          <h1 className='text-white font-semibold text-xl'>Iniciar sesión</h1>
        </div>
        <div className='bg-white p-4 rounded-b flex flex-col'>  
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
      <input className={lightInput}/>
      <label>Contraseña</label> 
      <input className={`${lightInput} mb-4`}/> 
      <RoundedButton 
        color='purple-600' 
        text='Iniciar sesión'
        style={{ alignSelf:'start' }}
      />
    </>
  )
}