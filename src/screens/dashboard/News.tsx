// Components
import HeaderDashboardScreens from '../../components/HeaderDashboardScreens';
import InformationContainer from '../../components/InformationContainer';

// Icons
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeInUp } from '../../classes';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';

export default function Expositores() {

  const { state } = useUIContext();

  return (
    <div className='flex flex-col'>
      <HeaderDashboardScreens headerText='Noticias' action={() => {}}/>
      <div className={`flex flex-col gap-6 ${fadeInUp}`}>
        <InformationContainer
          headerColor='bg-gray-800'
          headerIcon={faNewspaper}
          headerText='Noticias'
        >
        </InformationContainer>
        <InformationContainer
          headerColor='bg-gray-800'
          headerIcon={faNewspaper}
          headerText='Registrar nueva noticia'
        >
        </InformationContainer>
      </div>
    </div>
  )
}