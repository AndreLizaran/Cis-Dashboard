// Classes
import { lightInput } from '../../classes';

type Props = {
  values: { value:number, label:string }[];
  labelText:string;
}

export default function SelectElement({ values, labelText }:Props) {
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
