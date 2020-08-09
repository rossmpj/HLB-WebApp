import React from 'react';
import { Layout} from 'antd';
import '../../custom-antd.css';
const { Header } = Layout;

export default class HeaderGlobal extends React.Component {

    render() {
        return (
            <Header className="site-layout-background" style={{display: 'flex', alignItems: 'center',justifyContent: 'flex-end'}}>
                <img className="App-logo" src={"./Boton.png"} alt="icon" style={{height:'80px', width:'80px'}}/> 
            </Header>
        );

    }
}