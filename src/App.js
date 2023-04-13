import Home              from './routes/home/home.component';
import Navigation        from './routes/navigation/navigation.component';
import Authentification  from './routes/authentification/authentification.component';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home />} />
        <Route path='sign-in' element={<Authentification />} />
      </Route>
    </Routes>
  );
};

export default App;
