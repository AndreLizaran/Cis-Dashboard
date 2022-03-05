// Modules
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';

// Icons
import { 
  faPencil, 
  faPlus, 
  faUserCheck
} from '@fortawesome/free-solid-svg-icons'

// Api
import { Expositor } from '../../api';

// Components
import H2 from '../../components/H2'
import FileButton from '../../components/FileButton';
import ImageViewer from '../../components/ImageViewer';
import RoundedButton from '../../components/RoundedButton'
import NewElementForm from '../../components/NewElementForm';
import InformationContainer from '../../components/InformationContainer';

// Hooks
import { useGetData } from '../../hooks/useGetData';
import useProcessImage from '../../hooks/useProcessImage';
import { useUIContext } from '../../hooks/useCustomContext';

// Classes
import { fadeInUp, lightInput } from '../../classes';

const initialState:Expositor = {
  id:0,
  name:'',
  description: '',
  profileImage: '',
  coverImage: ''
}

// Componente general
export default function Expositores() {

  const { state } = useUIContext();
  const { showDashboardBar } = state;
  const [ sourceImageViewer, setSourceImageViewer ] = useState('');
  const [ newExpositor, setNewExpositor ] = useState<Expositor>(initialState);
  const [ currentAction, setCurrentAction ] = useState<'create' | 'edit'>('create');
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
              setSourceImageViewer={setSourceImageViewer} 
              formRef={formRef}
              currentAction={currentAction}
              setCurrentAction={setCurrentAction}
              newExpositor={newExpositor}
              setNewExpositor={setNewExpositor}
            />
          </InformationContainer>
        </div>
      </div>
      {sourceImageViewer && <ImageViewer img={sourceImageViewer} setImg={setSourceImageViewer}/>}
    </>
  )
}


type NewExpositorFormProps = {
  setSourceImageViewer: Dispatch<SetStateAction<string>>
  formRef: RefObject<HTMLInputElement>
  currentAction: 'create' | 'edit'
  setCurrentAction: Dispatch<SetStateAction<"create" | "edit">>
  newExpositor: Expositor
  setNewExpositor: Dispatch<SetStateAction<Expositor>>
}

// Formulario
function NewExpositorForm ({ formRef, currentAction, setCurrentAction, newExpositor, setNewExpositor, setSourceImageViewer }:NewExpositorFormProps) {

  const { name, description, id, coverImage:coverSavedImage, profileImage:profileSavedImage } = newExpositor;
  const { switchAlert } = useUIContext();
  const [ coverImage, setCoverImage ] = useState<File>();
  const [ profileImage, setProfileImage ] = useState<File>();
  const { saveImageOnFirebase } = useProcessImage();
  const [ isSavingNewExpositor, setIsSavingNewExpositor ] = useState(false);

  const {
    useEditExpositor,
    useSaveNewExpositor,
    useDeleteExpositor
  } = useGetData();

  const { mutateAsync:mutateEdit } = useEditExpositor();
  const { mutateAsync:mutateCreate } = useSaveNewExpositor();
  const { mutateAsync:mutateDelete } = useDeleteExpositor();

  async function saveNewExpositor () {
    if (!validateExpositorInformation()) return;
    try {
      setIsSavingNewExpositor(true);
      const responseCoverImage = await saveImageOnFirebase(coverImage!, `${name}-cover-expositor`);
      const responseProfileImage = await saveImageOnFirebase(profileImage!, `${name}-profile-expositor`);
      await mutateCreate({ 
        description,
        name,
        coverImage:responseCoverImage, 
        profileImage:responseProfileImage 
      });
      switchAlert({
        alert:'Nuevo expositor guardado',
        color:'bg-blue-600',
      });
      window.scrollTo({ top:0, behavior:'smooth' });
      setNewExpositor(initialState);
      setIsSavingNewExpositor(false);
      setCoverImage(undefined);
      setProfileImage(undefined);
    } catch (error:any) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
      setIsSavingNewExpositor(false);
    }
  }

  async function editExpositor () {
    if (!validateExpositorInformation()) return;
    try {
      setIsSavingNewExpositor(true);
      if (profileImage && coverImage) {
        const responseCoverImage = await saveImageOnFirebase(coverImage!, `${name}-cover-expositor`);
        const responseProfileImage = await saveImageOnFirebase(profileImage!, `${name}-profile-expositor`);
        mutateEdit({ 
          ...newExpositor, 
          profileImage: responseProfileImage,
          coverImage: responseCoverImage
        });
        setCoverImage(undefined);
        setProfileImage(undefined);
      } else if (profileImage) {
        const responseProfileImage = await saveImageOnFirebase(profileImage!, `${name}-profile-expositor`);
        mutateEdit({ 
          ...newExpositor, 
          profileImage: responseProfileImage,
        });
        setProfileImage(undefined);
      } else if (coverImage) {
        const responseCoverImage = await saveImageOnFirebase(coverImage!, `${name}-cover-expositor`);
        mutateEdit({ 
          ...newExpositor, 
          coverImage: responseCoverImage
        });
        setCoverImage(undefined);
      } else {
        mutateEdit(newExpositor);
      }
      switchAlert({
        alert:'Expositor editado',
        color:'bg-blue-600',
      });
      setNewExpositor(initialState);
      window.scrollTo({ top:0, behavior:'smooth' });
      setCurrentAction('create');
      setIsSavingNewExpositor(false);
    } catch (error:any) {
      switchAlert({ 
        alert:'Ha ocurrido un error, inténtalo más tarde', 
        color:'bg-red-600', 
      });
      setIsSavingNewExpositor(false);
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
    if (!name || !description || (!coverImage && !coverSavedImage) || (!profileImage && !profileSavedImage)) {
      switchAlert({ 
        alert:'Ingresa todos los datos del expositor', 
        color:'bg-red-600', 
      });
      return false;
    } else return true;
  }

  function cleanForm () { setNewExpositor(initialState) }

  return (
    <NewElementForm 
      saveButtonText='Guardar expositor' 
      saveFunction={currentAction === 'create' ? saveNewExpositor : editExpositor} 
      isLoading={isSavingNewExpositor} 
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
        <FileButton img={profileImage} setImg={setProfileImage} setSourceImageViewer={setSourceImageViewer}/>
      </div>
      <div className='flex flex-col'>
        <label className='mb-1'>Foto de portada</label>
        <FileButton img={coverImage} setImg={setCoverImage} setSourceImageViewer={setSourceImageViewer}/>
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
  const { name, profileImage, description, coverImage, id } = expositor;
  return (
    <div className='rounded border border-gray-200 flex flex-col'>
      <div 
        className='rounded-t'
        style={{ width:'100%', backgroundImage:`url(${coverImage})`, height:150, backgroundPosition:'center', backgroundSize:'cover' }}
      />
      <div className='flex flex-col items-center' style={{ top:-30, position:'relative' }}>
        <img
          src={profileImage}
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