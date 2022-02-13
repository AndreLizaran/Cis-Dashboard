// Modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Types
import { EventType } from '../../api';

type Props = {
  title:string;
  titleColor?:string;
  titleIcon?:IconDefinition;
  loading:boolean;
  data:EventType[]
}

export default function InformationContainer({ 
  title, 
  titleColor = 'gray-800', 
  titleIcon,
  loading,
  data
}:Props) {
  return (
    <div className='rounded'> 
      <div className={`rounded-t px-4 py-3 flex items-center justify-between ${titleColor && `bg-${titleColor}`} text-white`}>
        <h2>{title}</h2>
        {titleIcon && <FontAwesomeIcon icon={titleIcon}/>}
      </div>
      <div className='p-4 bg-white rounded-b drop-shadow flex justify-center'>
        {loading 
        ? <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
        : <EventList data={data} titleColor={titleColor}/>
        }
      </div>
    </div>
  )
}

type EventListProps = {
  data:EventType[];
  titleColor:string
}

function EventList ({ data, titleColor }:EventListProps) {
  return (
    <div className='flex flex-col gap-6 w-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-6' style={{ maxHeight:200 }}>
      {data.map((event) => (
        <div className='flex flex-col border border-gray-200 rounded p-4 w-full'>
          <div className='mb-4 flex justify-between'>
            <h2 className='font-semibold'>{event.eventName}</h2>
            <FontAwesomeIcon icon={faEllipsis}/>
          </div>
          <div className='flex items-center'>
            <img src={event.image} style={{ height:50, width:50, borderRadius:100 }} className={`border border-${titleColor}`}/>
            <div className='flex flex-col px-4'>
              <small className='text-sm'>{event.name}</small>
            </div>
            <div className='flex flex-col pl-4 border-l border-gray-200'>
              <small className='text-sm'>Día: {event.day}</small>
              <small className='text-sm'>Hora: {event.hour}</small>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
