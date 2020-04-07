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
import EstadoSelect from '../Componentes/EstadoSelect'
import Axios from '../Servicios/AxiosTipo'

const { Content } = Layout;
const { TextArea } = Input;


const tailLayout = {
    wrapperCol: { offset: 9, span: 5 }
};

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const key = 'updatable';

class FormularioImpresora extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tipo: "",
            cinta: "",
            cartucho: "",
            toner: "",
            rodillo: "",
            tinta: "",
            rollo: "",
            encargado_registro: "admin",
            editionMode: false,
            key: ""
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
                this.setState({ editionMode: true });
            }
        }
    }



    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values.encargado_registro = this.state.encargado_registro;
                if (!this.state.editionMode) {
                    Axios.crear_impresora(values).then(res => {
                        message.loading({ content: 'Guardando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        console.log(err)
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                    });
                } else {
                    values.key = this.state.key;
                    Axios.editar_impresora(values).then(res => {
                        message.loading({ content: 'Actualizando datos...', key });
                        setTimeout(() => {
                            message.success({ content: 'Registro actualizado satisfactoriamente', key, duration: 3 });
                        }, 1000);
                    }).catch(err => {
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                    });
                }


            }
        });
    }

    cargar_datos(info) {
        this.props.form.setFieldsValue({
            numero_serie: info.numero_serie,
            codigo: info.codigo,
            modelo: info.modelo,
            estado_operativo: info.estado_operativo,
            id_marca: info.id_marca,
            ip: info.ip,
            componente_principal: info.componente_principal,
            asignado: info.asignado,
            descripcion: info.descripcion,
            tipo: info.tipo
        })

        this.setState({ tipo: info.tipo });

        if (info.tipo.toLocaleLowerCase() === "matricial") {
            this.setState({ cinta: info.cinta, cartucho: info.cartucho });
        }

        if (info.tipo.toLocaleLowerCase() === "impresora") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
        }

        if (info.tipo.toLocaleLowerCase() === "brazalete") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
            this.setState({ rollo: info.rolloBrazalete, toner: info.toner });
        }

        if (info.tipo.toLocaleLowerCase() === "escáner") {
            this.setState({ rodillo: info.rodillo });
        }

        if (info.tipo.toLocaleLowerCase() === "multifuncional") {
            this.setState({ rodillo: info.rodillo, toner: info.toner });
            this.setState({ cartucho: info.cartucho });
        }
        this.setState({ key: info.key });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Content>
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

                        <InputComponent
                            class=""
                            label="Número de serie"
                            id="numero_serie"
                            decorator={getFieldDecorator} />

                        <Form.Item label="Tipo">
                            {getFieldDecorator('tipo', {
                                rules: [{ required: true, message: 'Debe seleccionar el tipo de impresora' }]
                            })(
                                <Select
                                    onChange={(value) => {
                                        this.setState({ tipo: value });
                                    }}>
                                    <Select.Option value="Multifuncional">Multifuncional</Select.Option>
                                    <Select.Option value="Matricial">Matricial</Select.Option>
                                    <Select.Option value="Brazalete">Brazalete</Select.Option>
                                    <Select.Option value="Impresora">Impresora</Select.Option>
                                    <Select.Option value="Escáner">Escáner</Select.Option>
                                </Select>
                            )}
                        </Form.Item>

                        <MarcaSelect
                            class=""
                            id="id_marca"
                            required={true}
                            decorator={getFieldDecorator} />

                        <EstadoSelect
                            class=""
                            id="estado_operativo"
                            required={true}
                            decorator={getFieldDecorator} />

                        <InputComponent
                            class=""
                            label="Modelo"
                            id="modelo"
                            decorator={getFieldDecorator} />

                        {
                            this.state.tipo.toLocaleLowerCase() === "matricial" ?
                                <div>
                                    <Form.Item
                                        label="Cinta">
                                        {getFieldDecorator('cinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cinta
                                        })(
                                            <Input
                                            />
                                        )}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })(
                                            <Input
                                            />
                                        )}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "impresora" ?
                                <div>
                                    <Form.Item
                                        label="Tinta">
                                        {getFieldDecorator('tinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.tinta
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "brazalete" ?
                                <div>
                                    <Form.Item
                                        label="Rollo-Brazalete">
                                        {getFieldDecorator('rollo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rollo
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Tinta">
                                        {getFieldDecorator('tinta', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.tinta
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Toner">
                                        {getFieldDecorator('toner', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.toner
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "escáner" ?
                                <div>
                                    <Form.Item
                                        label="Rodillo">
                                        {getFieldDecorator('rodillo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rodillo
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        {
                            this.state.tipo.toLocaleLowerCase() === "multifuncional" ?
                                <div>
                                    <Form.Item
                                        label="Cartucho">
                                        {getFieldDecorator('cartucho', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.cartucho
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Toner">
                                        {getFieldDecorator('toner', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.toner
                                        })
                                            (<Input />)}
                                    </Form.Item>

                                    <Form.Item
                                        label="Rodillo">
                                        {getFieldDecorator('rodillo', {
                                            rules: [{ required: true, message: 'Debe completar este campo' }],
                                            initialValue: this.state.rodillo
                                        })
                                            (<Input />)}
                                    </Form.Item>
                                </div>
                                : null
                        }

                        <IpSelect class=""
                            required={false}
                            id="ip"
                            decorator={getFieldDecorator} />

                        <ComponentePrincipal class=""
                            required={false}
                            id="componente_principal"
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
                            <Button type="primary" >Cancelar</Button>

                        </Form.Item>
                    </Form>
                </div>
            </Content >
        );
    }
}
FormularioImpresora = Form.create({})(FormularioImpresora);
export default FormularioImpresora;