import React from 'react';
import '../App.css';
import {
    Form, Button, Input, message, Select
} from 'antd';
import '../custom-antd.css';
import AsignarSelect from '../Componentes/AsignarSelect'
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';
class FormularioCorreo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: "",
            editionMode: false,
            estado: "",
            id_correo: ""
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    handle_guardar = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (!this.state.editionMode) {
                    Axios.crear_correo(values).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        if (err.response) {
                            message.error(err.response.data.log, 2)
                                .then(() => message.error('No fue posible registrar los datos', 2.5))
                        } else {
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                        } 
                    });
                } else {
                    values.id = this.state.id_correo;
                    Axios.editar_correo(values).then(res => {
                        message.loading({ content: 'Actualizando datos...', key });
                        setTimeout(() => {
                            message.success({ content: "Edición realizada satisfactoriamente", key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        if (err.response) {
                            message.error(err.response.data.log, 4)
                                .then(() => message.error('No fue posible actualizar los datos', 3))
                        } else {
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                        }
                    });
                }
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            correo: info.correo,
            contrasena: info.contrasena,
            cedula: info.cedula
        })
        this.setState({ id_correo: info.key, estado: info.estado });
    }

    componentDidMount() {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
                this.setState({ editionMode: true });
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

                    <AsignarSelect class=""
                        required={true}
                        id="cedula"
                        initialValue={this.state.cedula}
                        decorator={getFieldDecorator} />


                    <Form.Item
                        label="Correo">
                        {getFieldDecorator('correo', {
                            rules: [{
                                type: 'email',
                                message: 'Ingrese un correo válido',
                            },
                            { required: true, message: 'Debe completar este campo' }]
                        })(
                            <Input placeholder="example@hospitalleonbecerra.org" />
                        )}
                    </Form.Item>

                    <Form.Item
                        label="Contraseña">
                        {getFieldDecorator('contrasena', {
                            rules: [{ required: true, message: 'Debe completar este campo' }]
                        })(
                            <Input.Password placeholder="Contraseña" />
                        )}
                    </Form.Item>

                    {this.state.editionMode ?
                        <Form.Item label="Estado">
                            {getFieldDecorator('estado', {
                                rules: [{ required: true, message: 'Debe seleccionar el estado' }],
                                initialValue: this.state.estado
                            })(
                                <Select>
                                    <Select.Option value="EU">En uso</Select.Option>
                                    <Select.Option value="I">Inactivo</Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        : null}


                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                        <Link to='/correo'>
                            <Button type="primary">Cancelar</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioCorreo = Form.create({})(FormularioCorreo);
export default FormularioCorreo;