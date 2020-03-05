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
  Icon
} from 'antd';
import '../custom-antd.css';
import { Collapse } from 'antd';

let id = 0;
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
  constructor(props) {
    super(props);
    this.state = {
        tipo: ""
    };
    this.handle_guardar = this.handle_guardar.bind(this);
  }


  handle_guardar = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
          }
      });
  }

  state = {
    loading: true,
  };
  
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  // genExtra = k => {
  //   const { form } = this.props;
  //   const keys = form.getFieldValue('keys');
  //    <SettingOutlined
  //     onClick={() => this.remove(k)
  //       }
  //      /> 
  //   {keys.length > 1 ? (
  //     <SettingOutlined
  //     onClick={() => this.remove(k)
  //       }
  //      /> 
  //   ) : null} 
  // };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log('Received values of form: ', values);
        console.log('Merged values:', keys.map(key => names[key]));
      }
    });
  };

  onChange = checked => {
    this.setState({ loading: !checked });
  };
  
  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');

    const formItems = keys.map((k, index) => (
      <Collapse>
        <Panel 
          header={"RAM " + (k+1)} 
          key={k+1} 
          extra = {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />) : null}
        >
          <Form.Item className="form-item-2columns" label="Código">
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
    ));

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
              <Collapse>
                <Panel header="Memorias RAM" key="1">
                  {formItems}
                  <Form.Item {...buttonItemLayout}>
                    <Button
                      type="dashed"
                      onClick={this.add} 
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
                <Button style={{marginRight: 7}} type="primary" htmlType="submit">Guardar</Button>   
                <Button type="primary">Cancelar</Button>
              </Form.Item> 
            </Form>
          </div>
        </div>  
      </Content>      
    );
  }
}

FormularioDesktop = Form.create({})(FormularioDesktop);
export default FormularioDesktop;