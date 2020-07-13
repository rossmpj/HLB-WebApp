import React from 'react';
import '../../App.css';
import { Form, Input, Layout, Button, message } from 'antd';
import '../../custom-antd.css';
import InputComponent from '../../Componentes/InputComponent';
import DescripcionComponent from '../../Componentes/DescripcionComponent';
import { Link } from 'react-router-dom';
import Axios from '../../Servicios/AxiosPrograma';
import VistaFormulario from '../../Componentes/VistaFormulario'
const { Content } = Layout;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioPrograma extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
            titulo: "",
            editionMode: false,
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            
            if (!err) {
                let programa = {
                    id_programa: this.state.key,
                    codigo: values.codigo,
                    nombre: values.nombre,
                    version: values.version,
                    editor: values.editor,
                    observacion: values.observacion,
                    encargado_registro: "admin",
                }
                console.log("re",programa)
                try{
                    if (!this.state.editionMode) {
                        Axios.crear_programa(programa).then(res => {
                            message.loading({ content: 'Guardando datos...', key });
                            setTimeout(() => {
                                message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                                }, 1000);
                                this.props.history.push("/programa");
                                })
                    } else {
                        Axios.editar_programa(programa).then(res => {
                            message.loading({ content: 'Actualizando datos...', key });
                            setTimeout(() => {
                                message.success({ content: "Edición realizada satisfactoriamente", key, duration: 3 });
                            }, 1000);
                            this.props.history.push("/programa");
                        })
                    }
                }
                catch(error) {
                    console.log(error)
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', error, 4);
                }
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            codigo: info.codigo,
            nombre: info.nombre,
            version: info.version,
            editor: info.editor,
            observacion: info.observacion

        })
        this.setState({ key: info.key });
    }

    componentDidMount() {
        if (typeof this.props.location !== 'undefined') {
            const { titulo } = this.props.location.state;
            const { info } = this.props.location.state;
            if (titulo === "Editar programa" && info !== undefined){
                this.cargar_datos(info);
                this.setState({ editionMode: true });
            }
            this.setState({titulo: titulo})
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content> 
                <div className="div-container-title">      
                    <VistaFormulario enlace='/programa' titulo={this.state.titulo}></VistaFormulario>
                    <div className="div-border-top" >
                        <div className="div-container"> 
                            <Form {...layout}
                                layout="horizontal"
                                onSubmit={this.handle_guardar}
                            >
                                <InputComponent label="Código" id="codigo" decorator={getFieldDecorator} disabled={this.state.editionMode} />
                                <InputComponent label="Nombre del programa" id="nombre" decorator={getFieldDecorator} />
                                <Form.Item label="Versión" >
                                    {getFieldDecorator(`version`, {
                                        rules: [{ required: false, message: 'Debe completar este campo' }]         
                                    })( <Input /> )}
                                </Form.Item>
                                <Form.Item label="Editor" >
                                    {getFieldDecorator(`editor`, {
                                        rules: [{ required: false, message: 'Debe completar este campo' }]         
                                    })( <Input /> )}
                                </Form.Item>
                                <DescripcionComponent label="Observación" id="observacion" decorator={getFieldDecorator} />
                        
                                <Form.Item {...tailLayout}>
                                    <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                                    <Link to='/programa'>
                                        <Button type="primary">Cancelar</Button>
                                    </Link>
                                </Form.Item>
                            </Form>
                        </div>  
                    </div>
                </div>
            </Content>
        );
    }
}
FormularioPrograma = Form.create({})(FormularioPrograma);
export default FormularioPrograma;