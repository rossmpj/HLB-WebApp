import React from 'react';
import '../App.css';
import {Form, Button, Typography, Row, Col, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../custom-antd.css';
import './login.css'
import AxiosAuth from '../Servicios/AxiosAuth';
import FuncionesAuxiliares from '../FuncionesAuxiliares';

const tailLayout = {
    wrapperCol: { offset: 11, span: 8 }
};

const layout = {
    labelCol: { span: 20 },
    wrapperCol: { offset: 8, span: 8 },
};
const { Title } = Typography;
const key = 'updatable';

class UpdatePass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordValida: true,
            cedulaValida: true,
        }

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

    login(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.loading({ content: 'Verificando datos...', key });
                AxiosAuth.cambiar_password(values).then(res => {
                    console.log(res.data,'res.data')
                    setTimeout(() => {
                        message.success({ content: 'La contraseña se ha actualizado. Puede iniciar sesion.', key, duration: 3 });
                    }, 1000);
                    this.props.history.push("/login");
                }).catch(error => {
                    console.log(error, error.response,'error login')
                    if(error.response){
                        if (error.response.status === 400){
                            message.error(error.response.data.log, 4);
                        }
                        else if(error.response.status === 500){
                            message.error('Ocurrió un error al procesar los datos, inténtelo más tarde', 4);
                        }
                        else if(error.response.status === 401){
                            message.error(error.response.data.log, 4);
                        }
                    }else{
                        message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
                    }
                });
            }else{
                message.error('De ingresar datos correctos para procesar los datos', 3)
            }
        });
    }
 



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Cambiar Contraseña</Title></Col>
                    <Col className='flexbox'>
                        <Link to={{ pathname: '/login'}} ><Button type="primary" icon="left">Iniciar Sesion</Button></Link>
                    </Col>
                </Row>
                <div className="div-miniborder-top" >

                    <div className="div-container" >
                        <div style={{ paddingLeft: '41%', paddingRight: '41%' }} className='center'>
                            <img className="App-logo" src={"./logo.png"} alt="logo" />
                        </div>
                        <br />
                        <Form {...layout}
                            layout="horizontal"
                            onSubmit={(e) => { this.login(e) }}
                        >

                            <Form.Item validateStatus={!this.state.cedulaValida ? 'error' : 'success'}
                        hasFeedback help="La cedula debe contener 10 digitos numericos"

                            >
                                {getFieldDecorator('cedula', {
                                    rules: [{ required: true, message: 'Debe ingresar una cedula valido' }],
                                    initialValue: ''
                                })(
                                    <Input 
                                        onChange={(e) => this.handleInputChange('cedula', e)}
                                        prefix={<UserOutlined />} placeholder="Cedula" />
                                )}


                            </Form.Item>
                            <Form.Item validateStatus={!this.state.passwordValida ? 'error' : 'success'} 
                            hasFeedback help={("La contraseña debe tener de 5 a 10 caracteres e incluir mayúsculas, minúsculas y números")}

                            >
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Debe ingresar una contraseña valida' }],
                                    initialValue: ''
                                })(
                                    <Input
                                        onChange={(e) => this.handleInputChange('password', e)}
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Contraseña Nueva"
                                    />
                                )}


                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button style={{ marginRight: 7 }} type="primary" className="login-form-button" htmlType="submit">Cambiar</Button>   
                            </Form.Item>
                        </Form>                     
                    </div>
                </div>
            </div>
        );
    }
}

UpdatePass = Form.create({})(UpdatePass);
export default UpdatePass;

