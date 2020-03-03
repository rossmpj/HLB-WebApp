import React from 'react';
import '../App.css';
import {
  Form,
  Select,
  Input,
  Button, 
  Layout,
  InputNumber,
  Divider,
} from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';

const { Panel } = Collapse;
const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const tailLayout = {
  wrapperCol: { offset: 9, span: 5 }
};

const buttonItemLayout = {
  wrapperCol: {span: 14, offset: 8},
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class FormularioDesktop extends React.Component {    
  state = {
    loading: true,
  };
  
  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    return (
      <Content>
        <div className="div-border-top" >
          <div className="div-container"> 
            <Form {...layout} 
              layout="horizontal" 
            >
              <Divider orientation="left">DATOS GENERALES</Divider>
              <Form.Item className="form-item-2columns" label="Código">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Nombre">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Marca">
                <Select>
                  <Select.Option value="demo">LG</Select.Option>
                  <Select.Option value="dmo">Xiaomi</Select.Option>
                </Select>
              </Form.Item >
              <Form.Item className="form-item-2columns" label="Modelo">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Número de serie">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Descripción">
                  <TextArea />
              </Form.Item>
              
              <Divider orientation="left">DATOS DEL PROCESADOR</Divider>
              <Form.Item className="form-item-2columns" label="Frecuencia">
                <InputNumber />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Núcleos">
                <InputNumber />
              </Form.Item>
          
              <Divider orientation="left">DATOS GENERALES DE MEMORIA RAM</Divider>
              <Form.Item className="form-item-2columns" label="RAM Soportada">
                <InputNumber />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Número de slots">
                <InputNumber />
              </Form.Item>

              <Collapse >
                <Panel header="Memorias RAM" key="1">
                  <Collapse >
                    <Panel header="Memoria RAM 1" key="2">
                      <Form.Item className="form-item-2columns" label="Código">
                        <Input />
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Nombre">
                        <Input />
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Marca">
                        <Select>
                          <Select.Option value="demo">LG</Select.Option>
                          <Select.Option value="dmo">Xiaomi</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Modelo">
                        <Input />
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Número de serie">
                        <Input />
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Capacidad">
                        <InputNumber />
                        <Select style={{ width: 80 }} >
                          <Option value="rmb">MB</Option>
                          <Option value="dollar">GB</Option>
                          <Option value="dollar">TB</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Tipo">
                        <Input />
                      </Form.Item>
                      <Form.Item className="form-item-2columns" label="Descripción">
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

              <Divider orientation="left">DATOS DE DISCO DURO</Divider>
              <Form.Item className="form-item-2columns" label="Código">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Nombre">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Marca">
                <Select>
                  <Select.Option value="demo">LG</Select.Option>
                  <Select.Option value="dmo">Xiaomi</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Modelo">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Número de serie">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Capacidad">
                <InputNumber />
                <Select style={{ width: 80 }} >
                  <Option value="rmb">MB</Option>
                  <Option value="dollar">GB</Option>
                  <Option value="dollar">TB</Option>
                </Select>
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Tipo">
                <Input />
              </Form.Item>
              <Form.Item className="form-item-2columns" label="Descripción">
                <TextArea />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button style={{marginRight: 7}} type="primary"htmlType="submit">Guardar</Button>   
                <Button type="primary" htmlType="cancel">Cancelar</Button>
              </Form.Item> 
            </Form>
          </div>
        </div>  
      </Content>      
    );
  }
}

export default FormularioDesktop;