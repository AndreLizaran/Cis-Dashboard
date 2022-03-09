// Classes
import { lightInput } from '../../classes';

type Props = {
  labelText:string;
  values: { value:number, label:string }[];
}

// @Author: André Lizarán
// @Date: 08/03/2022
// @Description: Componente select

export default function SelectElement({ labelText, values }:Props) {
  return (
    <div className='flex flex-col'>
      <label>{labelText}</label>
      <select className={lightInput}>
        <option disabled={true} selected={true}>Selecciona una opción</option>
        {values.map((value) => <option value={value.value} key={value.value}>{value.label}</option>)}
      </select>
    </div>
  )
}
