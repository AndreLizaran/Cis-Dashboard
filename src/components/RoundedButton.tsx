// Modules
import { CSSProperties, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Props = {
  color:'red-600' | 'gray-100' | 'purple-600' | 'gray-800' | 'blue-500' | 'gray-300' | 'transparent';
  type?:'button' | 'submit';
  text?:string;
  icon?:IconDefinition;
  style?: CSSProperties;
  className?:string;
  hover?: boolean;
  square?: boolean; 
  action?: () => void;
}

export default function RoundedButton({ 
  color, 
  text, 
  icon, 
  type = 'button', 
  className, 
  style = {}, 
  action = () => {},
  hover = true,
  square = false,
}:Props) {

  const buttonColors = useRef(getColorButton());

  function getColorButton () {
    switch (color) {
      case 'red-600':
        return `bg-red-600 text-white ${hover && 'hover:bg-red-500'}`;
      case 'gray-100':
        return `bg-gray-100 text-black ${hover && 'hover:bg-gray-50'}`;
      case 'gray-300':
        return `bg-gray-300 text-black ${hover && 'hover:bg-gray-200'}`;
      case 'purple-600':
        return `bg-purple-600 text-white ${hover && 'hover:bg-purple-500'}`;
      case 'gray-800':
        return `bg-gray-800 text-white ${hover && 'hover:bg-gray-700'}`;
      case 'blue-500':
        return `bg-blue-500 text-white ${hover && 'hover:bg-blue-400'}`;
      case 'transparent':
        return 'hover:bg-gray-100 text-black'
    }
  }

  return (
    <button 
      className={`rounded font-semibold focus:outline-none transition ${!square && 'px-4 py-2'} ${buttonColors.current} ${className}`}
      style={square ? { height:40, width:40, ...style } : { ...style }}
      type={type}
      onClick={() => action()}
    >
      { text && text }
      { icon && <FontAwesomeIcon icon={icon}/> }
    </button>
  )
}