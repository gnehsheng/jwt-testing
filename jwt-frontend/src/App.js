import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';

const Home = () => {
  return "Home"
}

const Post = () => {
  return "Posts"
}

const Login = () => {
  const handleLogin = () => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: 'gnehsheng', password: '123' })
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
  }
  return <button onClick={handleLogin}>Login</button>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<Post />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
