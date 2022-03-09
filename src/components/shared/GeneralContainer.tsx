// Modules
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function GeneralContainer({ children }:Props) {
  return <div className='flex flex-col'>{children}</div>
}
