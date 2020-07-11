import React from 'react';
import '../App.css';
import {
    Form,
    Button,
    Select,
    Input,
    message
} from 'antd';
import '../custom-antd.css';
import { Link } from 'react-router-dom';
import AxiosSolicitud from '../Servicios/AxiosSolicitud';
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
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.editionMode) {
                    console.log(values)
                    AxiosSolicitud.crear_solicitud(values).then(res => {
                        console.log(res);
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        console.log(err.response)
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                    });
                } else {
                    // values.key = this.state.key;
                    // AxiosSolicitud.editar_marca(values).then(res => {
                    //     message.loading({ content: 'Actualizando datos...', key });
                    //     setTimeout(() => {
                    //         message.success({ content: "Edición realizada satisfactoriamente", key, duration: 3 });
                    //     }, 1000);
                    // }).catch(err => {
                    //     console.log(err);
                    // });
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
                            initialValue: 'ALTA'
                        })(
                            <Select>
                                <Select.Option value="ALTA">Alta</Select.Option>
                                <Select.Option value="MEDIA">Media</Select.Option>
                                <Select.Option value="BAJA">Baja</Select.Option>
                                <Select.Option value="CRITICA">Critica</Select.Option>
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
                                <Select.Option value="AE">Asignacion de Equipos</Select.Option>
                                <Select.Option value="ST">Servicio Tecnico</Select.Option>
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
                        <Link to='/solicitud'>
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






