// MOdules
import { useState } from 'react';

// Components
import NewElementForm from '../../components/NewElementForm';
import FormElement from '../../components/forms/FormElement';
import InformationContainer from '../../components/InformationContainer';
import HeaderDashboardScreens from '../../components/HeaderDashboardScreens';

// Icons
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeInUp } from '../../classes';

// Hooks
import useFormValues from '../../hooks/useFormValues';
import AnimationContainer from '../../components/shared/AnimationContainer';
import GeneralContainer from '../../components/shared/GeneralContainer';

type NewForm = {
  title: string;
  shortDescription: string;
  longDescription: string;
  type: string;
}

const initialStateForm:NewForm = {
  title: '',
  shortDescription: '',
  longDescription: '',
  type: ''
}

// @Author: André Lizarán
// @Date: 05/03/2022
// @Description: Se inició la pantalla para crear noticias, falta definir información que será manejada

export default function News() {

  return (
    <GeneralContainer>
      <HeaderDashboardScreens headerText='Noticias' action={() => {}}/>
      <AnimationContainer animation='fadeInUp'>
        <NewsContainers/>
        <FormNews/>
      </AnimationContainer>
    </GeneralContainer>
  )
}

function NewsContainers () {
  return (
    <InformationContainer
      headerColor='bg-gray-800'
      headerIcon={faNewspaper}
      headerText='Noticias'
    >
    </InformationContainer>
  )
}


function FormNews () {

  const { handleInputs, inputValues } = useFormValues(initialStateForm);
  const { title, longDescription, shortDescription } = inputValues as NewForm;
  const [ currentAction, setCurrentAction ] = useState<'create' | 'edit'>('create');

  return (
    <InformationContainer
      headerColor='bg-gray-800'
      headerIcon={faNewspaper}
      headerText='Registrar nueva noticia'
      maxHeight={false}
    >
      <NewElementForm
        saveButtonText='Guardar noticia'
        deleteText='Eliminar noticia'
        isLoading={false}
        action={currentAction}
        setAction={setCurrentAction}
        saveFunction={() => {}}
        editAction={() => {}}
        cleanAction={() => {}}
        deleteAction={() => {}}
      >
        <FormElement 
          inputName='title' 
          inputOnChange={handleInputs} 
          inputValue={title} 
          isInputDisabled={false} 
          labelText='Título' 
        />
        <FormElement 
          inputName='shortDescription' 
          inputOnChange={handleInputs} 
          inputValue={shortDescription} 
          isInputDisabled={false} 
          labelText='Descripción corta' 
        />
        <FormElement 
          inputName='longDescription' 
          inputOnChange={handleInputs} 
          inputValue={longDescription} 
          isInputDisabled={false} 
          labelText='Descripción larga' 
          inputOrTextarea='textarea'
        />
      </NewElementForm>
    </InformationContainer>
  )
}