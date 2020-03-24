import React from 'react';
import '../App.css';
import { Typography } from 'antd';

const { Title } = Typography;


function SinResultados() {
    return (
        <div style={{ textAlign: "center" }}>
            <img className="center" src="/dino.png" alt=":("></img>
           
            <Title level={2}>No existen datos que mostrar</Title>
            
        </div>
    )
}
export default SinResultados;