import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../../pages/home'
import AdsPage from '../../pages/ads'
import { APP_ROUTES } from '../../shared/constants/routes'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: APP_ROUTES.ADS,
    element: <AdsPage />,
  },
])
