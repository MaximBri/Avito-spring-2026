import { createBrowserRouter } from 'react-router-dom'
import HomePage from '../../pages/home'
import AdsPage from '../../pages/ads'
import { OneAds } from '../../pages/one-ads/OneAds'
import { APP_ROUTES } from '../../shared/constants/routes'
import { EditAdsPage } from '../../pages/edit-ads/EditAdsPage'

export const router = createBrowserRouter([
  {
    path: APP_ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: APP_ROUTES.ADS,
    element: <AdsPage />,
  },
  {
    path: APP_ROUTES.ONE_ADS,
    element: <OneAds />,
  },
  { path: APP_ROUTES.EDIT_ADS, element: <EditAdsPage /> },
])
