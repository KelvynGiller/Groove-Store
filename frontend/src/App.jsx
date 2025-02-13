import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart } from './slices/CartSlice';
import { auth } from './utils/firebase';
import AppRoutes from './routes';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(fetchCart(user.uid));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;