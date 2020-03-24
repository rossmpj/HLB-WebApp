import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, Skeleton, Switch, Row, Col, Typography } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import MarcaSelect from '../Componentes/MarcaSelect';
import IpSelect from '../Componentes/IpSelect';
import AsignComp from '../Componentes/AsignarSelect';
import EstadComp from '../Componentes/EstadoSelect';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title } = Typography;
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
        titulo: ""
    };
    this.handle_guardar = this.handle_guardar.bind(this);
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      const { titulo } = this.props.location.state;
      if (titulo === "Editar router" && info !== undefined){
        this.cargar_datos(info);
      }   
      this.cambiar_titulo(titulo);
    }
  }

  handle_guardar = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log(values)
          }
      });
  }

  cargar_datos(info) {
    console.log(info);
    this.props.form.setFieldsValue({
        codigo: info.codigo,
        asignar: info.empleado,
        nombre: info.nombre,
        pass: info.pass,
        usuario: info.usuario,
        clave: info.clave,
        marca: info.marca,
        modelo: info.modelo,
        nserie: info.num_serie,
        estado: info.estado,
        ip: info.ip,
        penlace: info.penlace,
        descripcion: info.descripcion
    })
  }

  cambiar_titulo(titulo){
    this.setState({titulo: titulo})
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
        <div className="div-container-title">      
          <Row>
            <Col span={12}><Title level={2}>{this.state.titulo}</Title></Col>
            <Col className='flexbox'>
              <Link to={{ pathname: '/router' }} ><Button type="primary" icon="left">Volver</Button></Link>
            </Col>
          </Row>  
          <div className="div-border-top" >
            <div className="div-container"> 
              <Form {...layout} 
                layout="horizontal" 
                onSubmit={this.handle_guardar}
                action={this.state.titulo}
                id={this.state.titulo}
              > 
                <InputComp label="Código"          id="codigo"  decorator={getFieldDecorator} />
                <AsignComp required={true}         id="asignar" decorator={getFieldDecorator} />
                <InputComp label="Nombre"          id="nombre"  decorator={getFieldDecorator} />  
                <Form.Item label="Pass">
                  {getFieldDecorator('pass', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                  })( <Input.Password /> )}
                </Form.Item>
                <InputComp label="Usuario"         id="usuario" decorator={getFieldDecorator} />  
                <Form.Item label="Clave">
                  {getFieldDecorator('clave', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                  })( <Input.Password /> )}
                </Form.Item>
                <MarcaSelect    required={true}    id="marca"   decorator={getFieldDecorator} />
                <InputComp label="Modelo"          id="modelo"  decorator={getFieldDecorator} /> 
                <InputComp label="Número de serie" id="nserie"  decorator={getFieldDecorator} />              
                <EstadComp required={true}         id="estado"  decorator={getFieldDecorator} />
                <IpSelect required={false} id="ip" decorator={getFieldDecorator} />
                <Form.Item label="Puerta de enlace">
                  {getFieldDecorator('penlace', {
                    rules: [{ required: false, message: 'Debe completar este campo' }],
                  })( <Input /> )}
                </Form.Item>
                <Form.Item label="Descripción">
                  {getFieldDecorator("descripcion")( <TextArea /> )}
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button style={{marginRight: 7}} type="primary" htmlType="submit">Guardar</Button>   
                  <Link to={{ pathname: '/router' }} ><Button type="primary">Cancelar</Button></Link> 
                </Form.Item> 
              </Form>
            </div>  
          </div>
        </div>
      </Content>      
    );
  }
}

FormularioRouter = Form.create({})(FormularioRouter);
export default FormularioRouter;