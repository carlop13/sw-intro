import React, { useState } from 'react';
import './Login.css';
import { API_URL } from '../../utils/constans';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/getin/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sesión iniciada:', data);

                // Guardar el token en localStorage y redirigir al usuario
                localStorage.setItem('token', data.token);
                navigate('/publicaciones');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setError('Error en la conexión');
        }
    };

    return (
        <div className="login-container">
            <img src="/img/1024.png" alt="Logo" className="login-logo" />
            <div className="login-form">
                <h1>Iniciar Sesión</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
