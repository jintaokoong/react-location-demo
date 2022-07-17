import { Router } from 'react-location'
import location from './configurations/react-location'
import routeDeclarations from './constants/route-declarations'
import AuthProvider from './components/authorization/molecules/auth-provider'
import { useEffect } from 'react'
import 'nprogress/nprogress.css';
import nProgress from 'nprogress'

const NProgress = () => {
  useEffect(() => {
    console.log('nprogress start');
    nProgress.start();
    return () => {
      console.log('nprogress done');
      nProgress.done();
    }
  }, [])
  return <></>
}

function App() {
  return (
    <AuthProvider>
      <Router
        location={location}
        defaultPendingMs={0}
        defaultPendingElement={<NProgress />}
        routes={routeDeclarations}
      />
    </AuthProvider>
  )
}

export default App
