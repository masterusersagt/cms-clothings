import { Outlet } from 'react-router-dom'
import DirectoryMenu from '../../components/directory-menu/directory-menu.component';

const Home = () => {
  return (
    <div>
      <DirectoryMenu />
      <Outlet />
    </div>
  );
};

export default Home;
