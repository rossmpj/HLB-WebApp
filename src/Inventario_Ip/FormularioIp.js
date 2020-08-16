import React from 'react';
import '../App.css';
import {
    Form, Input, Button, InputNumber, message
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import Axios from '../Servicios/AxiosTipo';
import Auth from '../Login/Auth';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioIp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            encargado_registro: Auth.getDataLog().user.username,
            editionMode: false,
            key: "",
            ipValida: true,
        }
        this.handle_guardar = this.handle_guardar.bind(this);
    }


    handleInputChange = (name, e) => {
        const { form } = this.props;
        if (name === "ip") {
            this.setState({ ipValida: FuncionesAuxiliares.ipValidator(e.currentTarget.value) });
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({ 'ip': fvalue });
        }
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                let ip = {
                    direccion_ip: values.ip,
                    hostname: values.hostname,
                    subred: values.subred,
                    fortigate: values.fortigate,
                    maquinas_adicionales: parseInt(values.maquinas),
                    encargado_registro: this.state.encargado_registro,
                    observacion: values.observacion,
                    key: this.state.key
                }
                if (!this.state.editionMode) {

                    Axios.crear_ip(ip).then(() => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                  //      this.props.history.push("/sistemas/ip");
                    }).catch(error_creacion => {
                        if (error_creacion.response) {
                            message.error(error_creacion.response.data.log, 3)
                                .then(() => message.error('No fue posible registrar los datos', 3))
                        } else {
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 3)
                        }
                    });
                } else {
                    Axios.editar_ip(ip).then(() => {
                        message.loading({ content: 'Actualizando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro actualizado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    //    this.props.history.push("/sistemas/ip");
                    }).catch(error_edicion => {
                        if (error_edicion.response) {
                            message.error(error_edicion.response.data.log, 3)
                                .then(() => message.error('No fue posible actualizar los datos', 3))
                        } else {
                            message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 3)
                        }
                    });
                }
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            ip: info.ip,
            hostname: info.hostname,
            subred: info.subred,
            fortigate: info.fortigate,
            observacion: info.observacion,
            maquinas: info.maquinas
        })
        this.setState({ key: info.key });
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
                    onSubmit={this.handle_guardar}>
                    <Form.Item label="Dirección IP"
                        hasFeedback
                        help="Formato: 0-255.0-255.0-255.0-255"
                        validateStatus={!this.state.ipValida ? 'error' : 'success'}>
                        {getFieldDecorator('ip',
                            {
                                rules: [{ required: true, message: 'Debe colocar una dirección IP' }]
                            })(
                                <Input
                                    onChange={(e) => this.handleInputChange('ip', e)}
                                />
                            )}
                    </Form.Item>

                    <InputComponent
                        class=""
                        label="Hostname"
                        id="hostname"
                        decorator={getFieldDecorator} />

                    <InputComponent
                        class=""
                        label="Subred"
                        id="subred"
                        decorator={getFieldDecorator} />

                    <InputComponent
                        class=""
                        label="Fortigate"
                        id="fortigate"
                        decorator={getFieldDecorator} />

                    <Form.Item label="Observación">
                        {getFieldDecorator('observacion')(
                            <TextArea />
                        )}
                    </Form.Item>

                    <Form.Item label="Máquinas adicionales">
                        {getFieldDecorator('maquinas',
                            { initialValue: 0 })(
                                <InputNumber
                                    min={0}
                                />
                            )}
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioIp = Form.create({})(FormularioIp);
export default FormularioIp;