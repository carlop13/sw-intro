import { useState, useEffect } from 'react';
import { Card, Col, Row,Button } from 'antd';
import img1 from '../../assets/boston1.jpg'
import img2 from '../../assets/boston2.jpeg'
import img3 from '../../assets/boston3.jpeg'
import img4 from '../../assets/perrolentes.JFIF'
import img5 from '../../assets/cielo.JFIF'
import img6 from '../../assets/saltar.JFIF'
import CardPublic from '../../components/CardPublic.jsx';
import CreatePublic from '../../components/CreatePublic.jsx';
import { getPublicaciones } from '../../services/publicacionesService';
import { getToken, onMessage } from 'firebase/messaging';
import { messaging } from '../../firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Meta } = Card;

import './App.css'



function App() {

  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const data = await getPublicaciones();
        setPublicaciones(data);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleCreatePost = (newPost) => {
    setPublicaciones([...publicaciones, newPost]);
  };

  const getTokenNotification = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: 'BDQgXyJdlazEPI-f0fCOt5Mqi7ead-HbDk4CCzXcEp5ysYaHlD2NK52MSaqggqFgClnO2EeGXZlvjr7rwR0CVCE'
      });

      if (token) {
        console.log("Token:", token);
      } else {
        console.log("No se pudo obtener el token");
      }
    } catch (error) {
      console.error("Error obteniendo el token:", error);
    }
  };

  const notificarme = async () => {
    if (!window.Notification) {
      console.log('Este navegador no soporta notificaciones');
      return;
    }

    if (Notification.permission === 'granted') {
      await getTokenNotification();
    } else if (Notification.permission !== 'denied' && Notification.permission !== 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await getTokenNotification();
      }
    }
  };

  useEffect(() => {
    notificarme();
    onMessage(messaging, (message) => {
      console.log('Mensaje recibido:', message);
      toast(message.notification?.title || 'Nueva notificación');
    });
  }, []);

  return (
    <>
      <ToastContainer />
<div className="container">
      <div className="create-section">
        <CreatePublic onCreatePost={handleCreatePost} />
        <Button type="primary">
            Enviar mensaje
          </Button>
      </div>
      <Row gutter={16}>
        {publicaciones.map((pub, index) => (
          <Col span={8} key={index}>
            <div className="card-public">
              <CardPublic publicacion={pub} />
            </div>
          </Col>
        ))}
      </Row>
    </div>

</>
  )
}

export default App
