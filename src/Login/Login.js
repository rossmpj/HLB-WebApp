import React from 'react';
import '../App.css';
import {
    Form,
    Button,
    Typography,
    Row,
    Col,
    Input,
    message,
    Checkbox
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../custom-antd.css';
import { Link } from 'react-router-dom';
import './login.css'
import Auth from './Auth';
import AxiosAuth from '../Servicios/AxiosAuth';
const tailLayout = {
    wrapperCol: { offset: 11, span: 8 }
};

const layout = {
    labelCol: { span: 20 },
    wrapperCol: { offset: 8, span: 8 },
};
const { Title } = Typography;
const key = 'updatable';

class LoginHLB extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }

    }

    login(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                message.loading({ content: 'Verificando datos...', key });
                AxiosAuth.login(values).then(res => {
                    Auth.authenticate(res.data);
                    setTimeout(() => {
                        message.success({ content: 'Sesion Iniciada con Exito', key, duration: 3 });
                    }, 1000);
                    this.props.history.push("/");
                }).catch(error => {
                    if (error.response.status === 400) {
                        message.error('Las credenciales ingresadas son incorrectas...', 4);
                    }
                    if (error.response.status === 500) {
                        message.error('Ocurrió un error al procesar los datos, inténtelo más tarde', 4);
                    }
                });
            }
        });
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="div-container-title">
                <Row>
                    <Col span={12}><Title level={2}>Iniciar Sesion</Title></Col>
                </Row>
                <div className="div-miniborder-top" >

                    <div className="div-container" >
                        <div style={{paddingLeft:'41%',paddingRight:'41%'}} className  = 'center'>
                            <img className="App-logo" src={"./logo.png"} alt="logo" />
                        </div>
                        <br/>
                        <Form {...layout}
                            layout="horizontal"
                            onSubmit={(e) => { this.login(e) }}
                        >

                            <Form.Item

                            >
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: 'Debe ingresar un usuario valido' }],
                                    initialValue: ''
                                })(
                                    <Input prefix={<UserOutlined />} placeholder="Usuario" />
                                )}


                            </Form.Item>
                            <Form.Item

                            >
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Debe ingresar una contraseña valida' }],
                                    initialValue: ''
                                })(
                                    <Input
                                        prefix={<LockOutlined />}
                                        type="password"
                                        placeholder="Contraseña"
                                    />
                                )}


                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button style={{ marginRight: 7 }} type="primary" className="login-form-button" htmlType="submit">Iniciar Sesión</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

LoginHLB = Form.create({})(LoginHLB);
export default LoginHLB;

