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
            cedula: '',
            editionMode: false,
            roles: [],
            dptos: [],
            estado: 'A',
            passwordValida: true,
            cedulaValida: true,
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
            console.log('entro 3', values)
            if (!err) {
                if (!this.state.editionMode) {
                    this.crear_user(values);
                } else {
                    console.log('entro edit')
                    values.old_cedula = this.state.cedula;
                    values.old_user = this.state.username;
                    FuncionesAuxiliares.updateUser(values, key, this.props.hist, "/sistemas/users");
                }
            }else{
                message.error('Asegurese de llenar de forma correcta el formulario para continuar con el proceso', 3)
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
            cedula: info.cedula,
            estado: info.estado
        })

    }

    crear_user(values) {
        message.loading({ content: 'Guardando datos...', key });
        AxiosAuth.registrar_user_web(values).then(res => {
            setTimeout(() => {
                message.success({ content: 'Usuario creado satisfactoriamente', key, duration: 3 });
            }, 1000);
            this.props.hist.push("/sistemas/users");
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




    handleInputChange = (name, e) => {
        const { form } = this.props;
        if (name === "password") {
            this.setState({ passwordValida: FuncionesAuxiliares.passwordValidator(e.currentTarget.value) });
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({ 'password': fvalue });
        }
        else if (name === 'cedula') {
            this.setState({ cedulaValida: FuncionesAuxiliares.IDValidator(e.currentTarget.value) });
            const fvalue = e.currentTarget.value;
            form.setFieldsValue({ 'cedula': fvalue });
        }
    };

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
                        <Form.Item validateStatus={!this.state.cedulaValida ? 'error' : 'success'} label="Cedula"
                        hasFeedback help="La cedula debe contener 10 digitos numericos">
                            {getFieldDecorator('cedula', {
                                rules: [{ required: true, message: 'Por favor, ingrese una Cedula Valida' }],
                            })(<Input onChange={(e) => this.handleInputChange('cedula', e)}/>)}
                        </Form.Item>
                        <InputComp label="Usuario" id="username" decorator={getFieldDecorator} />
                        <Form.Item validateStatus={!this.state.passwordValida ? 'error' : 'success'} label="Contraseña"
                        hasFeedback help="La contraseña debe tener de 5 a 10 caracteres e incluir mayúsculas, minúsculas y números">
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Por favor, ingrese una contraseña' }],
                            })(<Input.Password  onChange={(e) => this.handleInputChange('password', e)} />)}
                        </Form.Item>
                        {this.state.editionMode ? <Form.Item label="Estado">
                            {getFieldDecorator('estado', {
                                rules: [{ required: true, message: 'Debe seleccionar el Estado' }],
                                initialValue: this.state.estado
                            })(
                                <Select hidden={!this.state.editionMode}>
                                    <Select.Option value="A">Activo</Select.Option>
                                    <Select.Option value="I">Inactivo</Select.Option>
                                </Select>)}
                        </Form.Item> : null}

                        <Form.Item label="Seleccione Departamento" >
                            {getFieldDecorator('id_departamento', {
                                rules: [{ required: true, message: 'Debe completar este campo' }],
                                initialValue: this.state.id_departamento
                            })(
                                <Select
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