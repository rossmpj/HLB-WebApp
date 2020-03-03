import React from 'react';
import '../App.css';
import {
  Form,
  Select,
  Input,
  Button, 
  Layout,
  Skeleton,
  Switch,
} from 'antd';
import '../custom-antd.css';

const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
  wrapperCol: { offset: 9, span: 5 }
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class FormularioRouter extends React.Component {
  state = {
    loading: true,
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;
    return (
      <Content> 
        <div className="div-border-top" >
          <div className="div-container"> 
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
                <Form.Item label="Descripción">
                  <TextArea />
                </Form.Item>
                <Form.Item label="¿Asignar una dirección IP?">
                  <Switch checkedChildren="Si" unCheckedChildren="No" checked={!loading} onChange={this.onChange} />
                </Form.Item>
                <Skeleton loading={loading}> 
                  <Form.Item label="Dirección IP">
                  <Select>
                    <Select.Option value="demo">192.168.1.1</Select.Option>
                    <Select.Option value="dem">0.0.0.0</Select.Option>
                  </Select>
                  </Form.Item>
                  <Form.Item label="Puerta de enlace">
                    <Input />
                  </Form.Item>
                </Skeleton> 
                <Form.Item {...tailLayout}>
                  <Button style={{marginRight: 7}} type="primary" htmlType="submit">Guardar</Button>   
                  <Button type="primary" htmlType="cancel">Cancelar</Button>
                </Form.Item> 
              </Form>
          </div>  
        </div>
      </Content>      
    );
  }
}

export default FormularioRouter;