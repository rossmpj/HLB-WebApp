import React from 'react';
import '../App.css';
import {
    Form,
    Select,
    Input,
    Button,
    Layout
} from 'antd';
import '../custom-antd.css';

const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 11, span: 4 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

function InputComponent(props) {
    return (
        <Form.Item
            label={props.label}>
            {getFieldDecorator(`${props.name}`, {
                rules: [{ required: true, message: 'Debe completar este campo' }],
            })(
                <Input
                />
            )}
        </Form.Item>
    )
}

class FormularioImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: "",

        };
        this.handle_guardar = this.handle_guardar.bind(this);
        //this.handle_onChange = this.handle_onChange.bind(this);
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        console.log(e)
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content style={{ margin: '0px 200px' }} >
                <div className="color" >
                    <div style={{ padding: 40, background: '#fff', minHeight: 360 }}>
                        <div>
                            <Form {...layout}
                                layout="horizontal"
                                onFinish
                            >
                                <Form.Item
                                    label="Número de serie">
                                    {getFieldDecorator('nserie', {
                                        rules: [{ required: true, message: 'Debe ingresar el nùmero de serie' }],
                                    })(
                                        <Input
                                        />
                                    )}
                                </Form.Item>

                                <Form.Item label="Tipo">
                                    <Select
                                        onChange={(value) => {
                                            this.setState({ tipo: value });
                                        }}>
                                        <Select.Option value="multifuncional">Multifuncional</Select.Option>
                                        <Select.Option value="matricial">Matricial</Select.Option>
                                        <Select.Option value="brazalete">Brazalete</Select.Option>
                                        <Select.Option value="impresora">Impresora</Select.Option>
                                        <Select.Option value="escaner">Escaner</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Marca">
                                    <Select>
                                        <Select.Option value="demo">LG</Select.Option>
                                        <Select.Option value="dmo">Xiaomi</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Código"
                                >

                                </Form.Item>

                                <Form.Item label="Estado">
                                    <Select>
                                        <Select.Option value="disponible">Disponible</Select.Option>
                                        <Select.Option value="revision">En revisión</Select.Option>
                                        <Select.Option value="reparado">Reparado</Select.Option>
                                        <Select.Option value="baja">De baja</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Modelo"
                                >
                                    {getFieldDecorator('modelo', {
                                        rules: [{ required: true, message: 'Debe ingresar el modelo' }],
                                    })(
                                        <Input
                                        />
                                    )}
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Descripción"
                                    name="descripcion"
                                >
                                    <TextArea />
                                </Form.Item>

                                <Form.Item label="Dirección IP">
                                    <Select>
                                        <Select.Option value="demo">192.168.1.1</Select.Option>
                                        <Select.Option value="dem">0.0.0.0</Select.Option>
                                    </Select>
                                </Form.Item>

                                {
                                    this.state.tipo === "matricial" ?
                                        <div>
                                            <InputComponent label="Cinta" name="cinta" />
                                            {/* <Form.Item
                                                label="Cinta"
                                                name="cinta"
                                                rules={[{ required: true, message: 'Debe ingresar la cinta' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <InputComponent label="Cartucho" name="cartucho" />
                                            {/*  <Form.Item
                                                label="Cartucho"
                                                name="cartucho"
                                                rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}

                                        </div>
                                        : null


                                }

                                {
                                    this.state.tipo === "impresora" ?
                                        <div>
                                            <InputComponent label="Tinta" name="tinta" />
                                            {/*  <Form.Item
                                                label="Tinta"
                                                name="tinta"
                                                rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            */}
                                            <InputComponent label="Cartucho" name="cartucho" />
                                            {/*  <Form.Item
                                                label="Cartucho"
                                                name="cartucho"
                                                rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                        </div>
                                        : null

                                }

                                {
                                    this.state.tipo === "brazalete" ?
                                        <div>
                                            <InputComponent label="Rollo-Brazalete" name="rolloBrazalete" />
                                            {/*  <Form.Item
                                                label="Rollo-Brazalete"
                                                name="rolloBrazalete"
                                                rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <InputComponent label="Tinta" name="tinta" />
                                            {/* <Form.Item
                                                label="Tinta"
                                                name="tinta"
                                                rules={[{ required: true, message: 'Debe ingresar la tinta' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <InputComponent label="Cartucho" name="cartucho" />
                                            {/*  <Form.Item
                                                label="Cartucho"
                                                name="cartucho"
                                                rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <InputComponent label="Toner" name="toner" />
                                            {/* <Form.Item
                                                label="Toner"
                                                name="toner"
                                                rules={[{ required: true, message: 'Debe ingresar el toner de la impresora' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}

                                        </div>
                                        : null
                                }

                                {
                                    this.state.tipo === "escaner" ?
                                        <InputComponent label="Rodillo" name="rodillo" />
                                        /*  <Form.Item
                                             label="Rodillo"
                                             name="rodillo"
                                             rules={[{ required: true, message: 'Debe ingresar el rodillo' }]}
                                         >
                                             <Input />
                                         </Form.Item> */
                                        : null

                                }

                                {
                                    this.state.tipo === "Impresora" ?
                                        <div>
                                            <InputComponent label="Tinta" name="tinta" />
                                            {/* <Form.Item
                                                label="tinta"
                                                name="tinta"
                                                rules={[{ required: true, message: 'Debe ingresar la tinta' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}
                                            <InputComponent label="Cartucho" name="cartucho" />
                                            {/* <Form.Item
                                                label="Cartucho"
                                                name="cartucho"
                                                rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                            >
                                                <Input />
                                            </Form.Item>
 */}
                                        </div>


                                        : null

                                }

                                {
                                    this.state.tipo === "multifuncional" ?
                                        <div>
                                            <InputComponent label="Cartucho" name="cartucho" />
                                            <InputComponent label="Toner" name="toner" />
                                            <InputComponent label="Rodillo" name="rodillo" />
                                            {/* <Form.Item
                                                label="Cartucho"
                                                name="cartucho"
                                                rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                                    
                                            <Form.Item
                                                label="Toner"
                                                name="toner"
                                                rules={[{ required: true, message: 'Debe ingresar el toner de la impresora' }]}
                                            >
                                                <Input />
                                            </Form.Item>

                                            <Form.Item
                                                label="Rodillo"
                                                name="rodillo"
                                                rules={[{ required: true, message: 'Debe ingresar el rodillo' }]}
                                            >
                                                <Input />
                                            </Form.Item> */}

                                        </div>
                                        : null
                                }

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">Guardar</Button>
                                </Form.Item>

                            </Form>
                        </div>
                    </div>
                </div>
            </Content >
        );
    }
}
export default FormularioImpresora;