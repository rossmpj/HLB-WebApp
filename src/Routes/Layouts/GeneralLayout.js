import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderGeneral from '../Components/SiderGeneral';
import '../../custom-antd.css'; 
const { Content } = Layout;

const GeneralLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderGeneral/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default GeneralLayout;