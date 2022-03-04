// Modules
import { RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
// @ts-ignore
import DatePicker from "react-datepicker";

// Icons
import {
  faToolbox,
  faPlus,
  faCubes,
  faMicrophone,
  faPencil,
  faUserCheck,
  faSpinner,
  faMinus
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import H2 from '../../components/H2';
import FileButton from '../../components/FileButton';
import SimpleAlert from '../../components/SimpleAlert';
import ImageViewer from '../../components/ImageViewer';
import RoundedButton from '../../components/RoundedButton';
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';

// Hooks
import { useGetData } from '../../hooks/useGetData';
import useFormValues from '../../hooks/useFormValues';
import useProcessImage from '../../hooks/useProcessImage';
import { useUIContext } from '../../hooks/useCustomContext';

// Classes
import { fadeIn, lightInput } from '../../classes';

// Types
import { EventType } from '../../api';

const initialState:EventType = {
  id:0,
  idExpositor: 1,
  title:'',
  description:'',
  bgImage:'',
  day: new Date().toLocaleDateString("en-ES"),
  hour: {
    hour:12,
    minute:0 
  },
  expositor: {
    name:'',
    image:'',
  },
  eventType:1,
  eventState:1
}

type InformationHelper = { idEvent:number, eventType:number };

export default function Events() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const formRef = useRef<HTMLInputElement>(null);
  const [currentAction, setCurrentAction] = useState<'create' | 'edit'>('create');
  const [informationHelper, setInformationHelper] = useState({ idEvent:0, eventType:0 });
  const [img, setImg] = useState('');

  const { 
    useGetTalleres,
    useGetConferencias,
    useGetCursos,
    useGetPonencias
  } = useGetData();

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

  const [
    talleresInformation, 
    setTalleresInformation
  ] = useState<EventType[]>([]);

  const [
    conferenciasInformation, 
    setConferenciasInformation
  ] = useState<EventType[]>([]);

  const [
    cursosInformation, 
    setCursosInformation
  ] = useState<EventType[]>([]);

  const [
    ponenciasInformation, 
    setPonenciasInformation
  ] = useState<EventType[]>([]);

  useEffect(() => {
    if (!isLoadingTalleres && dataTalleres !== undefined) 
      setTalleresInformation(dataTalleres);
  }, [isLoadingTalleres]);

  useEffect(() => {
    if (!isLoadingConferencias && dataConferencias !== undefined) 
      setConferenciasInformation(dataConferencias);
  }, [isLoadingConferencias]);

  useEffect(() => {
    if (!isLoadingCursos && dataCursos !== undefined) 
      setCursosInformation(dataCursos);
  }, [isLoadingCursos]);

  useEffect(() => {
    if (!isLoadingPonencias && dataPonencias !== undefined) 
      setPonenciasInformation(dataPonencias);
  }, [isLoadingPonencias]);
  

  const talleres = {
    isLoadingTalleres,
    talleresInformation,
    setTalleresInformation
  }

  const conferencias = {
    isLoadingConferencias,
    conferenciasInformation,
    setConferenciasInformation
  }

  const cursos = {
    isLoadingCursos,
    cursosInformation,
    setCursosInformation
  }  

  const ponencias = {
    isLoadingPonencias,
    ponenciasInformation,
    setPonenciasInformation
  }

  const { 
    handleInputs, 
    inputValues:eventFormValues, 
    setInputValues:setEventFormValues 
  } = useFormValues(initialState);

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
      <div className={`flex flex-col ${fadeIn}`}>
        <EventsContainer 
          setEventFormValues={setEventFormValues} 
          formRef={formRef} 
          setCurrentAction={setCurrentAction} 
          setInformationHelper={setInformationHelper}
          talleres={talleres}
          conferencias={conferencias}
          cursos={cursos}
          ponencias={ponencias}
        />
        <div className={`flex flex-col gap-6 ${showDashboardBar ? '' : 'lg:grid lg:grid-cols-2'}`}>
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
              informationHelper={informationHelper}
              setInformationHelper={setInformationHelper}
              talleres={talleres}
              conferencias={conferencias}
              cursos={cursos}
              ponencias={ponencias}
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
  setInformationHelper: React.Dispatch<React.SetStateAction<InformationHelper>>
  talleres: {
    isLoadingTalleres: boolean,
    talleresInformation: EventType[];
  };
  conferencias: {
    isLoadingConferencias: boolean;
    conferenciasInformation: EventType[];
  };
  cursos: {
    isLoadingCursos: boolean;
    cursosInformation: EventType[];
  };
  ponencias: {
    isLoadingPonencias: boolean;
    ponenciasInformation: EventType[];
  };
}

function EventsContainer ({ 
  setEventFormValues, 
  formRef,
  setCurrentAction, 
  setInformationHelper,
  talleres,
  conferencias,
  cursos,
  ponencias
}:EventsContainerProps) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  
  const infoContainers = [
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faToolbox, 
      headerText: 'Talleres',
      data: talleres.talleresInformation,
      isLoading: talleres.isLoadingTalleres
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faMicrophone, 
      headerText: 'Conferencias',
      data: conferencias.conferenciasInformation,
      isLoading: conferencias.isLoadingConferencias
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faCubes, 
      headerText: 'Cursos',
      data: cursos.cursosInformation,
      isLoading: cursos.isLoadingCursos
    },
    { 
      headerColor: 'bg-gray-800', 
      headerIcon: faUserCheck, 
      headerText: 'Ponencias',
      data: ponencias.ponenciasInformation,
      isLoading: ponencias.isLoadingPonencias
    },
  ]

  return (
    <div className={`flex flex-col gap-6 mb-6 sm:grid ${!showDashboardBar ? 'md:grid-cols-2 xl:grid-cols-3' : 'xl:grid-cols-2'}`}>
      {infoContainers.map(({ headerColor, headerIcon, headerText, data, isLoading}, index) => (
        <InformationContainer
          headerColor={headerColor}
          headerIcon={headerIcon}
          headerText={headerText} 
          key={index}
        >
          <EventsList  
            data={data} 
            setEventFormValues={setEventFormValues} 
            formRef={formRef} 
            setCurrentAction={setCurrentAction}
            setInformationHelper={setInformationHelper}
            isLoading={isLoading}
          />
        </InformationContainer>
      ))}
    </div>
  )
}

type EventListProps = {
  data: EventType[];
  setEventFormValues:React.Dispatch<React.SetStateAction<EventType>>;
  formRef:RefObject<HTMLInputElement>;
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>;
  setInformationHelper: React.Dispatch<React.SetStateAction<{ idEvent:number, eventType:number }>>;
  isLoading: boolean;
}

function EventsList ({ data, setEventFormValues, formRef, setCurrentAction, setInformationHelper, isLoading }:EventListProps) {

  if (isLoading) return <FontAwesomeIcon icon={faSpinner} className='fa-spin'/>
  else {
    return (
      <div className='flex flex-col gap-6'>
        {
          data.length === 0 
          && 
          <SimpleAlert 
            color='border border-red-500' 
            textColor='text-red-500'
          >No hay eventos de este tipo guardados</SimpleAlert> 
        }
        {data.map((event, index) => (
          <EventCard 
            key={index} 
            event={event} 
            setEventFormValues={setEventFormValues} 
            formRef={formRef} 
            setCurrentAction={setCurrentAction}
            setInformationHelper={setInformationHelper}
          />
        ))}
      </div>
    )
  }
}

type EventCardProps = {
  event:EventType;
  setEventFormValues:React.Dispatch<React.SetStateAction<EventType>>
  formRef:RefObject<HTMLInputElement>;
  setCurrentAction: React.Dispatch<React.SetStateAction<'create' | 'edit'>>
  setInformationHelper: React.Dispatch<React.SetStateAction<{ idEvent:number, eventType:number }>>
}

function EventCard ({ event, setEventFormValues, formRef, setCurrentAction, setInformationHelper }:EventCardProps) {

  const { title, expositor, eventState } = event;

  return (
    <div className='flex flex-col border border-gray-200 rounded w-full'>
      <div 
        className='rounded-t'
        style={{ 
          width:'100%', 
          backgroundImage:`url(${event.bgImage})`, 
          height:150, 
          backgroundPosition:'center', 
          backgroundSize:'cover' 
        }}
      />
      <div 
        className='flex flex-col items-center' 
        style={{ 
          top:-30, 
          position:'relative' 
        }}
      >
        <img
          src={expositor.image}
          style={{ height:60, width:60, borderRadius:100 }}
          className='border border-gray-400 self-center mb-3'
        />
        <div className='flex flex-col text-center items-center'>
          <h2>{title} - {expositor.name}</h2>
          <small>Día del evento: {event.day}</small>
          <div className='flex gap-1'>
            <small>Hora:</small>
            <div className='flex'>
              <small>{event.hour.hour <= 9 ? `0${event.hour.hour}` : event.hour.hour}</small>
              <small>:</small>
              <small>{event.hour.minute <= 9 ? `0${event.hour.minute}` : event.hour.minute}</small>
            </div>
          </div>
          <div className='flex gap-1 mb-3'>
            <small>Estado del evento:</small>
            {eventState === 1 && <small className='text-blue-500'>En fecha</small>}
            {eventState === 2 && <small className='text-yellow-400'>Pospuesto</small>}
            {eventState === 3 && <small className='text-red-400'>Cancelado</small>}
            {eventState === 4 && <small className='text-gray-400'>Por agendar</small>}
          </div>
          {/* <small className='mb-3'>Asistentes: 100</small> */}
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
              setInformationHelper({ idEvent:event.id, eventType:event.eventType });
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
  informationHelper: InformationHelper;
  setInformationHelper: React.Dispatch<SetStateAction<InformationHelper>>;
  talleres: {
    setTalleresInformation: React.Dispatch<SetStateAction<EventType[]>>;
    talleresInformation: EventType[];
  };
  conferencias: {
    setConferenciasInformation: React.Dispatch<SetStateAction<EventType[]>>;
    conferenciasInformation: EventType[];
  };
  cursos: {
    setCursosInformation: React.Dispatch<SetStateAction<EventType[]>>;
    cursosInformation: EventType[];
  };
  ponencias: {
    setPonenciasInformation: React.Dispatch<SetStateAction<EventType[]>>;
    ponenciasInformation: EventType[];
  };
}

function NewEventForm ({ 
  formRef, 
  setEventFormValues, 
  eventFormValues, 
  handleInputs, 
  currentAction, 
  setCurrentAction, 
  setImg, 
  informationHelper,
  setInformationHelper,
  talleres,
  conferencias,
  cursos,
  ponencias,
}:NewEventFormProps) {

  const { bgImage, day, title, description, idExpositor, eventType, hour, eventState } = eventFormValues; 
  const { switchAlert } = useUIContext();
  const [ dateHelper, setDateHelper ] = useState(new Date());
  const [ isSavingNewEvent, setIsSavingNewEvent ] = useState(false);
  const [ fileImage, setFileImage] = useState<File>();
  const { saveImageOnFirebase } = useProcessImage();
  
  const { 
    useGetExpositores, 
    useSaveNewConferencia, 
    useSaveNewCurso, 
    useSaveNewPonencia, 
    useSaveNewTaller,
    useDeleteTaller,
    useDeleteConferencia,
    useDeleteCurso,
    useDeletePonencia
  } = useGetData();

  const { data } = useGetExpositores(); 
  const { mutateAsync:saveTaller } = useSaveNewTaller();
  const { mutateAsync:saveConferencia } = useSaveNewConferencia();
  const { mutateAsync:saveCurso } = useSaveNewCurso();
  const { mutateAsync:savePonencia } = useSaveNewPonencia();
  const { mutateAsync:deleteTaller } = useDeleteTaller();
  const { mutateAsync:deleteConferencia } = useDeleteConferencia();
  const { mutateAsync:deleteCurso } = useDeleteCurso();
  const { mutateAsync:deletePonencia } = useDeletePonencia();

  async function saveEvent () {
    if (!validateEventInformation()) return;
    try {
      setIsSavingNewEvent(true);
      if (data === undefined) return;
      let expositorInformation = data.filter((expositor) => expositor.id === idExpositor);
      if (data.length === 0) return; 
      const bgImageUrl = await saveImageOnFirebase(fileImage!, title);
      const eventObject:EventType = {
        ...eventFormValues,
        expositor: {
          image:expositorInformation[0].profileImage,
          name:expositorInformation[0].name
        },
        bgImage:bgImageUrl!
      }
      const objectForDb = {
        idExpositor,
        title, 
        description,
        hour,
        bgImage:bgImageUrl!,
        day,
        eventState
      }
      switch(eventType) {
        case 1:
          saveTaller(objectForDb);
          talleres.setTalleresInformation([...talleres.talleresInformation, eventObject]);
          break;
        case 2:
          saveConferencia(objectForDb);
          conferencias.setConferenciasInformation([...conferencias.conferenciasInformation, eventObject]);
          break;
        case 3:
          saveCurso(objectForDb);
          cursos.setCursosInformation([ ...cursos.cursosInformation, eventObject ]);
          break;
        case 4:
          savePonencia(objectForDb);
          ponencias.setPonenciasInformation([ ...ponencias.ponenciasInformation, eventObject ]);
          break;
      }
      switchAlert({
        alert:'Evento creado',
        color:'bg-blue-600',
      });
      cleanFormAfterAction();
      setIsSavingNewEvent(false);
    } catch (error) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
      setIsSavingNewEvent(false);
    }
  }

  function validateEventInformation () {
    if (!description || !title || !day || !idExpositor || !eventType || !hour.hour || !eventType || !eventState) {
      switchAlert({ 
        alert:'Ingresa todos los datos del expositor', 
        color:'bg-red-600', 
      });
      return false;
    } else return true;
  }

  async function editEvent () {
    try {
      // Funcionalidad por realizar, simulación
      switchAlert({ 
        alert:'Ha sido editado el evento', 
        color:'bg-blue-600', 
      });
      cleanFormAfterAction();
    } catch (error:any) {
      console.log(error);
    }
  }

  async function deleteEvent () {
    try {
      const request = getEventToDelete();
      await request(informationHelper.idEvent);
      switchAlert({ 
        alert:'Ha sido eliminado el evento', 
        color:'bg-red-600', 
      });
      removeElementFromEvents();
      cleanFormAfterAction();
    } catch (error:any) {
      console.log(error);
    }
  }

  function removeElementFromEvents () {
    switch (informationHelper.eventType) {
      case 1:
        let newTalleres = talleres.talleresInformation.filter((event) => event.id !== informationHelper.idEvent);
        talleres.setTalleresInformation(newTalleres);
        break;
      case 2:
        let newConferencias = conferencias.conferenciasInformation.filter((event) => event.id !== informationHelper.idEvent);
        conferencias.setConferenciasInformation(newConferencias);
        break;
      case 3:
        let newCursos = cursos.cursosInformation.filter((event) => event.id !== informationHelper.idEvent);
        cursos.setCursosInformation(newCursos);
        break;
      case 4:
        let newPonencias = ponencias.ponenciasInformation.filter((event) => event.id !== informationHelper.idEvent);
        ponencias.setPonenciasInformation(newPonencias);
        break;
    }
  }

  function getEventToDelete () {
    switch (informationHelper.eventType) {
      case 1:
        return deleteTaller;
      case 2:
        return deleteConferencia;
      case 3:
        return deleteCurso;
      case 4:
        return deletePonencia;
      default: 
        return deleteTaller;
    }
  }

  function cleanFormAfterAction () {
    window.scrollTo({ top:0, behavior:'smooth' });
    setEventFormValues(initialState);
    setInformationHelper({ eventType:0, idEvent:0 });
  }

  return (
    <NewElementForm 
      saveFunction={currentAction === 'create' ? saveEvent : editEvent} 
      saveButtonText='Guardar evento' 
      action={currentAction}
      setAction={setCurrentAction}
      cleanAction={() => cleanFormAfterAction()}
      deleteAction={() => deleteEvent()}
      deleteText='Eliminar evento'
      isLoading={isSavingNewEvent}
    >
      <div className='flex flex-col'>
        <label>Título</label>
        <input className={lightInput} ref={formRef} value={title} name='title' onChange={handleInputs}/>
      </div>
      <div className='flex flex-col'>
        <label>Descripción</label>
        <textarea 
          className={lightInput} 
          style={{ resize:'none' }} 
          rows={4} 
          value={description} 
          name='description' 
          // @ts-ignore
          onChange={handleInputs}
        />
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
        <label>Estado del evento</label>
        <select 
          className={lightInput} 
          value={eventState}
          onChange={(event) => setEventFormValues({ ...eventFormValues, eventState:Number(event.target.value) })}
        >
          <option value={1}>En fecha</option>
          <option value={2}>Pospuesto</option>
          <option value={3}>Cancelado</option>
          <option value={4}>Por agendar</option>
          <option value={5}>Concluido</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label>Fecha</label>
        <DatePicker 
          className={lightInput} 
          selected={dateHelper} 
          onChange={(date:Date) => {
            setEventFormValues({ ...eventFormValues, day:date.toLocaleDateString("en-ES") });
            setDateHelper(date)
          }} 
          locale="es"
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className='flex flex-col'>
        <label>Hora</label>
        <div className='flex gap-6'>
          <input className={lightInput} disabled={true} readOnly value={hour.hour}/>
          <RoundedButton 
            color='blue-500' 
            icon={faPlus} 
            action={() => hour.hour <= 24 && setEventFormValues({ ...eventFormValues, hour:{ minute:hour.minute, hour: hour.hour + 1 }})}
          />
          <RoundedButton 
            color='red-600' 
            icon={faMinus}
            action={() => hour.hour > 1 && setEventFormValues({ ...eventFormValues, hour:{ minute:hour.minute, hour: hour.hour - 1 }})}
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <label>Minuto</label>
        <div className='flex gap-6'>
          <input className={lightInput} disabled={true} readOnly value={hour.minute}/>
          <RoundedButton 
            color='blue-500' 
            icon={faPlus}
            action={() => hour.minute < 59 && setEventFormValues({ ...eventFormValues, hour:{ hour:hour.hour, minute: hour.minute + 1 }})}
          />
          <RoundedButton 
            color='red-600' 
            icon={faMinus}
            action={() => hour.minute > 1 && setEventFormValues({ ...eventFormValues, hour:{ hour:hour.hour, minute: hour.minute - 1 }})}
          />
        </div>
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Imagen del evento</label>
        <div className='flex gap-6'>
          <FileButton img={fileImage} setImg={setFileImage}/>
        </div>
      </div>
    </NewElementForm>
  )
}