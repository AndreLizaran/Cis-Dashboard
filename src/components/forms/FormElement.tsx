import { RefObject } from 'react'
import { lightInput } from '../../classes';

type Props = {
  labelText: string;
  inputName: string;
  inputValue: string;
  inputRef?: RefObject<HTMLInputElement>;
  inputOrTextarea?: 'input' | 'textarea';
  inputOnChange: any;
  isInputDisabled: boolean;
  moreMarginBottom?: boolean
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
  moreMarginBottom
}:Props) {
  return (
    <div className='flex flex-col'>
      <label>{labelText}</label>
      { 
        inputOrTextarea === 'input' 
        ? 
        <input 
          className={`${lightInput} ${moreMarginBottom ? 'mb-6' : 'mb-4'}`} 
          value={inputValue} 
          name={inputName} 
          onChange={inputOnChange}
          disabled={isInputDisabled}
          autoComplete='off'
        />
        :
        <textarea
          className={`${lightInput} ${moreMarginBottom ? 'mb-6' : 'mb-4'}`} 
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
