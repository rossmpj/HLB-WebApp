import React from 'react';
import '../App.css';
import {
  Form,
  Input,
  Button, 
  Layout,
  Skeleton,
  Switch,
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent';
import MarcaSelect from '../Componentes/MarcaSelect';
import IpSelect from '../Componentes/IpSelect';

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
              <InputComponent label="Código"          id="codigo"  decorator={getFieldDecorator} />
              <InputComponent label="Nombre"          id="nombre"  decorator={getFieldDecorator} />  
              <Form.Item      label="Pass">
                {getFieldDecorator('pass', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                })( <Input.Password /> )}
              </Form.Item>
              <InputComponent label="Usuario"         id="usuario" decorator={getFieldDecorator} />  
              <Form.Item      label="Clave">
                {getFieldDecorator('clave', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                })( <Input.Password /> )}
              </Form.Item>
              <MarcaSelect    required={true}         id="marca"   decorator={getFieldDecorator} />
              <InputComponent label="Modelo"          id="modelo"  decorator={getFieldDecorator} /> 
              <InputComponent label="Número de serie" id="nserie"  decorator={getFieldDecorator} /> 
              <Form.Item      label="Descripción">
                {getFieldDecorator("descripcion")( <TextArea /> )}
              </Form.Item>
            
              <Form.Item label="¿Asignar una dirección IP?">
                <Switch checkedChildren="Si" unCheckedChildren="No" checked={!loading} onChange={this.onChange} />
              </Form.Item>
              <Skeleton loading={loading}> 
                <IpSelect class="" required={!loading} id="ip" decorator={getFieldDecorator} />
                <Form.Item label="Puerta de enlace">
                {getFieldDecorator('penlace', {
                  rules: [{ required: !loading, message: 'Debe completar este campo' }],
                })( <Input /> )}
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