import { ReactNode } from 'react'

type Props = {
  className?:string;
  children:ReactNode
}

export default function Label({ className = '', children }:Props) {
  return <label className={`${className} mb-1`}>{children}</label>
}
