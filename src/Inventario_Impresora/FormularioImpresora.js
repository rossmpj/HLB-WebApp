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
import InputComponent from '../Componentes/InputComponent'
/* import SelectComponent from '../Componentes/SelectComponent' */
import IpSelect from '../Componentes/IpSelect'

const { Content } = Layout;
const { TextArea } = Input;

const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

class FormularioImpresora extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: ""
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }



    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log(values)
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
                            <InputComponent label="Número de serie" name="nserie" decorator={getFieldDecorator} />

                            <Form.Item label="Tipo">
                                {getFieldDecorator('tipo', {
                                    rules: [{ required: true, message: 'Debe seleccionar el tipo de impresora' }],
                                })(
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
                                )}
                            </Form.Item>

                            <Form.Item label="Marca">
                                {getFieldDecorator('marca', {
                                    rules: [{ required: true, message: 'Debe seleccionar la marca de la impresora' }],
                                })(
                                    <Select>
                                        <Select.Option value="demo">LG</Select.Option>
                                        <Select.Option value="dmo">Xiaomi</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <InputComponent label="Código" name="codigo" decorator={getFieldDecorator} />

                            <Form.Item label="Estado">
                                {getFieldDecorator('estado', {
                                    rules: [{ required: true, message: 'Debe seleccionar el estado' }],
                                })(
                                    <Select>
                                        <Select.Option value="disponible">Disponible</Select.Option>
                                        <Select.Option value="revision">En revisión</Select.Option>
                                        <Select.Option value="reparado">Reparado</Select.Option>
                                        <Select.Option value="baja">De baja</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <InputComponent label="Modelo" name="modelo" decorator={getFieldDecorator} />

                            {
                                this.state.tipo === "matricial" ?
                                    <div>
                                        <InputComponent label="Cinta" name="cinta" decorator={getFieldDecorator} />
                                        <InputComponent label="Cartucho" name="cartucho" decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "impresora" ?
                                    <div>
                                        <InputComponent label="Tinta" name="tinta" decorator={getFieldDecorator} />
                                        <InputComponent label="Cartucho" name="cartucho" decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "brazalete" ?
                                    <div>
                                        <InputComponent label="Rollo-Brazalete" name="rolloBrazalete" decorator={getFieldDecorator} />
                                        <InputComponent label="Tinta" name="tinta" decorator={getFieldDecorator} />
                                        <InputComponent label="Cartucho" name="cartucho" decorator={getFieldDecorator} />
                                        <InputComponent label="Toner" name="toner" decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "escaner" ?
                                    <div>
                                        <InputComponent label="Rodillo" name="rodillo" decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "multifuncional" ?
                                    <div>
                                        <InputComponent label="Cartucho" name="cartucho" decorator={getFieldDecorator} />
                                        <InputComponent label="Toner" name="toner" decorator={getFieldDecorator} />
                                        <InputComponent label="Rodillo" name="rodillo" decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {/* <SelectComponent decorator={getFieldDecorator} datos={this.state.ip}></SelectComponent> */}
                            <IpSelect decorator={getFieldDecorator}></IpSelect>

                            <Form.Item label="Asignado a">
                                {getFieldDecorator('asignado')(
                                    <Select>
                                        <Select.Option value="">---------------</Select.Option>
                                        <Select.Option value="a">David Martín</Select.Option>
                                        <Select.Option value="b">Alicia Gris</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item label="Descripción">
                                {getFieldDecorator('descripcion')(
                                    <TextArea />
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
FormularioImpresora = Form.create({})(FormularioImpresora);
export default FormularioImpresora;