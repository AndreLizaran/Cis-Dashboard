// Modules
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
// @ts-ignore
import InputFiles from 'react-input-files';
import { faImage, faPencil, faPlus, faTimes, faUpload, faUserCheck } from '@fortawesome/free-solid-svg-icons'

// Api
import { Expositor } from '../../api';

// Components
import H2 from '../../components/H2'
import RoundedButton from '../../components/RoundedButton'
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';
import ImageViewer from '../../components/ImageViewer';

// Hooks
import useProcessImage from '../../hooks/useProcessImage';
import { useUIContext } from '../../hooks/useCustomContext';
import { useGetData } from '../../hooks/useGetData';

// Classes
import { fadeInUp, lightInput } from '../../classes';

const initialState = {
  id:0,
  name:'',
  description: '',
  image: '',
  bgImage: ''
}

export default function Expositores() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const [img, setImg] = useState('');
  const [currentAction, setCurrentAction] = useState<'create' | 'edit'>('create');
  const formRef = useRef<HTMLInputElement>(null);
  const [newExpositor, setNewExpositor] = useState<Expositor>(initialState);

  return (
    <>
      <div className='flex flex-col gap-6'>
        <div className='flex justify-between items-center w-full' style={{ overflowY:'hidden' }}>
          <H2>Expositores</H2>
          <RoundedButton
            color='red-600'
            square={true}
            icon={faPlus}
            className={`${!showDashboardBar && 'mr-14'}`}
            action={() => formRef.current?.focus()}
          />
        </div>
        <div className={`flex flex-col gap-6 ${showDashboardBar ? '2xl:grid 2xl:grid-cols-2' : 'lg:grid lg:grid-cols-2'} ${fadeInUp}`}>
          <InformationContainer
            headerText='Expositores registrados'
            headerColor='bg-gray-800'
            headerIcon={faUserCheck}
          >
            <ExpositoresList 
              setCurrentAction={setCurrentAction}
              formRef={formRef}
              setNewExpositor={setNewExpositor}
            />
          </InformationContainer>
          <InformationContainer
            headerText={currentAction === 'create' ? 'Registrar nuevo expositor' : 'Editar expositor'}
            headerColor={currentAction === 'create' ? 'bg-gray-800' : 'bg-blue-600'}
            headerIcon={faPlus}
            maxHeight={false}
          >
            <NewExpositorForm 
              setImg={setImg} 
              formRef={formRef}
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              newExpositor={newExpositor}
              setNewExpositor={setNewExpositor}
            />
          </InformationContainer>
        </div>
      </div>
      {img && <ImageViewer img={img} setImg={setImg}/>}
    </>
  )
}


type NewExpositorFormProps = {
  setImg:Dispatch<SetStateAction<string>>
  formRef:RefObject<HTMLInputElement>
  currentAction:'create' | 'edit'
  setCurrentAction: Dispatch<SetStateAction<"create" | "edit">>
  newExpositor: Expositor
  setNewExpositor: Dispatch<SetStateAction<Expositor>>
}

function NewExpositorForm ({ setImg, formRef, currentAction, setCurrentAction, newExpositor, setNewExpositor }:NewExpositorFormProps) {

  const { name, description, image, bgImage, id } = newExpositor;
  const { getImageFromFileInput } = useProcessImage();
  const { switchAlert } = useUIContext();

  const {
    useEditExpositor,
    useSaveNewExpositor,
    useDeleteExpositor
  } = useGetData();

  const { mutateAsync:mutateEdit } = useEditExpositor();
  const { mutateAsync:mutateCreate, isLoading } = useSaveNewExpositor();
  const { mutateAsync:mutateDelete } = useDeleteExpositor();


  async function saveNewExpositor () {
    if (!validateExpositorInformation()) return;
    try {
      await mutateCreate(newExpositor);
      switchAlert({
        alert:'Nuevo expositor guardado',
        color:'bg-blue-600',
      });
      window.scrollTo({ top:0, behavior:'smooth' });
      setNewExpositor(initialState);
    } catch (error:any) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
    }
  }

  function editExpositor () {
    if (!validateExpositorInformation()) return;
    try {
      mutateEdit(newExpositor)
      switchAlert({
        alert:'Expositor editado',
        color:'bg-blue-600',
      });
      setNewExpositor(initialState);
      window.scrollTo({ top:0, behavior:'smooth' });
      setCurrentAction('create');
    } catch (error:any) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
    }
  }

  async function deleteExpositor () {
    try {
      mutateDelete(id);
      switchAlert({ 
        alert:'Expositor eliminado', 
        color:'bg-red-600', 
      });
      setNewExpositor(initialState);
      window.scrollTo({ top:0, behavior:'smooth' });
      setCurrentAction('create');
    } catch (error:any) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
    }
  }

  function validateExpositorInformation () {
    if (!name || !description || !image || !bgImage) {
      switchAlert({ 
        alert:'Ingresa todos los datos del expositor', 
        color:'bg-red-600', 
      });
      return false;
    } else return true;
  }

  async function processImage (event:any, image:'pp' | 'bg') {
    const imageProcessed = await getImageFromFileInput(event) as string;
    if (image === 'bg' && imageProcessed) setNewExpositor({ ...newExpositor, bgImage:imageProcessed }) 
    else if (image === 'pp' && imageProcessed) setNewExpositor({ ...newExpositor, image:imageProcessed })   
  }

  function cleanImage (image: 'pp' | 'bg') {
    (image === 'bg') 
      ?
      setNewExpositor({ ...newExpositor, bgImage:'' })
      :
      setNewExpositor({ ...newExpositor, image:'' })
  }

  function cleanForm () { setNewExpositor(initialState) }

  return (
    <NewElementForm 
      saveButtonText='Guardar expositor' 
      saveFunction={currentAction === 'create' ? saveNewExpositor : editExpositor} 
      isLoading={isLoading} 
      action={currentAction}
      setAction={setCurrentAction}
      cleanAction={() => cleanForm()}
      deleteAction={() => deleteExpositor()}
      deleteText='Eliminar expositor'
    >
      <div className='flex flex-col'>
        <label>Nombre</label>
        <input 
          className={lightInput} 
          type='text' value={name} 
          ref={formRef}
          onChange={(value) => setNewExpositor(prev => ({ ...prev, name:value.target.value }))}
        />
      </div>
      <div className='flex flex-col'>
        <label>Descripción</label>
        <textarea 
          className={lightInput} 
          style={{ resize:'none' }}
          rows={6}
          value={description} 
          onChange={(value) => setNewExpositor(prev => ({ ...prev, description:value.target.value }))} 
        />
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de perfil</label>
        <div className='flex gap-6'>
          <InputFiles onChange={(files:any, event:any) => processImage(event, 'pp')} style={{ width:'33%' }}>
            <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
          </InputFiles>
          {image && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(image)}/>}
          {image && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => cleanImage('pp')}/>}
        </div> 
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de portada</label>
        <div className='flex gap-6'>
          <InputFiles onChange={(files:any, event:any) => processImage(event, 'bg')}s style={{ width:'33%' }}>
            <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
          </InputFiles>
          {bgImage && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(bgImage)}/>}
          {bgImage && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => cleanImage('bg')}/>}
        </div> 
      </div>
    </NewElementForm>
  )
}

type ExpositoresListProps = {
  setCurrentAction: Dispatch<SetStateAction<"create" | "edit">>
  formRef:RefObject<HTMLInputElement>
  setNewExpositor:Dispatch<SetStateAction<Expositor>>
}

function ExpositoresList ({ setCurrentAction, formRef, setNewExpositor }:ExpositoresListProps) {
  const { useGetExpositores } = useGetData();
  const { state:{ showDashboardBar }} = useUIContext();
  const { data } = useGetExpositores();
  return (
    <div className={`flex flex-col gap-6 ${!showDashboardBar ? 'md:grid md:grid-cols-2 lg:flex 2xl:grid' : 'lg:grid lg:grid-cols-2 2xl:flex'}`}>
      {data?.map((expositor, index) => (
        <ExpositorCard 
          expositor={expositor} 
          key={index} 
          setCurrentAction={setCurrentAction} 
          formRef={formRef}
          setNewExpositor={setNewExpositor}
        />
      ))}
    </div>
  )
}

type ExpositorCardProps = {
  expositor:Expositor;
  setCurrentAction: Dispatch<SetStateAction<"create" | "edit">>
  formRef:RefObject<HTMLInputElement>
  setNewExpositor:Dispatch<SetStateAction<Expositor>>
}

function ExpositorCard ({ expositor, setCurrentAction, formRef, setNewExpositor}:ExpositorCardProps) {
  const { name, image, description, bgImage } = expositor;
  return (
    <div className='rounded border border-gray-200 flex flex-col'>
      <div 
        className='rounded-t'
        style={{ width:'100%', backgroundImage:`url(${bgImage})`, height:150, backgroundPosition:'center', backgroundSize:'cover' }}
      />
      <div className='flex flex-col items-center' style={{ top:-30, position:'relative' }}>
        <img
          src={image}
          style={{ height:60, width:60, borderRadius:100 }}
          className='border border-gray-400 self-center mb-3'
        />
        <span>{name}</span>
        <small className='text-gray-400 mb-3'>{description}</small>
        <RoundedButton 
          color='gray-100' 
          icon={faPencil} 
          square={true} 
          style={{ fontSize:12 }} 
          action={() => { 
            setCurrentAction('edit'); 
            formRef.current?.focus();
            setNewExpositor(expositor);
          }}
        />
      </div>
    </div>
  )
}