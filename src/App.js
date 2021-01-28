import React,{useEffect} from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import './App.css';
import Sidebar from './features/sidebar/Sidebar';
import Chat from './features/chat/Chat';
import Login from './features/login/Login';
import { auth } from './features/firebase';
import { login, logout ,selectUser} from './features/userSlice';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        })
        );
      } else {
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <div className="app">
      {user ?
        <React.Fragment>
          <Sidebar />
          <Chat />
      </React.Fragment>
        :<Login/>}
    </div>
  );
}

export default App;
