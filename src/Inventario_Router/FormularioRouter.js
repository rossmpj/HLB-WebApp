import React from 'react';
import '../App.css';
import { Form, Input, Button, Layout, message, Spin } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import MarcaSelect from '../Componentes/MarcaSelect';
import IpSelect from '../Componentes/IpSelect';
import AsignComp from '../Componentes/AsignarSelect';
import EstadComp from '../Componentes/EstadoSelect';
import AxiosRouter from '../Servicios/AxiosRouter';
import Axios from '../Servicios/AxiosDesktop'
import VistaFormulario from '../Componentes/VistaFormulario'
import FuncionesAuxiliares from '../FuncionesAuxiliares';
import Auth from '../Login/Auth';

const { Content } = Layout;
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
            loading: false,
            ipValida: true,
            passValida: true,
            claveValida: true,
            codigos: []
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }
 
    handleInputChange = (name, e) => {
        const { form } = this.props;
        if (name === "penlace"){
            this.setState({ipValida: FuncionesAuxiliares.ipValidator(e.currentTarget.value)});
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({'penlace': fvalue});
        }else if (name === "pass"){
            this.setState({passValida: FuncionesAuxiliares.passwordValidator(e.currentTarget.value)});
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({'pass': fvalue});
        }else if (name === "clave"){
            this.setState({claveValida: FuncionesAuxiliares.passwordValidator(e.currentTarget.value)});
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({'clave': fvalue});
        }
        
    };

   

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
        console.log("error.",values);
        message.loading({ content: 'Espere un momento por favor, estamos procesando su solicitud...', key });
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
                    encargado_registro: Auth.getDataLog().user.username,
                    componente_principal: null,
                    ip: values.ip,
                    nombre: values.nombre,
                    pass: values.pass,
                    usuario: values.usuario,
                    clave: values.clave,
                    estado_operativo: values.estado,
                    puerta_enlace: values.penlace,
                    descripcion: values.descripcion,
                }
                console.log("El router", router)
                try{
                    if(this.state.titulo === "Editar router"){
                        AxiosRouter.editar_equipo_router(router).then(res => {
                        message.loading({ content: 'Guardando modificaciones...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro modificado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                        this.props.history.push("/sistemas/router");
                        })
                    }else{
                        AxiosRouter.crear_equipo_router(router).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                        this.props.history.push("/sistemas/router");
                        })
                    }
                }
                catch(error) {
                    console.log(error)
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                }
            }
            if (this.state.titulo === 'Nuevo router'){
                if (this.state.codigos.includes(values.codigo)){
                    message.error("El código ingresado ya existe en la base de datos, ingrese uno válido para continuar", 4)
                }
            }
    });
  }

  cargar_datos(info) {
    console.log("record:",info);
    this.setState({id_equipo_router: info.key})
    AxiosRouter.router_id(info.key).then(respuesta => {
        this.setState({ loading: true})
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
            ip: res.ip === null ? null : res.direccion_ip,
            penlace: res.puerta_enlace,
            descripcion: res.descripcion
        })
    });
    this.setState({ loading: false})
  } 

  render() {
    const { getFieldDecorator } = this.props.form;   
    return (
      <Content> 
        <div className="div-container-title">      
          <VistaFormulario enlace='/sistemas/router' titulo={this.state.titulo}></VistaFormulario> 
          <div className="div-border-top" >
            <div className="div-container"> 
            <Spin spinning={!this.state.loading && this.state.titulo === "Editar router"} tip="Cargando datos, espere un momento por favor...">          
              <Form {...layout} 
                layout="horizontal" 
                onSubmit={this.handle_guardar}
                action={this.state.titulo}
                id={this.state.titulo}
              > 
                <InputComp label="Código" id="codigo" decorator={getFieldDecorator} disabled={this.state.disabled} />
                <AsignComp required={false} id="asignar" decorator={getFieldDecorator} />
                <InputComp label="Nombre" id="nombre" decorator={getFieldDecorator} />  
                <Form.Item label="Pass" hasFeedback help="La contraseña debe tener de 5 a 10 caracteres e incluir mayúsculas, minúsculas y números" 
                    validateStatus={!this.state.passValida ? 'error' :  'success' }>
                    {getFieldDecorator('pass', 
                        { rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                    })( <Input.Password onChange={(e) => this.handleInputChange('pass', e)}/> )}
                </Form.Item>
                <InputComp label="Usuario" id="usuario" decorator={getFieldDecorator} />  
                <Form.Item label="Clave" hasFeedback help="La contraseña debe tener de 5 a 10 caracteres e incluir mayúsculas, minúsculas y números" 
                    validateStatus={!this.state.claveValida ? 'error' :  'success' }>
                    {getFieldDecorator('clave', { 
                        rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                    })( <Input.Password onChange={(e) => this.handleInputChange('clave', e)}/> )}
                </Form.Item>
                <MarcaSelect required={true} id="marca" decorator={getFieldDecorator} />
                <InputComp label="Modelo" id="modelo" decorator={getFieldDecorator} /> 
                <InputComp label="Número de serie" id="nserie" decorator={getFieldDecorator} />              
                <EstadComp required={true} id="estado" decorator={getFieldDecorator} />
                <IpSelect required={false} id="ip" decorator={getFieldDecorator} />
                <Form.Item label="Puerta de enlace" hasFeedback 
                    validateStatus={!this.state.ipValida ? 'error' :  'success' }>
                    {getFieldDecorator('penlace', {
                        rules: [{ required: false, message: 'Debe completar este campo' }],
                    })( <Input  onChange={(e) => this.handleInputChange('penlace', e)}/> )}
                </Form.Item>
                <Form.Item label="Descripción">
                  {getFieldDecorator("descripcion")( <TextArea /> )}
                </Form.Item>
                <Form.Item {...tailLayout}>
                  <Button style={{marginRight: 7}} type="primary" htmlType="submit">Guardar</Button>   
                </Form.Item> 
              </Form>
            </Spin>
            </div>  
          </div>
        </div>
      </Content>      
    );
  }
}

FormularioRouter = Form.create({})(FormularioRouter);
export default FormularioRouter;