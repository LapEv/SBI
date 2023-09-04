import { useAuth } from 'hooks/auth/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import { Routes } from 'utils/routes'

export function RequiredAuth({ children }: { children: JSX.Element }) {
  const [{ user }] = useAuth()
  const { pathname } = useLocation()

  if (!user)
    return (
      <Navigate to={`/${Routes.Login}`} replace state={{ from: pathname }} />
    )
  return children
}
