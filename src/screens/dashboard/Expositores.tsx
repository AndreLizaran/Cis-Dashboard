// Modules
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
// @ts-ignore
import InputFiles from 'react-input-files';
import { faImage, faPencil, faPlus, faTimes, faTrash, faUpload, faUserCheck } from '@fortawesome/free-solid-svg-icons'

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
import { useGetExpositores, useSaveNewExpositor } from '../../hooks/useGetData';

// Classes
import { lightInput } from '../../classes';

export default function Expositores() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const [img, setImg] = useState('');
  const formRef = useRef<HTMLInputElement>(null);

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
            <NewExpositorForm setImg={setImg} formRef={formRef}/>
          </InformationContainer>
        </div>
      </div>
      {img && <ImageViewer img={img} setImg={setImg}/>}
    </>
  )
}

const initialState = {
  name:'',
  description: '',
  profilePic: '',
  backgroundPic: ''
}

type NewExpositorFormProps = {
  setImg:Dispatch<SetStateAction<string>>
  formRef:RefObject<HTMLInputElement>
}

function NewExpositorForm ({ setImg, formRef }:NewExpositorFormProps) {

  const { getImageFromFileInput } = useProcessImage();
  const { mutate, isLoading } = useSaveNewExpositor();
  const { setAlertInformation } = useUIContext();
  const [newExpositor, setNewExpositor] = useState(initialState);

  const {
    name, description, profilePic, backgroundPic
  } = newExpositor;

  function saveNewExpositor () {
    if (!name || !description || !profilePic || !backgroundPic) {
      setAlertInformation({ 
        alert:'Ingresa todos los datos del expositor', 
        color:'bg-red-600', 
      });
      return;
    }
    try {
      mutate({ name, description, image:profilePic, bgImage:backgroundPic, id:7 });
      setAlertInformation({
        alert:'Nuevo expositor guardado',
        color:'bg-blue-600',
      });
      setNewExpositor(initialState);
    } catch (error:any) {
      setAlertInformation({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
    }
  }

  async function processImage (event:any, image:'pp' | 'bg') {
    const imageProcessed = await getImageFromFileInput(event) as string;
    (image === 'bg' && imageProcessed) 
      ?
      setNewExpositor({ ...newExpositor, backgroundPic:imageProcessed })
      : 
      setNewExpositor({ ...newExpositor, profilePic:imageProcessed })
  }

  function cleanImage (image: 'pp' | 'bg') {
    (image === 'bg') 
      ?
      setNewExpositor({ ...newExpositor, backgroundPic:'' })
      :
      setNewExpositor({ ...newExpositor, profilePic:'' })
  }

  return (
    <NewElementForm saveButtonText='Guardar expositor' saveFunction={() => saveNewExpositor()} isLoading={isLoading}>
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
          {profilePic && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(profilePic)}/>}
          {profilePic && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => cleanImage('pp')}/>}
        </div> 
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de portada</label>
        <div className='flex gap-6'>
          <InputFiles   onChange={(files:any, event:any) => processImage(event, 'bg')}s style={{ width:'33%' }}>
            <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
          </InputFiles>
          {backgroundPic && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(backgroundPic)}/>}
          {backgroundPic && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => cleanImage('bg')}/>}
        </div> 
      </div>
    </NewElementForm>
  )
}

function ExpositoresList () {
  const { data } = useGetExpositores();
  const { state:{ showDashboardBar }} = useUIContext();
  return (
    <div className={`flex flex-col gap-6 ${!showDashboardBar ? 'xl:grid xl:grid-cols-2' : ''}`}>
      {data?.map((expositor, index) => <ExpositorCard expositor={expositor} key={index}/>)}
    </div>
  )
}

type ExpositorCardProps = {
  expositor:Expositor
}

function ExpositorCard ({ expositor:{ name, image, description, bgImage }}:ExpositorCardProps) {
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
        <div className='flex gap-3'>
          <RoundedButton color='gray-100' icon={faTrash} square={true} style={{ fontSize:12 }}/>
          <RoundedButton color='gray-100' icon={faPencil} square={true} style={{ fontSize:12 }}/>
        </div>
      </div>
    </div>
  )
}