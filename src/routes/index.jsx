import React from "react";
import {useRoutes} from 'react-router-dom'
import Home from '../pages/Home/Index.jsx';
import Perfil from '../pages/Perfil/Index.jsx';
import Publicaciones from '../pages/Publicaciones/Index.jsx';
import Login from '../pages/Login/Index.jsx';

const AppRoutes = () => {
    let routers = useRoutes([
        { path: '/', element: <Home /> },
        { path: '/perfil', element: <Perfil /> },
        { path: '/publicaciones', element: <Publicaciones /> },
        { path: '/login', element: <Login /> },
    ])
    return routers;
}

export default AppRoutes;