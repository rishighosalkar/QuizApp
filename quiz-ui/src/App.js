import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Authenticate from './components/Authenticate';
import Layout from './components/Layout';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Question from './components/Question/Question';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
    {/* <Navbar /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Authenticate />}>
          <Route path="/" element={<Layout />}> 
          {/* <Route path="/" element={<Layout />} /> */}
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/question" element={<Question />} />
          </Route> 
        </Route>
      </Routes>
    </BrowserRouter >
    </>
  );
}

export default App;
