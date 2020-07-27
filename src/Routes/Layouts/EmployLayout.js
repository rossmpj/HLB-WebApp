import React from 'react';
import { Layout } from 'antd';
import HeaderComp from '../Components/Header';
import FooterComp from '../Components/Footer';
import SiderEmploy from '../Components/SiderEmploy';
import '../../custom-antd.css'; 
const { Content } = Layout;

const EmployLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
        <SiderEmploy/>
        <Layout className="site-layout">
            <HeaderComp/>
            <Content style={{ margin: '16px' }}>
                {children}
            </Content>
            <FooterComp/>
        </Layout>
    </Layout>
)

export default EmployLayout;