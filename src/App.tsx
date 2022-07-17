import { Router } from 'react-location';
import location from './configurations/react-location';
import routeDeclarations from './constants/route-declarations';
import AuthProvider from './components/authorization/molecules/auth-provider';
import { useEffect } from 'react';
import 'nprogress/nprogress.css';
import nProgress from 'nprogress';
import { QueryClient, QueryClientProvider } from 'react-query';

const NProgress = () => {
  useEffect(() => {
    console.log('nprogress start');
    nProgress.start();
    return () => {
      console.log('nprogress done');
      nProgress.done();
    };
  }, []);
  return <></>;
};

export const client = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <Router
          location={location}
          defaultPendingMs={0}
          defaultPendingElement={<NProgress />}
          routes={routeDeclarations}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
