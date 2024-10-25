import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import img1 from '../../assets/boston1.jpg'
import img2 from '../../assets/boston2.jpeg'
import img3 from '../../assets/boston3.jpeg'
import img4 from '../../assets/perrolentes.JFIF'
import img5 from '../../assets/cielo.JFIF'
import img6 from '../../assets/saltar.JFIF'
import CardPublic from '../../components/CardPublic.jsx';
import CreatePublic from '../../components/CreatePublic.jsx';
import { getPublicaciones } from '../../services/publicacionesService';

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


  return (
    <>

<div className="container">
      <div className="create-section">
        <CreatePublic onCreatePost={handleCreatePost} />
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

{/*}
    <Row gutter={16}>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img src={img1} />}
        >
          <Meta title="Boston café" description="www.instagram.com" />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img src={img2} />}
        >
          <Meta title="Boston en la nieve" description="www.instagram.com" />
        </Card>
      </Col>
      <Col span={8}>
        <Card
          hoverable
          style={{
            width: 240,
          }}
          cover={<img src={img3} />}
        >
          <Meta title="Boston en otoño" description="www.instagram.com" />
        </Card>
      </Col>
    </Row>

<Row gutter={16}>
<Col span={8}>
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img src={img4} />}
  >
    <Meta title="Boston café" description="www.instagram.com" />
  </Card>
</Col>
<Col span={8}>
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img src={img5} />}
  >
    <Meta title="Boston en la nieve" description="www.instagram.com" />
  </Card>
</Col>
<Col span={8}>
  <Card
    hoverable
    style={{
      width: 240,
    }}
    cover={<img src={img6} />}
  >
    <Meta title="Boston en otoño" description="www.instagram.com" />
  </Card>
</Col>
</Row>
{*/}


</>
  )
}

export default App
