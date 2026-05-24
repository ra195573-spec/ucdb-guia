import React from 'react';
import { IonApp, setupIonicReact } from '@ionic/react';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import UCDBGuia from './pages/UCDBGuia';

setupIonicReact();

const App: React.FC = () => {
  const { usuario, login, logout, erroLogin } = useAuth();

  return (
    <IonApp>
      {usuario ? (
        <UCDBGuia usuario={usuario} onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} erro={erroLogin} />
      )}
    </IonApp>
  );
};

export default App;
