// MOdules
import { useState } from 'react';

// Components
import InformationContainer from '../../components/InformationContainer';
import HeaderDashboardScreens from '../../components/HeaderDashboardScreens';

// Icons
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeInUp } from '../../classes';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';
import FormElement from '../../components/forms/FormElement';
import useFormValues from '../../hooks/useFormValues';

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

  const { state } = useUIContext();

  return (
    <div className='flex flex-col'>
      <HeaderDashboardScreens headerText='Noticias' action={() => {}}/>
      <div className={`flex flex-col gap-6 ${fadeInUp}`}>
        <NewsContainers/>
        <FormNews/>
      </div>
    </div>
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
  const { title, longDescription, shortDescription, type } = inputValues as NewForm;

  return (
    <InformationContainer
      headerColor='bg-gray-800'
      headerIcon={faNewspaper}
      headerText='Registrar nueva noticia'
      maxHeight={false}
    >
      <form className='flex flex-col'>
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
      </form>
    </InformationContainer>
  )
}