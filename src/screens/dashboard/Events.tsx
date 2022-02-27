// Modules
import { RefObject, useRef, useState } from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";
import TimePicker from 'rc-time-picker';
// @ts-ignore
import InputFiles from 'react-input-files';

// Icons
import {
  faToolbox,
  faPlus,
  faCubes,
  faMicrophone,
  faUserCheck,
  faSpinner,
  faUpload,
  faPencil,
  faImage,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import H2 from '../../components/H2';
import RoundedButton from '../../components/RoundedButton';
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';
import useFormValues from '../../hooks/useFormValues';
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
import ImageViewer from '../../components/ImageViewer';
import useProcessImage from '../../hooks/useProcessImage';

const initialState:EventType = {
  id:0,
  idExpositor: 1,
  title:'',
  description:'',
  bgImage:'',
  day: '',
  hour:'',
  expositor: {
    name:'',
    image:'',
  },
  eventType:1,
}

export default function Events() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const formRef = useRef<HTMLInputElement>(null);
  const { 
    handleInputs, 
    inputValues:eventFormValues, 
    setInputValues:setEventFormValues 
  } = useFormValues(initialState);
  const [currentAction, setCurrentAction] = useState<'create' | 'edit'>('create');
  const [img, setImg] = useState('');

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
        <EventsContainer setEventFormValues={setEventFormValues} formRef={formRef} setCurrentAction={setCurrentAction}/>
        <div className={`flex flex-col gap-6 ${showDashboardBar ? '2xl:grid 2xl:grid-cols-2' : 'lg:grid lg:grid-cols-2'}`}>
          <InformationContainer
            headerColor={currentAction === 'create' ? 'bg-gray-800' : 'bg-blue-500'}
            headerText={currentAction === 'create' ? 'Registrar nuevo evento' : 'Editar evento'}
            headerIcon={faPlus}
            maxHeight={false}
          >
            <NewEventForm 
              formRef={formRef} 
              setEventFormValues={setEventFormValues} 
              eventFormValues={eventFormValues} 
              handleInputs={handleInputs}
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              setImg={setImg}
            />
          </InformationContainer>
        </div>
      </div>
      {img && <ImageViewer img={img} setImg={setImg}/>}
    </>
  )
}

type EventsContainerProps = {
  setEventFormValues: React.Dispatch<React.SetStateAction<EventType>>;
  formRef: RefObject<HTMLInputElement>;
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
}

function EventsContainer ({ setEventFormValues, formRef, setCurrentAction }:EventsContainerProps) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const { useGetExpositores } = useGetData();

  const { data:dataExpositores, isLoading:isLoadingExpositores } = useGetExpositores();

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
      isLoading: isLoadingTalleres,
      eventType: 1
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faMicrophone, 
      headerText: 'Conferencias',
      data: dataConferencias || [],
      isLoading: isLoadingConferencias,
      eventType: 2
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faCubes, 
      headerText: 'Cursos',
      data: dataCursos || [],
      isLoading: isLoadingCursos,
      eventType: 3
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faUserCheck, 
      headerText: 'Ponencias',
      data: dataPonencias || [],
      isLoading: isLoadingPonencias,
      eventType: 4
    },
  ]

  if (isLoadingExpositores) return <></>
  else {
    return (
      <div className={`flex flex-col gap-6 mb-6 sm:grid ${!showDashboardBar ? 'md:grid-cols-2 xl:grid-cols-3' : 'xl:grid-cols-2'}`}>
        {infoContainers.map(({ headerColor, headerIcon, headerText, isLoading, data, eventType}, index) => {
          data = data.map((evento) => {
            evento = {
              ...evento,
              expositor: {
                name:'',
                image:''
              },
              eventType
            }
            let expositorInformation = dataExpositores?.filter((expositor) => expositor.id === evento.idExpositor) || [];
            if (expositorInformation.length > 0) {
              evento.expositor.name = expositorInformation[0].name; 
              evento.expositor.image = expositorInformation[0].image; 
            }
            return evento;
          });
          return (
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
                <EventsList data={data} setEventFormValues={setEventFormValues} formRef={formRef} setCurrentAction={setCurrentAction}/>
              }
            </InformationContainer>
          )
        })}
      </div>
    )
  }
}

type EventListProps = {
  data:EventType[];
  setEventFormValues:React.Dispatch<React.SetStateAction<EventType>>;
  formRef:RefObject<HTMLInputElement>;
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
}

function EventsList ({ data, setEventFormValues, formRef, setCurrentAction }:EventListProps) {
  return (
    <div className='flex flex-col gap-6'>
      {data.map((event, index) => (
        <EventCard key={index} event={event} setEventFormValues={setEventFormValues} formRef={formRef} setCurrentAction={setCurrentAction}/>
      ))}
    </div>
  )
}

type EventCardProps = {
  event:EventType;
  setEventFormValues:React.Dispatch<React.SetStateAction<EventType>>
  formRef:RefObject<HTMLInputElement>;
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;

}

function EventCard ({ event, setEventFormValues, formRef, setCurrentAction }:EventCardProps) {

  const { title, description, expositor } = event;

  return (
    <div className='flex flex-col border border-gray-200 rounded w-full'>
      <div 
        className='rounded-t'
        style={{ width:'100%', backgroundImage:`url(${event.bgImage})`, height:150, backgroundPosition:'center', backgroundSize:'cover' }}
      />
      <div className='flex flex-col items-center' style={{ top:-30, position:'relative' }}>
        <img
          src={expositor.image}
          style={{ height:60, width:60, borderRadius:100 }}
          className='border border-gray-400 self-center mb-3'
        />
        <div className='flex flex-col text-center items-center'>
          <h2>{title} - {expositor.name}</h2>
          {/* <small className='w-8/12'>{description}</small> */}
          <div className='flex gap-3 text-gray-400'>
            <small>Día: {event.day}</small>
            <small>Hora: {event.hour}</small>
          </div>
          <small className='mb-3'>Asistentes: 100</small>
          <RoundedButton 
            color='gray-100' 
            icon={faPencil} 
            square={true} 
            style={{ fontSize:12 }}
            action={() => {
              var date = new Date();
              setCurrentAction('edit');
              setEventFormValues({ ...event, day:date.toString() });
              formRef.current?.focus();
            }}
          />
        </div>
      </div>
    </div>
  )
}

type NewEventFormProps = {
  formRef: RefObject<HTMLInputElement>;
  eventFormValues: EventType;
  setEventFormValues: React.Dispatch<React.SetStateAction<EventType>>;
  handleInputs: (e: React.FormEvent<HTMLInputElement>) => void;
  currentAction: 'create' | 'edit';
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setImg: React.Dispatch<React.SetStateAction<string>>;
}

function NewEventForm ({ formRef, setEventFormValues, eventFormValues, handleInputs, currentAction, setCurrentAction, setImg }:NewEventFormProps) {

  const { bgImage, day, title, description, idExpositor, eventType, hour } = eventFormValues; 
  const { switchAlert } = useUIContext();
  const { getImageFromFileInput } = useProcessImage();
  
  const { 
    useGetExpositores, 
    useSaveNewConferencia, 
    useSaveNewCurso, 
    useSaveNewPonencia, 
    useSaveNewTaller 
  } = useGetData();

  const { data } = useGetExpositores();
  const { mutateAsync:saveTaller } = useSaveNewTaller();
  const { mutateAsync:saveConferencia } = useSaveNewConferencia();
  const { mutateAsync:saveCurso } = useSaveNewCurso();
  const { mutateAsync:savePonencia } = useSaveNewPonencia();

  function cleanForm () { setEventFormValues(initialState) }

  function saveEvent () {
    if (!validateEventInformation()) return;
    try {
      const eventObject = {
        id:0,
        idExpositor,
        bgImage,
        title,
        day,
        hour,
        description
      }
      switch(eventType) {
        case 1:
          saveTaller(eventObject);
          break;
        case 2:
          saveConferencia(eventObject);
          break;
        case 3:
          saveCurso(eventObject);
          break;
        case 4:
          savePonencia(eventObject);
          break;
      }
      switchAlert({
        alert:'Evento creado',
        color:'bg-blue-600',
      });
      setEventFormValues(initialState);
      window.scrollTo({ top:0, behavior:'smooth' });
    } catch (error) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
    }
  }

  function validateEventInformation () {
    if (!bgImage || !description || !title || !day || !idExpositor || !eventType) {
      switchAlert({ 
        alert:'Ingresa todos los datos del expositor', 
        color:'bg-red-600', 
      });
      return false;
    } else return true;
  }

  async function processImage (event:any) {
    const imageProcessed = await getImageFromFileInput(event) as string;
    if (imageProcessed) setEventFormValues({ ...eventFormValues, bgImage:imageProcessed });
  }

  function editEvent () {}
  
  return (
    <NewElementForm 
      saveButtonText='Guardar evento' 
      saveFunction={() => saveEvent()} 
      action={currentAction}
      setAction={setCurrentAction}
      cleanAction={() => cleanForm()}
      deleteAction={() => {}}
      deleteText='Eliminar evento'
    >
      <div className='flex flex-col'>
        <label>Título</label>
        <input className={lightInput} ref={formRef} value={title} name='title' onChange={handleInputs}/>
      </div>
      <div className='flex flex-col'>
        <label>Descripción</label>
        {/* @ts-ignore */}
        <textarea className={lightInput} style={{ resize:'none' }} rows={4} value={description} name='description' onChange={handleInputs}/>
      </div>
      <div className='flex flex-col'>
        <label>Expositor</label>
        <select 
          className={lightInput}  
          value={idExpositor}
          onChange={(event) => setEventFormValues({ ...eventFormValues, idExpositor:Number(event.target.value) })}
        >
          {data && data.map(({ name, id }) => <option key={id} value={id}>{name}</option>)}
        </select>
        <small className='underline mt-2 cursor-pointer'>Agregar nuevo expositor</small>
      </div>
      <div className='flex flex-col'>
        <label>Tipo de evento</label>
        <select 
          className={lightInput} 
          value={eventType}
          onChange={(event) => setEventFormValues({ ...eventFormValues, eventType:Number(event.target.value) })}
        >
          <option value={1}>Taller</option>
          <option value={2}>Conferencia</option>
          <option value={3}>Curso</option>
          <option value={4}>Ponencia</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label>Fecha</label>
        <DatePicker 
          className={lightInput} 
          selected={new Date} 
          onChange={(date:Date) => setEventFormValues({ ...eventFormValues, day:date.toString() })} 
          locale="es"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className='flex flex-col'>
        <label>Hora</label>
        <TimePicker 
          className={lightInput} 
          showSecond={false} 
          onChange={(value) => {
            setEventFormValues({ ...eventFormValues, hour:`${value.hour()}:${value.minutes()}`});
          }}
        />
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Imagen del evento</label>
        <div className='flex gap-6'>
          <InputFiles onChange={(files:any, event:any) => processImage(event)} style={{ width:'33%' }}>
            <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
          </InputFiles>
          {bgImage && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(bgImage)}/>}
          {bgImage && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => setEventFormValues({ ...eventFormValues, bgImage:'' })}/>}
        </div>
      </div>
    </NewElementForm>
  )
}
