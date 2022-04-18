import { onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { auth } from './fireabse/config';
import Auth from './Screens/Auth/Auth';
import Home from './Screens/Home/Home';

function App() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User', user);
    } else {
      console.log('USer Sign Out');
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
