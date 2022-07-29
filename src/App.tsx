import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Auth, Home, Navbar, House, NotFound, Profile } from './components/';
import { setUser } from './features/user/userSlice';
import { auth, db } from './firebase';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = await getDoc(doc(db, 'users', user.uid));
        const response = userRef.data();
        const data = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
          admin: response!.admin,
          createdAt: response!.createdAt,
          houses: response!.houses,
        };
        return dispatch(setUser(data));
      }

      dispatch(setUser(null));
    });
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth"
          element={user ? <Navigate replace to="/" /> : <Auth />}
        />
        <Route path="/houses/:id" element={<House />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate replace to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
