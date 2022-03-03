import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode;
  color: string;
  textColor:string;
}

export default function SimpleAlert({ children, color, textColor }:Props) {
  return (
    <span className={`${color} ${textColor} py-3 px-4 rounded text-center`}>{children}</span>
  )
}
