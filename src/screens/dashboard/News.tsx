// Components
import HeaderDashboardScreens from '../../components/HeaderDashboardScreens';

// Hooks
import { useUIContext } from '../../hooks/useCustomContext';

export default function Expositores() {

  const { state } = useUIContext();

  return (
    <>
      <HeaderDashboardScreens headerText='Noticias' action={() => {}}/>
    </>
  )
}