import React from 'react';
import '../App.css';
import { Typography } from 'antd';

const { Title } = Typography;


function Home() {
    return (
        <div style={{ textAlign: "center" }}>
            <img className="center" src="/little.jpg" alt=":)"></img>
           
            <Title level={2}>Inventario de equipos informáticos</Title>
            
        </div>
    )
}
export default Home;