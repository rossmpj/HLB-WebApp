import React from 'react';
import '../App.css';
import {
  Form,
  Select,
  Input,
  Button, 
  Layout
} from 'antd';
import '../custom-antd.css';

const { Content } = Layout;

const tailLayout = {
  wrapperCol: { offset: 11, span: 4 }
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

function FormularioRouter(){
  return (
    <Content style={{ margin: '0px 200px' }}>
      <div className="color" >
    <div style={{ padding: 40, background: '#fff', minHeight: 360 }}> 
      {/* <Title className="App">Nuevo router</Title> */}
      <div>  
        <Form {...layout} 
          layout="horizontal" 
        >
          <Form.Item 
            rules={[{ required: true, message: 'Código is required!' }]}
            label="Código"
          >
            <Input />
          </Form.Item>
          <Form.Item label="Nombre">
            <Input />
          </Form.Item>
          <Form.Item label="Pass">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Usuario">
            <Input />
          </Form.Item>
          <Form.Item label="Clave">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Marca">
            <Select>
              <Select.Option value="demo">LG</Select.Option>
              <Select.Option value="dmo">Xiaomi</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Modelo">
            <Input />
          </Form.Item>
          <Form.Item label="Número de serie">
            <Input />
          </Form.Item>
          <Form.Item label="Dirección IP">
          <Select>
            <Select.Option value="demo">192.168.1.1</Select.Option>
            <Select.Option value="dem">0.0.0.0</Select.Option>
          </Select>
          </Form.Item>
          <Form.Item label="Puerta de enlace">
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Guardar</Button>   
            {/* <Button type="primary" htmlType="cancel">Cancelar</Button>        */}
          </Form.Item> 
        </Form>
      </div>
    </div>  
    </div>
    </Content>      
  );
}

export default FormularioRouter;