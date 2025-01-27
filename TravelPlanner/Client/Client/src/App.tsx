import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import MainPage from './components/MainPage';
import { BrowserRouter } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
        <Register />
        <Login />
    </BrowserRouter>
    );
}

export default App;
