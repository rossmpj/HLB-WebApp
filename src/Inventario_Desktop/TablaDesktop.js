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
    render: text => <a href="!#" >{text}</a>,
  },
  {
    title: 'Empleado',
    dataIndex: 'empleado',
    key: 'empleado',
  },
  {
    title: 'Dirección IP',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'Nombre PC',
    dataIndex: 'name_pc',
    key: 'name_pc',
  },
  {
    title: 'Usuario PC',
    dataIndex: 'user_pc',
    key: 'user_pc',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
  {
    title: 'Sistema operativo',
    dataIndex: 'so',
    key: 'so',
  }, 
  {
    title: 'Service Pack',
    dataIndex: 'servpack',
    key: 'servpack',
  }, 
  {
    title: 'Licencia',
    dataIndex: 'licencia',
    key: 'licencia',
  }, 
  {
    title: 'Tipo de SO',
    dataIndex: 'so_type',
    key: 'so_type',
  }, 
  {
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Monitor',
    dataIndex: 'monitor',
    key: 'monitor',
  },
  {
    title: 'Teclado',
    dataIndex: 'teclado',
    key: 'teclado',
  }, 
  {
    title: 'UPS',
    dataIndex: 'ups',
    key: 'ups',
  },
  {
    title: 'Mouse',
    dataIndex: 'mouse',
    key: 'mouse',
  },
  {
    title: 'Tarjeta madre',
    dataIndex: 'mainboard',
    key: 'mainboard',
  }, 
  {
    title: 'RAM',
    dataIndex: 'ram',
    key: 'ram',
  },  
  {
    title: 'Disco duro',
    dataIndex: 'dd',
    key: 'dd',
  }, 
  {
    title: 'Procesador',
    dataIndex: 'procesador',
    key: 'procesador',
  }, 
  {
    title: 'Tarjeta de red',
    dataIndex: 'tarj_red',
    key: 'tarj_red',
  },
  {
    title: 'Case',
    dataIndex: 'case',
    key: 'case',
  }, 
  {
    title: 'Fuente de poder',
    dataIndex: 'f_poder',
    key: 'f_poder',
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
        <Button style= {{marginRight: '7px'}} type="success" icon="eye" />
        <Button style= {{marginRight: '7px'}} type="info" icon="edit" />
        <Button type="error" icon="delete" />
      </div>
    ),
  },
];

const data = [
  //  {
  //    codigo: 1,
  //    nombre: 'John Brown',
  //    pass: 32,
  //    usuario: 'admin', 
  //    clave: '345',
  //    marca: 'LG',
  //    modelo: 'ergr',
  //    num_serie: 23, 
  //    descripcion: 'muy bueno'
  //  },
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

class TablaDesktop extends React.Component{
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

export default TablaDesktop;