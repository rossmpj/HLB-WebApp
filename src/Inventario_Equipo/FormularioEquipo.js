import React from 'react';
import '../App.css';
import {
    Form,
    Input,
    Button,
    Layout,
    message
} from 'antd';
import '../custom-antd.css';
import InputComponent from '../Componentes/InputComponent'
import AsignarSelect from '../Componentes/AsignarSelect'
import MarcaSelect from '../Componentes/MarcaSelect'
import IpSelect from '../Componentes/IpSelect'
import ComponentePrincipal from '../Componentes/ComponentePrincipal'
import TipoSelect from '../Componentes/TipoSelect'



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
                                label="Código"
                                id="codigo"
                                decorator={getFieldDecorator} />
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

                            <InputComponent
                                class=""
                                label="Número de serie"
                                id="nserie"
                                decorator={getFieldDecorator} />

                            <TipoSelect
                                class=""
                                id="tipo"
                                required={true}
                                decorator={getFieldDecorator} />

                            <InputComponent
                                class=""
                                label="Modelo"
                                id="modelo"
                                decorator={getFieldDecorator} />

                            <MarcaSelect
                                class=""
                                id="marca"
                                required={true}
                                decorator={getFieldDecorator} />

                            <IpSelect
                                class=""
                                required={false}
                                id="ip"
                                decorator={getFieldDecorator} />

                            <ComponentePrincipal
                                class=""
                                id="principal"
                                required={false}
                                decorator={getFieldDecorator} />

                            <AsignarSelect
                                class=""
                                required={false}
                                id="asignado"
                                decorator={getFieldDecorator} />

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