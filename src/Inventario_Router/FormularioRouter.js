import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, Row, Col, Typography, message } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import MarcaSelect from '../Componentes/MarcaSelect';
import IpSelect from '../Componentes/IpSelect';
import AsignComp from '../Componentes/AsignarSelect';
import EstadComp from '../Componentes/EstadoSelect';
import AxiosRouter from '../Servicios/AxiosRouter';
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosDesktop'

const { Content } = Layout;
const { Title } = Typography;
const { TextArea } = Input;

const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };
const key = 'updatable';

class FormularioRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        titulo: "",
        id_equipo_router: "",
        disabled: false,
        codigos: []
    };
    this.handle_guardar = this.handle_guardar.bind(this);
  }

  componentDidMount = () => {
    if (typeof this.props.location !== 'undefined') {
      const { info } = this.props.location.state;
      const { titulo } = this.props.location.state;
      const { disabled } = this.props.location.state;
      if (titulo === "Editar router" && info !== undefined){
        this.cargar_datos(info);
      }   
      this.setState({titulo: titulo})
      this.setState({disabled: disabled})
      Axios.listado_codigos().then(res => {
        this.setState({codigos: res.data}); 
    })
    }
  }

  handle_guardar = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        if (this.state.titulo === 'Nuevo router'){
            if (this.state.codigos.includes(values.codigo)){
                message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
            }
        }
            if (!err) {
                console.log("valores al guardar:",values)
                let router = {
                    id_equipo: this.state.id_equipo_router,
                    codigo: values.codigo,
                    tipo_equipo: "Router",
                    id_marca: values.marca,
                    modelo: values.modelo,
                    numero_serie: values.nserie,
                    asignado: values.asignar,
                    encargado_registro: 'admin',
                    componente_principal: null,
                    ip: values.ip,
                    nombre: values.nombre,
                    pass: values.pass,
                    usuario: values.usuario,
                    clave: values.clave,
                    estado_operativo: values.estado,
                    puerta_enlace: values.penlace,
                    descripcion: values.descripcion,
                    fecha_registro: '2020-03-26'
                }
                console.log("El router", router)
                try{
                    if(this.state.titulo === "Editar router"){
                        AxiosRouter.editar_equipo_router(router).then(res => {
                        message.loading({ content: 'Guardando modificaciones...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro modificado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                        this.props.history.push("/router");
                        })
                    }else{
                        AxiosRouter.crear_equipo_router(router).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                        this.props.history.push("/router");
                        })
                    }
                }
                catch(error) {
                    console.log(error)
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                }
            }
        
    });
  }

  cargar_datos(info) {
    console.log("record:",info);
    this.setState({id_equipo_router: info.key})
    AxiosRouter.router_id(info.key).then(respuesta => {
        let res = respuesta.data
        console.log(res)
            this.props.form.setFieldsValue({
            codigo: res.codigo,
            asignar: res.asignado,
            nombre: res.nombre,
            pass: res.pass,
            usuario: res.usuario,
            clave: res.clave,
            marca: res.id_marca,
            modelo: res.modelo,
            nserie: res.numero_serie,
            estado: res.estado_operativo,
            ip: res.ip === null ? null : res.ip,
            penlace: res.puerta_enlace,
            descripcion: res.descripcion
        })
    });
  } 

  render() {
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
                <InputComp label="Código" id="codigo" decorator={getFieldDecorator} disabled={this.state.disabled} />
                <AsignComp required={false} id="asignar" decorator={getFieldDecorator} />
                <InputComp label="Nombre" id="nombre" decorator={getFieldDecorator} />  
                <Form.Item label="Pass">
                  {getFieldDecorator('pass', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                  })( <Input.Password /> )}
                </Form.Item>
                <InputComp label="Usuario" id="usuario" decorator={getFieldDecorator} />  
                <Form.Item label="Clave">
                  {getFieldDecorator('clave', { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                  })( <Input.Password /> )}
                </Form.Item>
                <MarcaSelect required={true} id="marca" decorator={getFieldDecorator} />
                <InputComp label="Modelo" id="modelo" decorator={getFieldDecorator} /> 
                <InputComp label="Número de serie" id="nserie" decorator={getFieldDecorator} />              
                <EstadComp required={true} id="estado" decorator={getFieldDecorator} />
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