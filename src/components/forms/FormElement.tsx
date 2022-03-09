// Modules
import { RefObject } from 'react'

type Props = {
  labelText: string;
  inputName: string;
  inputValue: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputOrTextarea?: 'input' | 'textarea';
  inputOnChange: any;
  isInputDisabled: boolean;
  moreMarginBottom?: boolean
  type?: 'text' | 'email' | 'number' | 'password'
}

// @Author: André Lizarán
// @Date: 05/03/2022
// @Description: Componente para la gestión de labels e inputs

export default function FormElement({ 
  labelText, 
  inputOrTextarea = 'input',
  inputValue,
  inputName,
  inputOnChange,
  isInputDisabled,
  moreMarginBottom,
  inputRef,
  type = 'text'
}:Props) {
  return (
    <div className='flex flex-col'>
      <label>{labelText}</label>
      { 
        inputOrTextarea === 'input' 
        ? 
        <input 
          className={`rounded border border-gray-400 px-4 py-2 text-md mt-1 focus:outline-none w-full ${moreMarginBottom ? 'mb-6' : 'mb-4'}`} 
          value={inputValue} 
          name={inputName} 
          onChange={inputOnChange}
          disabled={isInputDisabled}
          autoComplete='off'
          ref={inputRef}
          type={type}
        />
        :
        <textarea
          className={`rounded border border-gray-400 px-4 py-2 text-md mt-1 focus:outline-none w-full ${moreMarginBottom ? 'mb-6' : 'mb-4'}`} 
          value={inputValue} 
          name={inputName} 
          onChange={inputOnChange}
          disabled={isInputDisabled}
          rows={4}
          style={{ resize:'none' }}
          autoComplete='off'
        />
      }
    </div>
  )
}
