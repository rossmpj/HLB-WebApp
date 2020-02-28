import React from 'react';
import ASider from '../ASider';
import '../custom-antd.css';
//import './style.css'
import { Layout, Form, Input, Typography, Button } from 'antd';
const { Header, Footer, Content } = Layout;
const { Title } = Typography;
const tailLayout = {
    wrapperCol: { offset: 12, span: 4 },
  };
class FormularioImpresora extends React.Component {
    render() {
        return (
            <Layout>
                <ASider></ASider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} ></Header>
                    <Content style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 610,
                    }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Title>Inventario</Title>
                            <div  >
                                <Form
                                    labelCol={{ span:6  }}
                                    wrapperCol={{ span: 14 }}
                                    layout="horizontal"
                                    name="basic"
                                >
                                    <Form.Item
                                        label="Número de serie"
                                        name="nserie"
                                        rules={[{ required: true, message: 'Debe ingresar el número de serie' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Código"
                                        name="codigo"
                                        rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Modelo"
                                        name="modelo"
                                        rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label="Descripción"
                                        name="descripcion"
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item {...tailLayout}>
                                        <Button type="primary" htmlType="submit">
                                            Guardar
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>

                    </Content>
                    <Footer className="App">Inventario Hospital León Becerra ©2020 Created by EasySoft</Footer>
                </Layout>

            </Layout>
        )

    }
}

export default FormularioImpresora;