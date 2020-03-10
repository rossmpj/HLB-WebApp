import React from 'react';
import '../App.css';
import {
    Form,
    Select,
    Input,
    Button,
    Layout,
    InputNumber,
    message
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'

const { Content } = Layout;
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


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
                <div className="div-border-top" >
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

                            {/*  <Form.Item label="Asignado a">
                                {getFieldDecorator('asignado')(
                                    <Select>
                                        <Select.Option value="">---------------</Select.Option>
                                        <Select.Option value="a">David Martín</Select.Option>
                                        <Select.Option value="b">Alicia Gris</Select.Option>
                                    </Select>
                                )}
                            </Form.Item> */}

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
                                <Button type="primary">Cancelar</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content >
        );
    }
}
FormularioIp = Form.create({})(FormularioIp);
export default FormularioIp;