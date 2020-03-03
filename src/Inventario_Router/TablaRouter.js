import React from 'react';
import { 
  Button,
  Row, 
  Col,
  Table,
} from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const columns = [
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
  },  
  {
    title: 'Pass',
    dataIndex: 'pass',
    key: 'pass',
  },
  {
    title: 'Usuario',
    dataIndex: 'usuario',
    key: 'usuario',
  }, 
  {
    title: 'Clave',
    dataIndex: 'clave',
    key: 'clave',
  },
  {
    title: 'Marca',
    dataIndex: 'marca',
    key: 'marca',
  },
  {
    title: 'Modelo',
    dataIndex: 'modelo',
    key: 'modelo',
  }, 
  {
    title: 'Número de serie',
    dataIndex: 'num_serie',
    key: 'num_serie',
  },
  {
    title: 'Descripción',
    dataIndex: 'descripcion',
    key: 'descripcion',
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (text, record) => (
      <div>
        <Button style= {{marginRight: '7px'}} size="medium" type="success" icon="eye" />
        <Button style= {{marginRight: '7px'}} size="medium" type="info" icon="edit" />
        <Button size="medium" type="error" icon="delete" />
      </div>
    ),
  },
];

const data = [
  // {
  //   codigo: '1',
  //   nombre: 'John Brown',
  //   pass: 32,
  //   usuario: 'admin', 
  //   clave: '345',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
  {
    codigo: '2',
    nombre: 'Jim Green',
    pass: 42,
    usuario: 'admin', 
    clave: '1234',
    marca: 'LG',
    modelo: 'ergr',
    num_serie: 23, 
    descripcion: 'muy bueno'
  },{
    codigo: '1',
    nombre: 'John Brown',
    pass: 32,
    usuario: 'admin', 
    clave: '345',
    marca: 'LG',
    modelo: 'ergr',
    num_serie: 23, 
    descripcion: 'muy bueno'
  },
  // {
  //   codigo: '2',
  //   nombre: 'Jim Green',
  //   pass: 42,
  //   usuario: 'admin', 
  //   clave: '1234',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },{
  //   codigo: '1',
  //   nombre: 'John Brown',
  //   pass: 32,
  //   usuario: 'admin', 
  //   clave: '345',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
  // {
  //   codigo: '2',
  //   nombre: 'Jim Green',
  //   pass: 42,
  //   usuario: 'admin', 
  //   clave: '1234',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },{
  //   codigo: '1',
  //   nombre: 'John Brown',
  //   pass: 32,
  //   usuario: 'admin', 
  //   clave: '345',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
  // {
  //   codigo: '2',
  //   nombre: 'Jim Green',
  //   pass: 42,
  //   usuario: 'admin', 
  //   clave: '1234',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },{
  //   codigo: '1',
  //   nombre: 'John Brown',
  //   pass: 32,
  //   usuario: 'admin', 
  //   clave: '345',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
  // {
  //   codigo: '2',
  //   nombre: 'Jim Green',
  //   pass: 42,
  //   usuario: 'admin', 
  //   clave: '1234',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
  // {
  //   codigo: '3',
  //   nombre: 'Joe Black',
  //   pass: 432,
  //   usuario: 'admin', 
  //   clave: '1234',
  //   marca: 'LG',
  //   modelo: 'ergr',
  //   num_serie: 23, 
  //   descripcion: 'muy bueno'
  // },
];

class TablaRouter extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showTable:true,
    };
    this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState({
        showComponent: true,
        showTable: false,
      });     
    }

    render() {
      return (
      <div className="div-container">
      <div >
        <Row>
          <Col className='flexbox'>
            <ButtonGroup size="medium">
              <Button type="primary" icon="import">Importar</Button>
              <Button type="primary" icon="cloud-download">Exportar</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
      <br />
      <Table size="medium" columns={columns} dataSource={data}></Table>
    </div>
    );
  }
}

export default TablaRouter;