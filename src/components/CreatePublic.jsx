import React from 'react';
import { createPost } from '../services/publicacionesService';
import { Form, Input, Button, InputNumber, message } from 'antd';

const CreatePublicacion = () => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      // Obtiene los valores de los campos del formulario
      const values = form.getFieldsValue();
      const newPost = {
        ...values,
        pages: Number(values.pages),
        price: Number(values.price),
        year: Number(values.year),
      };

      const result = await createPost(newPost);
      console.log('Publicación creada:', result);
      message.success('¡Publicación creada con éxito!');
      form.resetFields(); // Limpia el formulario después de enviar
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      message.error('Hubo un error al crear la publicación');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Form.Item label="Título" name="name" rules={[{ required: true, message: 'Por favor ingresa el título' }]}>
        <Input placeholder="Título del libro" />
      </Form.Item>

      <Form.Item label="Autor" name="author" rules={[{ required: true, message: 'Por favor ingresa el autor' }]}>
        <Input placeholder="Autor del libro" />
      </Form.Item>

      <Form.Item label="Editorial" name="editorial" rules={[{ required: true, message: 'Por favor ingresa la editorial' }]}>
        <Input placeholder="Editorial del libro" />
      </Form.Item>

      <Form.Item label="Páginas" name="pages" rules={[{ required: true, message: 'Por favor ingresa el número de páginas' }]}>
        <InputNumber placeholder="Número de páginas" min={1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Precio" name="price" rules={[{ required: true, message: 'Por favor ingresa el precio' }]}>
        <InputNumber placeholder="Precio del libro" min={0} formatter={value => `$ ${value}`} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Año" name="year" rules={[{ required: true, message: 'Por favor ingresa el año de publicación' }]}>
        <InputNumber placeholder="Año de publicación" min={1900} max={new Date().getFullYear()} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Género" name="genre" rules={[{ required: true, message: 'Por favor ingresa el género' }]}>
        <Input placeholder="Género literario" />
      </Form.Item>

      <Form.Item label="Reseña" name="review" rules={[{ required: true, message: 'Por favor ingresa una reseña' }]}>
        <Input.TextArea placeholder="Escribe una reseña" rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Crear Publicación
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreatePublicacion;
