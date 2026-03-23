import { type CSSProperties, type FC, type ReactNode } from 'react'

interface FieldWrapperProps {
  children: ReactNode
  styles?: CSSProperties
}

export const FieldWrapper: FC<FieldWrapperProps> = ({ children, styles }) => {
  return (
    <div
      style={{
        borderBottom: '1px solid #F0F0F0',
        paddingBottom: 18,
        ...styles,
      }}
    >
      {children}
    </div>
  )
}
