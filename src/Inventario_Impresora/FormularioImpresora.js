import React from 'react';
import '../App.css';
import {
    Form,
    Select,
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
import { Link } from 'react-router-dom';


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
            tipo: "",
            equipos: []
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        var comp = ["Servidor", "UPS"];
        this.setState({ equipos: comp });
        if (typeof this.props.location !== 'undefined') {
            const { info } = this.props.location.state;
            this.cargar_datos(info);
        }
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
            nserie: info.nserie,
            codigo: info.codigo,
            modelo: info.modelo,
            estado: info.estado,
            marca: info.marca,
            ip: info.ip,
            principal: info.principal,
            asignado: info.asignado,
            descripcion: info.descripcion,
            tipo: info.tipo
        })

        if (info.tipo === "matricial") {
            this.props.form.setFieldsValue({
                cinta: info.cinta,
                cartucho: info.cartucho
            })
        }
        if (info.tipo === "impresora") {
            this.props.form.setFieldsValue({
                tinta: info.tinta,
                cartucho: info.cartucho
            })
        }
        if (info.tipo === "brazalete") {
            this.props.form.setFieldsValue({
                tinta: info.tinta,
                cartucho: info.cartucho,
                rolloBrazalete: info.rollBrazalete,
                toner: info.toner
            })
        }
        if (info.tipo === "escaner") {
            this.props.form.setFieldsValue({
                rodillo: info.rodillo
            })
        }
        if (info.tipo === "multifuncional") {
            this.props.form.setFieldsValue({
                rodillo: info.rodillo,
                toner: info.toner,
                cartucho: info.cartucho
            })
        }

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
                                label="Número de serie"
                                id="nserie"
                                decorator={getFieldDecorator} />

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

                            <MarcaSelect
                                class=""
                                id="marca"
                                required={true}
                                decorator={getFieldDecorator} />

                            <InputComponent
                                class=""
                                label="Código"
                                id="codigo"
                                decorator={getFieldDecorator} />

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

                            <InputComponent
                                class=""
                                label="Modelo"
                                id="modelo"
                                decorator={getFieldDecorator} />

                            {
                                this.state.tipo === "matricial" ?
                                    <div>
                                        <InputComponent
                                            class=""
                                            label="Cinta"
                                            id="cinta"
                                            decorator={getFieldDecorator} />

                                        <InputComponent
                                            class=""
                                            label="Cartucho"
                                            id="cartucho"
                                            decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "impresora" ?
                                    <div>
                                        <InputComponent
                                            class=""
                                            label="Tinta"
                                            id="tinta"
                                            decorator={getFieldDecorator} />

                                        <InputComponent
                                            class=""
                                            label="Cartucho"
                                            id="cartucho"
                                            decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "brazalete" ?
                                    <div>
                                        <InputComponent
                                            class=""
                                            label="Rollo-Brazalete"
                                            id="rolloBrazalete"
                                            decorator={getFieldDecorator} />
                                        <InputComponent
                                            class=""
                                            label="Tinta"
                                            id="tinta"
                                            decorator={getFieldDecorator} />
                                        <InputComponent
                                            class=""
                                            label="Cartucho"
                                            id="cartucho"
                                            decorator={getFieldDecorator} />

                                        <InputComponent
                                            class=""
                                            label="Toner"
                                            id="toner"
                                            decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "escaner" ?
                                    <div>
                                        <InputComponent
                                            class=""
                                            label="Rodillo"
                                            id="rodillo"
                                            decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            {
                                this.state.tipo === "multifuncional" ?
                                    <div>
                                        <InputComponent
                                            class=""
                                            label="Cartucho"
                                            id="cartucho"
                                            decorator={getFieldDecorator} />
                                        <InputComponent
                                            class=""
                                            label="Toner"
                                            id="toner"
                                            decorator={getFieldDecorator} />
                                        <InputComponent
                                            class=""
                                            label="Rodillo"
                                            id="rodillo"
                                            decorator={getFieldDecorator} />
                                    </div>
                                    : null
                            }

                            <IpSelect class=""
                                required={false}
                                id="ip"
                                decorator={getFieldDecorator} />

                            <ComponentePrincipal class=""
                                required={false}
                                id="principal"
                                decorator={getFieldDecorator} />

                            <AsignarSelect class=""
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
                                <Link to='/impresora'>
                                    <Button type="primary">Cancelar</Button>
                                </Link>
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