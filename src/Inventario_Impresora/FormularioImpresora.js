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
        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }

    componentDidMount = () => {
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                this.cargar_datos(this.props.data.state.info);
            }
        }
    }



    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                 Axios.crear_impresora(values).then(res => {
                    message.loading({ content: 'Guardando datos...', key });
                    setTimeout(() => {
                        message.success({ content: 'Registro guardado satisfactoriamente', key, duration: 3 });
                    }, 1000);
                }).catch(err => {
                    console.log(err)
                    message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4);
                }); 
                
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

        if (info.tipo === "matricial") {
            this.setState({ cinta: info.cinta, cartucho: info.cartucho });
        }

        if (info.tipo === "impresora") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
        }

        if (info.tipo === "brazalete") {
            this.setState({ tinta: info.tinta, cartucho: info.cartucho });
            this.setState({ rollo: info.rolloBrazalete, toner: info.toner });
        }

        if (info.tipo === "escaner") {
            this.setState({ rodillo: info.rodillo });
        }

        if (info.tipo === "multifuncional") {
            this.setState({ rodillo: info.rodillo, toner: info.toner });
            this.setState({ cartucho: info.cartucho });
        }

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
                            id="id_marca"
                            required={true}
                            decorator={getFieldDecorator} />

                        <InputComponent
                            class=""
                            label="Código"
                            id="codigo"
                            decorator={getFieldDecorator} />

                        <Form.Item label="Estado">
                            {getFieldDecorator('estado_operativo', {
                                rules: [{ required: true, message: 'Debe seleccionar el estado' }],
                            })(
                                <Select>
                                    <Select.Option value="D">Disponible</Select.Option>
                                    <Select.Option value="ER">En revisión</Select.Option>
                                    <Select.Option value="R">Reparado</Select.Option>
                                    <Select.Option value="B">De baja</Select.Option>
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
                            this.state.tipo === "impresora" ?
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
                            this.state.tipo === "brazalete" ?
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
                            this.state.tipo === "escaner" ?
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
                            this.state.tipo === "multifuncional" ?
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