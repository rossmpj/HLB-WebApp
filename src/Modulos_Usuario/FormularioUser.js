import React from 'react';
import '../App.css';
import { Form, Input, message, Button, Layout, Select } from 'antd';
import '../custom-antd.css';
import InputComp from '../Componentes/InputComponent';
import AxiosTipo from '../Servicios/AxiosTipo';
import { Link } from 'react-router-dom';
import AxiosAuth from '../Servicios/AxiosAuth'
import FuncionesAuxiliares from '../FuncionesAuxiliares';

const { Content } = Layout;
const key = 'updatable';
const tailLayout = { wrapperCol: { offset: 9, span: 5 } };
const layout = { labelCol: { span: 6 }, wrapperCol: { span: 14 }, };

class FormularioUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            username: '',
            cedula:'',
            editionMode: false,
            roles: [],
            dptos: []

        };
        this.handle_guardar = this.handle_guardar.bind(this);
    }



    cargar_dptos() {
        AxiosTipo.mostrar_dep_org().then(res => {
            console.log(res.data)
            this.setState({ dptos: res.data });
        }).catch(err => {
            console.log(err);
        });
    }
    cargar_roles() {
        AxiosTipo.mostrar_roles().then(res => {
            console.log(res.data)
            this.setState({ roles: res.data });
        }).catch(err => {
            console.log(err);
        });
    }


    componentDidMount = () => {
        this.cargar_dptos();
        this.cargar_roles();
        if (typeof this.props.data !== 'undefined') {
            if (typeof this.props.data.state !== 'undefined'
                && typeof this.props.data.state.info !== 'undefined'
            ) {
                const { info } = this.props.data.state;
                const { titulo } = this.props.data.state;
                if (info !== undefined) {
                    this.cargar_datos(info);
                    this.setState({ editionMode: true })
                    this.setState({ titulo: titulo })
                }
            }
        }
    }

    handle_guardar = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('entro 3')
            if (!err) {
                if (!this.state.editionMode) {
                    this.crear_user(values);
                } else {
                    console.log('entro edit')
                    values.old_cedula = this.state.cedula;
                    values.old_user = this.state.username;
                    FuncionesAuxiliares.updateUser(values,key);
                }
            }
        });
    }

    cargar_datos(info) {
        console.log("record:", info);
        this.props.form.setFieldsValue({
            cedula: info.cedula,
            nombre: info.nombre,
            username: info.username,
            apellido: info.apellido,
            id_departamento: info.id_departamento,
            id_rol: info.id_rol,
        });
        this.setState({
            username: info.username,
            cedula: info.cedula
        })

    }

    crear_user(values) {
        AxiosAuth.registrar_user_web(values).then(res => {
            message.loading({ content: 'Guardando datos...', key });
            setTimeout(() => {
                message.success({ content: 'Usuario creado satisfactoriamente', key, duration: 3 });
            }, 1000);
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 400) {
                    message.error(err.response.data.log, 4)
                    .then(() => message.error('No fue posible registrar los datos', 3))
                }
                if (err.response.status === 500) {
                    message.error('Ocurrió un error al procesar los datos, inténtelo más tarde', 4);
                }
                console.log(err.response)
            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }


    strongValidator = (rule, value, callback) => {
        try {
            let regExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{7,15}$');
            if (!regExp.test(value)) {
                throw new Error("Su contaseña debe tener entre 7 y 15 caracteres, incluya al menos una mayúscula, minúscula y un número");
            }
        } catch (err) {
            callback(err);
        }
    }

    IDValidator = (rule, value, callback) => {
        try {
            if (value.length < 10) {
                throw new Error("La cedula Ingresada no es valida");
            }
        } catch (err) {
            callback(err);
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

                        <InputComp label="Nombres" id="nombre" decorator={getFieldDecorator} />
                        <InputComp label="Apellidos" id="apellido" decorator={getFieldDecorator} />
                        <Form.Item label="Cedula">
                            {getFieldDecorator('cedula', {
                                rules: [{ required: true, message: 'Por favor, ingrese una Cedula Valida' }],
                            })(<Input/>)}
                        </Form.Item>
                        <InputComp label="Usuario" id="username" decorator={getFieldDecorator} />
                        <Form.Item disabled={this.state.editionMode} label="Contraseña">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                            })(<Input.Password />)}
                        </Form.Item>
                        <Form.Item label="Seleccione Departamento" >
                            {getFieldDecorator('id_departamento', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.id_departamento
                            })(
                                <Select
                                    //disabled={this.state.editionMode ? true : false}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option key="0" value={null}>----</Select.Option>
                                    {
                                        this.state.dptos.map(dato =>
                                            <Select.Option key={dato.id_departamento} value={dato.id_departamento}>{dato.nombre + " (" + dato.bspi_punto + ")"}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >
                        <Form.Item
                            label="Seleccione Rol"

                        >
                            {getFieldDecorator('id_rol', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.id_rol
                            })(
                                <Select
                                    //disabled={this.state.editionMode ? true : false}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                >
                                    <Select.Option key="0" value={null}>----</Select.Option>
                                    {
                                        this.state.roles.map(dato =>
                                            <Select.Option key={dato.id_rol} value={dato.id_rol}>{dato.nombre}</Select.Option>
                                        )
                                    }
                                </Select>
                            )
                            }
                        </Form.Item >


                        <Form.Item {...tailLayout}>
                            <Button style={{ marginRight: 7 }} type="primary" htmlType="submit">Guardar</Button>
                            <Link to={{ pathname: '/sistemas/users' }} ><Button type="primary">Cancelar</Button></Link>
                        </Form.Item>
                    </Form>
                </div>

            </Content>
        );
    }
}

FormularioUser = Form.create({})(FormularioUser);
export default FormularioUser;