import { Navigate } from 'react-router-dom'
import { APP_ROUTES } from '../../shared/constants/routes'

export default function HomePage() {
  return <Navigate to={APP_ROUTES.ADS} />
}
