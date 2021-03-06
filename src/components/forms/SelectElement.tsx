// Classes
import { lightInput } from '../../classes';

type Props = {
  labelText:string;
  values: { value:number, label:string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

// @Author: André Lizarán
// @Date: 08/03/2022
// @Description: Componente select

export default function SelectElement({ labelText, values, onChange }:Props) {
  return (
    <div className='flex flex-col'>
      <label>{labelText}</label>
      <select className={lightInput} onChange={onChange}>
        {values.map((value) => <option value={value.value} key={value.value}>{value.label}</option>)}
      </select>
    </div>
  )
}
