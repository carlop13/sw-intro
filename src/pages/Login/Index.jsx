import React, { useState } from 'react';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica para autenticar al usuario
        console.log('Iniciando sesión con:', email, password);
    };

    return (
        <div className="login-container">
            <img
                src="/img/1024.png"
                alt="Logo"
                className="login-logo"
            />
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
                </form>
            </div>
        </div>
    );
}

export default Login;
