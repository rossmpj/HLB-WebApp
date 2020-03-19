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
import AsignarSelect from '../Componentes/AsignarSelect'

const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class FormularioIp extends React.Component {

    constructor(props) {
        super(props);
        this.handle_guardar = this.handle_guardar.bind(this);
    }


    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
                message.success('Registro guardado satisfactoriamente')
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
        if (typeof this.props.data.state !== 'undefined'
            && typeof this.props.data.state.info !== 'undefined'
        ) {
            this.cargar_datos(this.props.data.state.info);
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
                                <Select.Option value="en uso">En uso</Select.Option>
                                <Select.Option value="libre">Libre</Select.Option>
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

                    <AsignarSelect
                        class=""
                        required={false}
                        id="asignado"
                        decorator={getFieldDecorator} />


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