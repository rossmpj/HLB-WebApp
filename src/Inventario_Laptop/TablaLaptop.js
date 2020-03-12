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
    render: text => <a href="!#">{text}</a>,
  },
  {
    title: 'BSPI Punto',
    dataIndex: 'bspi',
    key: 'bspi',
  },
  {
    title: 'Departamento',
    dataIndex: 'departamento',
    key: 'departamento',
  },
  {
    title: 'Empleado',
    dataIndex: 'empleado',
    key: 'empleado',
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
    title: 'Tipo de SO',
    dataIndex: 'so_type',
    key: 'so_type',
  }, 
  {
    title: 'Service Pack 1',
    dataIndex: 'servpack',
    key: 'servpack',
  }, 
  {
    title: 'Licencia',
    dataIndex: 'licencia',
    key: 'licencia',
  }, 
  {
    title: 'Office',
    dataIndex: 'office',
    key: 'office',
  },
  {
    title: 'Dirección IP',
    dataIndex: 'ip',
    key: 'ip',
    render: text => <a href="!#">{text}</a>,
  },
  {
    title: 'Procesador',
    dataIndex: 'id_procesador',
    key: 'id_procesador',
    children: [
      {
        title: 'Nombre',
        dataIndex: 'nombre_procesador',
        key: 'nombre_procesador',
      },
      {
        title: 'Frecuencia',
        dataIndex: 'frecuencia',
        key: 'frecuencia',
      }, 
      {
        title: 'Núcleos',
        dataIndex: 'nnucleos',
        key: 'nnucleos',
      },
    ],
  }, 
  {
    title: 'RAM',
    dataIndex: 'ram',
    key: 'ram',
    children: [
      {
        title: 'RAM Soportada',
        dataIndex: 'ram_soportada',
        key: 'ram_soportada',
      },  
      {
        title: 'Slots de expansión',
        dataIndex: 'slots_ram',
        key: 'slots_ram',
      },
      {
        title: 'Memorias RAM',
        dataIndex: 'rams',
        key: 'rams',
        render: text => <a href="!#">{text}</a>,
      },  
    ],
  },   
  {
    title: 'Discos duros',
    dataIndex: 'discos',
    key: 'discos',
    render: text => <a href="!#">{text}</a>,
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
        <Button style= {{marginRight: '2px'}} type="success" size="small" icon="eye" />
        <Button style= {{marginRight: '2px'}} type="info" size="small" icon="edit" />
        <Button type="error" icon="delete" size="small" />
      </div>
    ),
  },
];

const data = [
  {
    key: '1',
    codigo: 'HLB_COMP_1',
    bspi: 'Hospital León Becerra',
    departamento: 'Proveeduría',
    empleado: 'John Villamar',
    marca: 'Lenovo',
    modelo: 'L450',
    num_serie: '24954839605 BGPGTH1',
    name_pc: 'UserHLB',
    user_pc: 'Usuario',
    estado: 'No Operativo',
    so: 'Windows 10 Home Single Language',
    so_type: '64 bits',
    servpack: 'Si',
    licencia: 'Si',
    office: '2019',
    ip: 'R3',
    nombre_procesador: 'Intel Core i7-5500U',
    frecuencia: '3 GHz',
    nnucleos: 4,
    ram_soportada: '12 GB',
    slots_ram: 2,
    rams: 'HLB_Sdg',
    discos: 'HLB_DD_3',
    descripcion: 'nn'
  },
];

class TablaLaptop extends React.Component{
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
            <ButtonGroup>
              <Button type="primary" icon="import">Importar</Button>
              <Button type="primary" icon="cloud-download">Exportar</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </div>
      <br />
      <div className="table-operations">
        <Button onClick={this.clearFilters}>Limpiar filtros</Button>
        <Button onClick={this.clearAll}>Limpiar filtros y ordenamientos</Button>
      </div> 
      <Table bordered key={this.state.index} onChange={this.handleChange} size="small" tableLayout={undefined} scroll={{ x: 'max-content' }} columns={columns} dataSource={data}></Table>
    </div>
    );
  }
}

export default TablaLaptop;