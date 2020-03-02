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
  wrapperCol: { offset: 11, span: 4 }
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class FormularioRouter extends React.Component {
  state = {
    loading: true,
  };
            //codigo, marca, modelo, nserie, ram soportada, numero de slots para ram, frecuencia del procesador, nucleos del procesador, descripcion
  //memoria ram: codigo, marca, modelo, numero de serie, descripcion, capacidad, tipo (add more)
 //disco duro:codigo, marca, modelo. numero de serie, descripcion, capacidad de almacenamiento, tipo (add more)

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;

  return (
    <Content style={{ margin: '0px 100px' }}>
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
}

export default FormularioRouter;