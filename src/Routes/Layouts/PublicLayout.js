import React from 'react';
import { Layout } from 'antd';
import HeaderGlobal from '../Components/HeaderGlobal';
import FooterComp from '../Components/Footer';
import '../../custom-antd.css'; 
const { Content } = Layout;

const PublicLayout = ({children}) =>(
    <Layout style={{ minHeight: '100vh' }}>
            <HeaderGlobal/>
                <Content style={{ margin: '16px' }}>
                    {children}
                </Content>
            <FooterComp/>
    </Layout>
)

export default PublicLayout;