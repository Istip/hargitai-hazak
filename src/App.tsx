import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Auth, Home, Navbar, House, NotFound } from './components/';
import { setUser } from './features/user/userSlice';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        };
        dispatch(setUser(data));
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate replace to="/" />}
        />
        <Route path="/houses/:id" element={<House />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
