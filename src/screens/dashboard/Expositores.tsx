// Modules
import { faPlus, faUpload, faUserCheck } from '@fortawesome/free-solid-svg-icons'

// Components
import H2 from '../../components/H2'
import RoundedButton from '../../components/RoundedButton'
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';

// Hooks
import { useGetExpositores } from '../../hooks/useGetData';
import { useUIContext } from '../../hooks/useCustomContext';

// Classes
import { lightInput } from '../../classes';
import { Expositor } from '../../api';

export default function Expositores() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-between items-center w-full' style={{ overflowY:'hidden' }}>
        <H2>Expositores</H2>
        <RoundedButton
          color='red-600'
          square={true}
          icon={faPlus}
          className={`${!showDashboardBar && 'mr-14'}`}
        />
      </div>
      <div className={`flex flex-col gap-6 ${showDashboardBar ? '2xl:grid 2xl:grid-cols-2' : 'lg:grid lg:grid-cols-2'}`}>
        <InformationContainer
          headerText='Expositores registrados'
          headerColor='bg-gray-800'
          headerIcon={faUserCheck}
        >
          <ExpositoresList/>
        </InformationContainer>
        <InformationContainer
          headerText='Registrar nuevo expositor'
          headerColor='bg-gray-800'
          headerIcon={faPlus}
          maxHeight={false}
        >
          <NewExpositorForm/>
        </InformationContainer>
      </div>
    </div>
  )
}

function NewExpositorForm () {
  return (
    <NewElementForm saveButtonText='Guardar expositor' saveFunction={() => {}}>
      <div className='flex flex-col'>
        <label>Nombre</label>
        <input className={lightInput}/>
      </div>
      <div className='flex flex-col'>
        <label>Descripción</label>
        <input className={lightInput}/>
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de perfil</label>
        <div className='flex gap-6 items-center'>
          <RoundedButton color='blue-500' icon={faUpload} className='w-6/12'/>
          <small className='w-6/12'>No has seleccionado algún archivo</small>
        </div>
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de portada</label>
        <div className='flex gap-6 items-center'>
          <RoundedButton color='blue-500' icon={faUpload} className='w-6/12'/>
          <small className='w-6/12'>No has seleccionado algún archivo</small>
        </div>
      </div>
    </NewElementForm>
  )
}

function ExpositoresList () {
  const { data } = useGetExpositores();
  const { state:{ showDashboardBar } } = useUIContext();
  return (
    <div className={`flex flex-col gap-6 ${!showDashboardBar && 'xl:grid xl:grid-cols-2'}`}>
      {data?.map((expositor) => <ExpositorCard expositor={expositor}/>)}
    </div>
  )
}

type ExpositorCardProps = {
  expositor:Expositor
}

function ExpositorCard ({ expositor:{ name, image }}:ExpositorCardProps) {
  return (
    <div className='rounded border border-gray-200 flex flex-col'>
      <img 
        src='https://www.incimages.com/uploaded_files/image/1920x1080/getty_660582997_412145.jpg'
        className='rounded-t'
        style={{ maxHeight:80 }}
      />
      <div className='flex flex-col items-center' style={{ top:-30, position:'relative' }}>
        <img
          src={image}
          style={{ height:60, width:60, borderRadius:100 }}
          className='border border-gray-400 self-center mb-3'
        />
      </div>
    </div>
  )
}