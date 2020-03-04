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

class FormularioEquipo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            estado: "disponible",
            encargado: "",
            id: ""
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
                            <InputComponent label="Código" name="codigo" decorator={getFieldDecorator} />
                            {/*  <Form.Item label="Estado">
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
                            </Form.Item> */}

                            <InputComponent label="Número de serie" name="nserie" decorator={getFieldDecorator} />

                            <Form.Item label="Tipo">
                                {getFieldDecorator('tipo', {
                                    rules: [{ required: true, message: 'Debe seleccionar el tipo de impresora' }],
                                })(
                                    <Select
                                        onChange={(value) => {
                                            this.setState({ tipo: value });
                                        }}>
                                        <Select.Option value="Parlante">Parlante</Select.Option>
                                        <Select.Option value="Teclado">Teclado</Select.Option>
                                        <Select.Option value="UPS">UPS</Select.Option>
                                        <Select.Option value="Switch">Switch</Select.Option>
                                        <Select.Option value="Servidor">Servidor</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <InputComponent label="Modelo" name="modelo" decorator={getFieldDecorator} />

                            <Form.Item label="Marca">
                                {getFieldDecorator('marca', {
                                    rules: [{ required: true, message: 'Debe seleccionar la marca de la impresora' }],
                                })(
                                    <Select>
                                        <Select.Option value="demo">HP</Select.Option>
                                        <Select.Option value="dmo">Samsung</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item label="Dirección IP">
                                {getFieldDecorator('ip')(
                                    <IpSelect></IpSelect>
                                )}
                            </Form.Item>

                            <Form.Item label="Componente principal">
                                {getFieldDecorator('componente')(
                                    <Select
                                    >
                                        <Select.Option value="">---------------</Select.Option>
                                        <Select.Option value="a">000001</Select.Option>
                                        <Select.Option value="b">000002</Select.Option>
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item label="Asignar a">
                                {getFieldDecorator('asignar')(
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
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
FormularioEquipo = Form.create({})(FormularioEquipo);
export default FormularioEquipo;