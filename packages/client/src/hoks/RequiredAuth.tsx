import { useAuth } from 'hooks/auth/useAuth'
import { memo, useEffect } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isEmptyObjField } from 'utils/isEmptyObject'
import { Routes } from 'utils/routes'
import { Routes as Paths } from 'utils/routes'
import * as Pages from 'pages'

export const RequiredAuth = memo(({ children }: { children: JSX.Element }) => {
  const [{ user }] = useAuth()
  let { pathname } = useLocation()

  if (isEmptyObjField(user))
    return (
      <Navigate to={`/${Routes.Login}`} replace state={{ from: pathname }} />
    )
  return children
  // if (isEmptyObjField(user)) {
  //   state = pathname
  //   return <Pages.Login />
  // }
  // return children
})

// export const withAuth = (WrappedComponent: React.ComponentType<unknown>) => {
//   return (props: Record<string, unknown>) => {
//     const navigate = useNavigate()
//     const [{ user }] = useAuth()

//     useEffect(() => {
//       if (isEmptyObjField(user)) {
//         navigate(Paths.Login)
//       }
//     }, [user])

//     return <WrappedComponent {...props} />
//   }
// }
