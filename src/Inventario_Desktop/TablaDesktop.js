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
    title: 'Departamento',
    dataIndex: 'dpto',
    key: 'dpto',
  },
  {
    title: 'Empleado',
    dataIndex: 'empleado',
    key: 'empleado',
  },
  {
    title: 'Código',
    dataIndex: 'codigo',
    key: 'codigo',
    render: text => <a>{text}</a>,
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
    title: 'Dirección IP',
    dataIndex: 'ip',
    key: 'ip',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tarjeta madre',
    dataIndex: 'mainboard',
    key: 'mainboard',
  }, 
  {
    title: 'RAM Soportada',
    dataIndex: 'ram',
    key: 'ram',
  },  
  //importante
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
    title: 'Procesador',
    dataIndex: 'procesador',
    key: 'procesador',
  }, 
  {
    title: 'Disco duro',
    dataIndex: 'dd',
    key: 'dd',
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
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
  {
    title: 'UPS',
    dataIndex: 'ups',
    key: 'ups',
  },
  //considerar
  {
    title: 'Número de slots para RAM',
    dataIndex: 'slots_ram',
    key: 'slots_ram',
  },
  {
    title: 'Frecuencia del procesador',
    dataIndex: 'frecuencia',
    key: 'frecuencia',
  }, 
  {
    title: 'Núcleos del prcesador',
    dataIndex: 'clave',
    key: 'clave',
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