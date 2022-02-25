// Modules
import { RefObject, useRef } from 'react';

// Icons
import {
  faToolbox,
  faPlus,
  faCubes,
  faMicrophone,
  faUserCheck,
  faSpinner,
  faUpload,
  faTrash,
  faPencil
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import H2 from '../../components/H2';
import RoundedButton from '../../components/RoundedButton';
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';
import { 
  useGetTalleres, 
  useGetConferencias, 
  useGetCursos, 
  useGetPonencias, 
  useGetData
} from '../../hooks/useGetData';

// Classes
import { fadeInUp, lightInput } from '../../classes';

// Types
import { EventType } from '../../api';

export default function Events() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const formRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className='flex justify-between items-center mb-6 w-full' style={{ overflowY:'hidden' }}>
        <H2>Eventos</H2>
        <RoundedButton
          color='red-600'
          square={true}
          icon={faPlus}
          className={`${!showDashboardBar && 'mr-14'}`}
          action={() => formRef.current?.focus()}
        />
      </div>
      <div className={`flex flex-col ${fadeInUp}`}>
        <EventsContainer/>
        <div className={`flex flex-col gap-6 ${showDashboardBar ? '2xl:grid 2xl:grid-cols-2' : 'lg:grid lg:grid-cols-2'}`}>
          <InformationContainer
            headerColor='bg-gray-800'
            headerText='Registrar nuevo evento'
            headerIcon={faPlus}
            maxHeight={false}
          >
            <NewEventForm formRef={formRef}/>
          </InformationContainer>
        </div>
      </div>
    </>
  )
}

function EventsContainer () {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  const { 
    isLoading:isLoadingTalleres,
    data:dataTalleres
  } = useGetTalleres();

  const { 
    isLoading:isLoadingConferencias,
    data:dataConferencias
  } = useGetConferencias();

  const { 
    isLoading:isLoadingCursos,
    data:dataCursos
  } = useGetCursos();

  const { 
    isLoading:isLoadingPonencias,
    data:dataPonencias
  } = useGetPonencias();

  const infoContainers = [
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faToolbox, 
      headerText: 'Talleres',
      data: dataTalleres || [],
      isLoading: isLoadingTalleres
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faMicrophone, 
      headerText: 'Conferencias',
      data: dataConferencias || [],
      isLoading: isLoadingConferencias
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faCubes, 
      headerText: 'Cursos',
      data: dataCursos || [],
      isLoading: isLoadingCursos
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faUserCheck, 
      headerText: 'Ponencias',
      data: dataPonencias || [],
      isLoading: isLoadingPonencias
    },
  ]

  return (
    <div className={`flex flex-col gap-6 mb-6 sm:grid ${!showDashboardBar ? 'md:grid-cols-2 xl:grid-cols-3' : 'xl:grid-cols-2'}`}>
      {infoContainers.map(({ headerColor, headerIcon, headerText, isLoading, data }, index) => (
        <InformationContainer
          headerColor={headerColor}
          headerIcon={headerIcon}
          headerText={headerText} 
          key={index}
        >
          {
            isLoading 
            ? 
            <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>
            :
            <EventsList data={data} />
          }
        </InformationContainer>
      ))}
    </div>
  )
}

type EventListProps = {
  data:EventType[];
}

function EventsList ({ data }:EventListProps) {

  return (
    <>
      {data.map((event, index) => (
        <div className='flex flex-col border border-gray-200 rounded w-full' key={index}>
          <div 
            className='rounded-t'
            style={{ width:'100%', backgroundImage:`url(${event.bgImage})`, height:150, backgroundPosition:'center', backgroundSize:'cover' }}
          />
          <div className='flex flex-col items-center' style={{ top:-30, position:'relative' }}>
            <img
              src={event.image}
              style={{ height:60, width:60, borderRadius:100 }}
              className='border border-gray-400 self-center mb-3'
            />
            <div className='flex flex-col text-center items-center'>
              <h2>{event.eventName}</h2>
              <small>{event.name}</small>
              <div className='flex gap-3 mt-1 mb-1 text-gray-400'>
                <small>Día: {event.day}</small>
                <small>Hora: {event.hour}</small>
              </div>
              <small className='mb-3'>Asistentes: 100</small>
              <div className='flex gap-3'>
                <RoundedButton color='gray-100' icon={faTrash} square={true} style={{ fontSize:12 }}/>
                <RoundedButton color='gray-100' icon={faPencil} square={true} style={{ fontSize:12 }}/>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

type NewEventFormProps = {
  formRef: RefObject<HTMLInputElement>;
}

function NewEventForm ({formRef}:NewEventFormProps) {

  const { useGetExpositores } = useGetData();
  const { data } = useGetExpositores();
  
  return (
    <NewElementForm 
      saveButtonText='Guardar evento' 
      saveFunction={() => {}} 
      action='create' 
      setAction={() => {}}
      cleanAction={() => {}}
      deleteAction={() => {}}
      deleteText='Eliminar evento'
    >
      <div className='flex flex-col'>
        <label>Título</label>
        <input className={lightInput} ref={formRef}/>
      </div>
      <div className='flex flex-col'>
        <label>Descripción</label>
        <textarea className={lightInput} rows={6} style={{ resize:'none' }}/>
      </div>
      <div className='flex flex-col'>
        <label>Expositor</label>
        <select className='focus:outline-none px-4 py-2 rounded border bg-gray-50 border-gray-400 mt-1'>
          {data && data.map(({ name, id }) => <option key={id}>{name}</option>)}
        </select>
        <small className='underline mt-2 cursor-pointer'>Agregar nuevo expositor</small>
      </div>
      <div className='flex flex-col'>
        <label>Tipo de evento</label>
        <select className='focus:outline-none px-4 py-2 rounded border bg-gray-50 border-gray-400 mt-1'>
          <option value='taller'>Taller</option>
          <option value='conferencia'>Conferencia</option>
          <option value='curso'>Curso</option>
          <option value='ponencia'>Ponencia</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Imagen del evento</label>
        <div className='flex gap-6 items-center'>
          <RoundedButton color='blue-500' icon={faUpload} className='w-6/12'/>
          <small className='w-6/12'>No has seleccionado algún archivo</small>
        </div>
      </div>
    </NewElementForm>
  )
}
