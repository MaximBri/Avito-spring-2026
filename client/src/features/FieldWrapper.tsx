import { type FC, type ReactNode } from 'react'

interface FieldWrapperProps {
  children: ReactNode
}

export const FieldWrapper: FC<FieldWrapperProps> = ({ children }) => {
  return (
    <div style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: 18 }}>
      {children}
    </div>
  )
}
