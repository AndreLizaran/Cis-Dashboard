// Modules
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import {
  faToolbox,
  faPlus,
  faCubes,
  faMicrophone,
  faPeopleCarry
} from '@fortawesome/free-solid-svg-icons';

// Components
import H2 from '../../components/simple/H2';
import Label from '../../components/simple/Label';
import RoundedButton from '../../components/simple/RoundedButton';
import InformationContainer from '../../components/simple/InformationContainer';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';
import { 
  useGetTalleres, 
  useGetConferencias, 
  useGetCursos, 
  useGetPonencias 
} from '../../hooks/useGetData';
import useOnScreen from '../../hooks/useOnScreen';

// Classes
import { lightInput } from '../../classes';

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
      <EventsContainer/>
      <NewEventContainer formRef={formRef}/>
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

  return (
    <div className={`flex flex-col gap-6 mb-6 sm:grid ${!showDashboardBar ? 'md:grid-cols-2 xl:grid-cols-3' : 'lg:grid-cols-2'} `}>
      <InformationContainer
        title='Talleres'
        titleIcon={faToolbox}
        titleColor='red-600'
        loading={isLoadingTalleres}
        data={dataTalleres || []}
      />
      <InformationContainer
        title='Conferencias'
        titleIcon={faMicrophone}
        titleColor='teal-600'
        loading={isLoadingConferencias}
        data={dataConferencias || []}
      />
      <InformationContainer
        title='Cursos'
        titleIcon={faCubes}
        titleColor='green-700'
        loading={isLoadingCursos}
        data={dataCursos || []}
      />
      <InformationContainer
        title='Ponencias'
        titleIcon={faPeopleCarry}
        titleColor='yellow-500'
        loading={isLoadingPonencias}
        data={dataPonencias || []}
      />
    </div>
  )
}

type NewEventContainerProps = {
  formRef: RefObject<HTMLInputElement>
}

function NewEventContainer ({formRef}:NewEventContainerProps) {

  return (
    <div className='rounded'> 
      <div className={`rounded-t px-4 py-3 flex items-center justify-between bg-gray-800 text-white`}>
        <h2>Crear nuevo evento</h2>
      </div>
      <div className='p-4 bg-white flex flex-col lg:grid rounded-b drop-shadow gap-6'>
        <NewEventForm formRef={formRef}/>
        <RoundedButton color='red-600' text='Guardar nuevo evento'/>
      </div>
    </div>
  )
}

type NewEventFormProps = {
  formRef: RefObject<HTMLInputElement>;
}

function NewEventForm ({formRef}:NewEventFormProps) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <div className={`flex flex-col md:grid gap-6 ${showDashboardBar ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'}`}>
      <div className='flex flex-col'>
        <Label>Título</Label>
        <input className={lightInput} ref={formRef}/>
      </div>
      <div className='flex flex-col'>
        <Label>Descripción</Label>
        <input className={lightInput}/>
      </div>
      <div className='flex flex-col'>
        <Label>Expositor</Label>
        <input className={lightInput}/>
        <small className='underline mt-2 cursor-pointer'>Agregar nuevo expositor</small>
      </div>
      <div className='flex flex-col'>
        <Label>Fecha</Label>
        <input className={lightInput}/>
      </div>
      <div className='flex flex-col'>
        <Label>Hora</Label>
        <input className={lightInput}/>
      </div>
    </div>
  )
}