import { Route } from 'react-location'
import Login from '../pages/login'
import DefaultRoute from '../components/authorization/molecules/default-route'
import PublicRoute from '../components/authorization/molecules/public-route'
import ProtectedRoute
  from '../components/authorization/molecules/protected-route'
import Main from '../pages/main'
import Register from '../pages/register'

const routeDeclarations: Route[] = [
  {
    path: '/',
    element: <DefaultRoute/>,
  }, {
    path: '/login',
    element: <PublicRoute><Login/></PublicRoute>,
  }, {
    path: '/main',
    element: <ProtectedRoute><Main/></ProtectedRoute>,
  }, {
    path: '/register',
    element: <PublicRoute><Register /></PublicRoute>
  }]

export default routeDeclarations

