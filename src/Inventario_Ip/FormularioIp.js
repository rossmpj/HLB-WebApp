import React from 'react';
import '../App.css';
import {
    Form,
    Select,
    Input,
    Button,
    InputNumber,
    message
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import { Link } from 'react-router-dom';
import Axios from '../Servicios/AxiosTipo';
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
        this.handle_guardar = this.handle_guardar.bind(this);
    }


    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let ip = {
                    direccion_ip: values.ip,
                    estado: values.estado,
                    hostname: values.hostname,
                    subred: values.subred,
                    fortigate: values.fortigate,
                    maquinas_adicionales: parseInt(values.maquinas),
                    nombre_usuario: "",
                    encargado_registro: "admin",
                    observacion: values.observacion
                }
                Axios.crear_ip(ip).then(res => {
                    message.loading({ content: 'Guardando datos...', key });
                    setTimeout(() => {
                        message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                    }, 1000);
                }).catch(err => {
                    console.log(err)
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                });
            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            ip: info.ip,
            estado: info.estado,
            hostname: info.hostname,
            subred: info.subred,
            fortigate: info.fortigate,
            observacion: info.observacion,
            maquinas: info.maquinas
        })
    }

    componentDidMount() {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
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
                    <InputComponent
                        class=""
                        label="Ip"
                        id="ip"
                        decorator={getFieldDecorator} />

                    <Form.Item label="Estado">
                        {getFieldDecorator('estado', {
                            rules: [{ required: true, message: 'Debe seleccionar el estado' }],
                        })(
                            <Select>
                                <Select.Option value="e">En uso</Select.Option>
                                <Select.Option value="l">Libre</Select.Option>
                            </Select>
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
                        {getFieldDecorator('maquinas')(
                            <InputNumber
                                min={0}
                            />
                        )}
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                        <Link to='/ip'>
                            <Button type="primary">Cancelar</Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
FormularioIp = Form.create({})(FormularioIp);
export default FormularioIp;