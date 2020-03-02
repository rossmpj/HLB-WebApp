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
  InputNumber,
  Divider,
  Icon
} from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const tailLayout = {
  wrapperCol: { offset: 10, span: 5 }
};

const buttonItemLayout = {
  wrapperCol: {span: 14, offset: 8},
};


const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const onFinish = values => {
  console.log('Received values of form:', values);
};

class FormularioLaptop extends React.Component {
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
    <Content style={{ margin: '0px 5px' }}>
      <div className="color" >
    <div style={{ padding: 40, background: '#fff', minHeight: 360 }}> 
      {/* <Title className="App">Nuevo router</Title> */}
      <div>
        <Form {...layout} 
          layout="horizontal" 
        >
          <Divider orientation="left">DATOS GENERALES</Divider>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Código">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Nombre">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Marca">
            <Select>
              <Select.Option value="demo">LG</Select.Option>
              <Select.Option value="dmo">Xiaomi</Select.Option>
            </Select>
          </Form.Item >
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Modelo">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Número de serie">
            <Input />
          </Form.Item>
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Descripción">
              <TextArea />
          </Form.Item>
          <Divider orientation="left">DATOS DEL PROCESADOR</Divider>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Frecuencia">
              <InputNumber />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Núcleos">
              <InputNumber />
            </Form.Item>

          {/* <Form.Item label="Memoria RAM">
            <Switch checked={!loading} onChange={this.onChange} />
          </Form.Item>
          <Skeleton loading={loading}>  */}
          <Divider orientation="left">DATOS GENERALES DE MEMORIA RAM</Divider>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="RAM Soportada">
              <InputNumber />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Número de slots">
              <InputNumber />
            </Form.Item>



       <Collapse >
    <Panel header="Memorias RAM" key="1">
    <Collapse >
    <Panel header="Memoria RAM 1" key="2">
    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Código">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Nombre">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Marca">
              <Select>
                <Select.Option value="demo">LG</Select.Option>
                <Select.Option value="dmo">Xiaomi</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Modelo">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Número de serie">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Capacidad">
              <InputNumber />
              <Select style={{ width: 80 }} >
                <Option value="rmb">MB</Option>
                <Option value="dollar">GB</Option>
                <Option value="dollar">TB</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Tipo">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Descripción">
              <TextArea />
            </Form.Item>
            
            </Panel>
            
      </Collapse>
      <Form.Item {...buttonItemLayout}>
                <Button
                  type="dashed"
                  //  onClick={() => { 
                  //    add();
                  //  }}
                   icon="plus"
                   style={{ width: '60%' }}
                 >
                   Agregar memoria RAM
                 </Button>
               </Form.Item>


      
            </Panel>
      </Collapse>
          {/* </Skeleton> */}
          <Divider orientation="left">DATOS DE DISCO DURO</Divider>
          {/* <Form.Item label="Disco Duro">
            <Switch checked={!loading} onChange={this.onChange} />
          </Form.Item> */}
          {/* <Skeleton loading={loading}>  */}
          <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Código">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Nombre">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Marca">
              <Select>
                <Select.Option value="demo">LG</Select.Option>
                <Select.Option value="dmo">Xiaomi</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Modelo">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Número de serie">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Capacidad">
              <InputNumber />
              <Select style={{ width: 80 }} >
                <Option value="rmb">MB</Option>
                <Option value="dollar">GB</Option>
                <Option value="dollar">TB</Option>
              </Select>
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Tipo">
              <Input />
            </Form.Item>
            <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 12px)' }} label="Descripción">
              <TextArea />
            </Form.Item>
          {/* </Skeleton> */}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">Guardar</Button>   
            {/* <Button type="primary" htmlType="cancel">Cancelar</Button> */}
          </Form.Item> 
        </Form>
        
      </div>
    </div>  
    </div>
    </Content>      
  );
  }
}

export default FormularioLaptop;