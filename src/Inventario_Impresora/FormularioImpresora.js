import React from 'react';
import '../custom-antd.css';
//import './style.css'
import { Form, Input, Typography, Button } from 'antd';

const { Title } = Typography;
const tailLayout = {
    wrapperCol: { offset: 12, span: 4 },
  };
function FormularioImpresora() {
        return (
            
                    
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Title>Inventario Impresora</Title>
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
                       
        )

    }


export default FormularioImpresora;