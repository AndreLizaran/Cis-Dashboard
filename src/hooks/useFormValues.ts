import React, { useState } from 'react'

export default function useFormValues(initialState:any) {
  
  const [inputValues, setInputValues] = useState(initialState);

  function handleInputs (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = e.currentTarget;
    setInputValues({ ...inputValues, [name]:value });
  }

  return {
    handleInputs,
    inputValues,
    setInputValues
  } 
}
