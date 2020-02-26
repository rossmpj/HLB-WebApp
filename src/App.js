import React from 'react';
import ASider from './ASider.js';
//import 'antd/dist/antd.css';
import './custom-antd.css'; // or 'antd/dist/antd.less' 'antd/dist/antd.css'
import { Layout, Table, Tag } from 'antd';
import { Typography } from 'antd';
import { Input } from 'antd';
import { Button, message } from 'antd';
import { Row, Col } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const { Search } = Input;

const { Title } = Typography;

const { Header, Footer, Content } = Layout;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <div style={{ margin:'5px'}}>
        <Button type="success" icon="eye" />
        <Button type="info" icon="edit" />
        <Button type="error" icon="delete" />
      </div>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

function App() {
  return (
    <Layout>
      <Header >   
      
       <img className="logo" src={"./logo.png"} /> 
{/*      <Menu
          theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        
        
 
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item> 
      </Menu>*/}
     {/* <Title>Inventario de equipos</Title> */}
    </Header>
        <Layout>
        <ASider></ASider>
        <Content style={{
            // background: '#fff',
            padding: 24, 
            margin: 0,
            minHeight: 610,
          }}>
            
            
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}> 
            <Title>Inventario</Title>
            <div> 
              <Row>
                <Col offset={18} span={4}>
                  <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                </Col>
                <Col span={2}>
                  <ButtonGroup  value="large" >
                    <Button type="primary" icon="import" />
                    <Button type="primary" icon="cloud-download" />
                  </ButtonGroup>
                </Col>
              </Row>
              <Row>
                <Col offset={20} span={4}>
                  <Button type="primary" icon="plus">Agregar nuevo</Button>
                </Col>
              </Row>
            </div>
             {/* <br /><br /> */}
             <Table columns={columns} dataSource={data}></Table> 
    
             </div>
                  
          </Content>
        </Layout>
      <Footer className="App">Inventario Hospital León Becerra ©2020 Created by EasySoft</Footer>
    </Layout>
  );
}

export default App;
