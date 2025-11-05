import useAuth from '@/context/useAuth'

const RoleBasedView = ({ adminComponent, mortalComponent }) => {
  const auth = useAuth()

  return auth.user.rol === 'admin' ? adminComponent : mortalComponent
}

export default RoleBasedView
