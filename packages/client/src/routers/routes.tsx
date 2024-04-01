import { RouteObject } from 'react-router-dom'
import { Routes as Paths } from 'utils/routes'
import * as Pages from 'pages'

export const routes: RouteObject[] = [
  { path: Paths.Index, element: <Pages.Login /> },
  { path: Paths.Profile, element: <Pages.Profile /> },
  { path: Paths.Incidents, element: <Pages.Incidents /> },
]
