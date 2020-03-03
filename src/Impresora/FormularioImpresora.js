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


class FormularioImpresora extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            
        };
      //  this.guardar = this.guardar.bind(this);
    }

/*
    guardar = e => {
        e.preventDefault();
        this.props.form.setFieldsValue((err, values) => {
            console.log(err);
        })
    }*/

    render() {
        return (
            <Content>
                <div className="div-border-top" >
                    <div className="div-container">
                        <Form {...layout}
                            layout="horizontal"
                            
                        >
                            <Form.Item
                                label="Número de serie"
                                name="nserie"
                                rules={[{ required: true, message: 'Debe ingresar el número de serie' }]}
                            >
                                <Input />
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
                                name="codigo"
                                rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                            >
                                <Input />
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
                                name="modelo"
                                rules={[{ required: true, message: 'Debe ingresar el modelo de la impresora' }]}
                            >
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

                                        <Form.Item
                                            label="Cinta"
                                            name="cinta"
                                            rules={[{ required: true, message: 'Debe ingresar la cinta' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Cartucho"
                                            name="cartucho"
                                            rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                    </div>
                                    : null


                            }

                            {
                                this.state.tipo === "impresora" ?
                                    <div>
                                        <Form.Item
                                            label="Tinta"
                                            name="tinta"
                                            rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Cartucho"
                                            name="cartucho"
                                            rules={[{ required: true, message: 'Debe ingresar el código de la impresora' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </div>
                                    : null

                            }

                            {
                                this.state.tipo === "brazalete" ?
                                    <div>
                                        <Form.Item
                                            label="Rollo-Brazalete"
                                            name="rolloBrazalete"
                                            rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Tinta"
                                            name="tinta"
                                            rules={[{ required: true, message: 'Debe ingresar la tinta' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
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

                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "escaner" ?

                                    <Form.Item
                                        label="Rodillo"
                                        name="rodillo"
                                        rules={[{ required: true, message: 'Debe ingresar el rodillo' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    : null

                            }

                            {
                                this.state.tipo === "Impresora" ?
                                    <div>
                                        <Form.Item
                                            label="tinta"
                                            name="tinta"
                                            rules={[{ required: true, message: 'Debe ingresar la tinta' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Cartucho"
                                            name="cartucho"
                                            rules={[{ required: true, message: 'Debe ingresar el cartucho' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                    </div>


                                    : null

                            }

                            {
                                this.state.tipo === "multifuncional" ?
                                    <div>
                                        <Form.Item
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
                                        </Form.Item>

                                    </div>
                                    : null
                            }

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">Guardar</Button>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </Content>
        );
    }
}

export default FormularioImpresora;