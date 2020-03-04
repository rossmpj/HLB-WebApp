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
import InputComponent from '../Componentes/InputComponent'

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

  onChange = checked => {
    this.setState({ loading: !checked });
  };

  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Content> 
        <div className="div-border-top" >
          <div className="div-container"> 
              <Form {...layout} 
                layout="horizontal" 
                onSubmit={this.handle_guardar}
              >
              <InputComponent label="Código" name="codigo" decorator={getFieldDecorator} />
              <InputComponent label="Nombre" name="nombre" decorator={getFieldDecorator} />  
              <InputComponent label="Pass" name="pass" decorator={getFieldDecorator} />
              <InputComponent label="Usuario" name="usuario" decorator={getFieldDecorator} />  
              <InputComponent label="Clave" name="clave" decorator={getFieldDecorator} />
                <Form.Item label="Marca">
                {getFieldDecorator('marca', {
                    rules: [{ required: true, message: 'Debe completar este campo' }],
                })(
                  <Select>
                    <Select.Option value="demo">LG</Select.Option>
                    <Select.Option value="dmo">Xiaomi</Select.Option>
                  </Select>
                )}
                </Form.Item>
              <InputComponent label="Modelo" name="modelo" decorator={getFieldDecorator} /> 
              <InputComponent label="Número de serie" name="nserie" decorator={getFieldDecorator} /> 
                <Form.Item label="Descripción">
                  {getFieldDecorator("descripcion")(
                    <TextArea />
                  )}
                  
                </Form.Item>
                <Form.Item label="¿Asignar una dirección IP?">
                  <Switch checkedChildren="Si" unCheckedChildren="No" checked={!loading} onChange={this.onChange} />
                </Form.Item>
                <Skeleton loading={loading}> 
                  <Form.Item label="Dirección IP">
                  {getFieldDecorator('marca', {
                    rules: [{ required: !loading, message: 'Debe completar este campo' }],
                  })(
                    <Select>
                    <Select.Option value="demo">192.168.1.1</Select.Option>
                    <Select.Option value="dem">0.0.0.0</Select.Option>
                  </Select>
                  )}
                  
                  </Form.Item>
                  <Form.Item label="Puerta de enlace">
                  {getFieldDecorator('marca', {
                    rules: [{ required: !loading, message: 'Debe completar este campo' }],
                  })(
                    <Input />
                    
                  )}
                  </Form.Item>
                </Skeleton> 
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
FormularioRouter = Form.create({})(FormularioRouter);
export default FormularioRouter;