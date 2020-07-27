import React from 'react';
import { Layout } from 'antd';
import '../../custom-antd.css'; 
const { Footer } = Layout;

export default class FooterComp extends React.Component{
    render(){
        return (<Footer className="style-footer">Inventario Hospital León Becerra ©2020 Creado por EasySoft [ESPOL]</Footer>);
    }
}