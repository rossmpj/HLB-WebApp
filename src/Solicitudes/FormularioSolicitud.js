import React from 'react';
import '../App.css';
import {Form, Button, Select, Input, message } from 'antd';
import '../custom-antd.css';
import { Link } from 'react-router-dom';
import AxiosSolicitud from '../Servicios/AxiosSolicitud';
import Auth from '../Login/Auth'
const tailLayout = {
    wrapperCol: { offset: 9, span: 8 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};
const { TextArea } = Input;

const key = 'updatable';

class FormularioSolicitud extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
            editionMode: false,
            id_usuario: Auth.getDataLog().user.username
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.editionMode) {
                    console.log(values)
                    values.id_usuario = this.state.id_usuario;
                    AxiosSolicitud.crear_solicitud(values).then(res => {
                        console.log(res);
                        message.loading({ content: 'Procesando solicitud...', key });
                        setTimeout(() => {
                            message.success({ content: 'Solicitud enviada satisfactoriamente', key, duration: 3 });
                        }, 1000);
                       // this.props.history.push("/solicitud_empleado");
                    }).catch(error => {
                        console.log(error)
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                    });
                } else {
                }
            }
        });
    }

    // cargar_datos(info) {
    //     // this.props.form.setFieldsValue({
    //     //     nombre: info.nombre,
    //     // })
    //     // this.setState({ key: info.key });
    // }

    componentDidMount() {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                // this.cargar_datos(this.props.data.state.info);
                // this.setState({ editionMode: true });
                console.log('monted')
            }
        }
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="div-container">
                <Form {...layout}
                    layout="horizontal"
                    onSubmit={this.handle_guardar}
                >
                  
                    <Form.Item
                        label="Prioridad" 
                     
                    >
                        {getFieldDecorator('prioridad', {
                            rules: [{ required: true, message: 'Debe seleccionar la prioridad de la Solicitud' }],
                            initialValue: 'A'
                        })(
                            <Select>
                                <Select.Option value="A">Alta</Select.Option>
                                <Select.Option value="M">Media</Select.Option>
                                <Select.Option value="B">Baja</Select.Option>
                                <Select.Option value="CT">Critica</Select.Option>
                            </Select>
                        )}


                    </Form.Item>
                    <Form.Item
                        label="Tipo de Asistencia" 
                     
                    >
                        {getFieldDecorator('tipo', {
                            rules: [{ required: true, message: 'Debe seleccionar la prioridad de la Solicitud' }],
                            initialValue: 'AE'
                        })(
                            <Select>
                                <Select.Option value="AE">Asignación de Equipos</Select.Option>
                                <Select.Option value="ST">Servicio Técnico</Select.Option>
                            </Select>
                        )}


                    </Form.Item>
                    <Form.Item
                        label="Observacion" 
                     
                    >
                        {getFieldDecorator('observacion', {
                            rules: [{ required: true, message: 'Debe dar una descripcion del problema' }],
                            initialValue: ''
                        })(
                           <TextArea/>
                        )}


                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Enviar Solicitud</Button>
                        <Link to='/empleado/solicitudes'>
                            <Button type="primary">Cancelar</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioSolicitud = Form.create({})(FormularioSolicitud);
export default FormularioSolicitud;






