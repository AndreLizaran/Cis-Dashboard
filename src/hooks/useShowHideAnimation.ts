// Modules
import { useState } from 'react';

/**
* @author ANDRE LIZARAN 
* @description Hook que permite implementar animaciones a los componentes en los que se implemente
* @description initialAnimation: Animación cuando el componente se renderiza o aparece
* @description endAnimation: Animación cuando el componente se elimina u oculta
* @description currentShowComponents: Estado actual del componente, oculto o visible
* @description switchShowComponentAction: Acción que permitirá mostrar u ocultar un componente utilizando un estado o contexto
* @description extraOptions: En caso que para ocultar o mostrar un componente sea necesario mandar información extra
**/

export default function useSwitchShowComponents(
  initialAnimation:string, 
  endAnimation:string, 
  currentShowComponents:boolean,
  switchShowComponentAction:any,
  extraOptions?:any,
) {
  const [animation, setAnimation] = useState(initialAnimation);

  function switchAnimation () {
    if (currentShowComponents) {
      setAnimation(endAnimation);
      setTimeout(() => {
        extraOptions 
        ? switchShowComponentAction(extraOptions) 
        : switchShowComponentAction();
      }, 500)
    }
    else {
      extraOptions 
      ? switchShowComponentAction(extraOptions) 
      : switchShowComponentAction();
      setAnimation(initialAnimation);
    }
  }

  return {
    animation,
    switchAnimation
  }
}