import React from "react";
import {useRoutes} from 'react-router-dom'
import Home from '../pages/Home/Index.jsx';
import Perfil from '../pages/Perfil/Index.jsx';
import Publicaciones from '../pages/Publicaciones/Index.jsx';
import Login from '../pages/Login/Index.jsx';
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const AppRoutes = () => {
    let routers = useRoutes([
        { path: '/', element: <Home /> },
        { 
            path: '/perfil', 
            element: (
                <ProtectedRoute>
                    <Perfil />
                </ProtectedRoute>
            )
        },
        { 
            path: '/publicaciones', 
            element: (
                <ProtectedRoute>
                    <Publicaciones />
                </ProtectedRoute>
            ) 
        },
        { path: '/login', element: <Login /> },
    ])
    return routers;
}

export default AppRoutes;