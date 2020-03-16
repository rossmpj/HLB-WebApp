import React from 'react';
import '../../App.css';
import {
    Form,
    Button,
    Layout,
    Switch,
    message
} from 'antd';
import '../../custom-antd.css';
import InputComponent from '../../Componentes/InputComponent'

const { Content } = Layout;

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
                                label="Tipo de equipo"
                                id="tipo"
                                decorator={getFieldDecorator} />

                            <Form.Item label="¿Utiliza dirección IP?">
                                {getFieldDecorator('ip', {
                                    valuePropName: 'checked',
                                    initialValue: false,
                                })(<Switch checkedChildren="Si" unCheckedChildren="No"></Switch>)}
                            </Form.Item>

                           {/*  <Form.Item
                                label="Prueba"
                            >
                                {getFieldDecorator('p', {
                                    rules: [{ required: true, message: 'Debe completar este campo' }],
                                })(
                                    <Input>{this.props.datos.ip}</Input>
                                )}
                            </Form.Item> */}

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