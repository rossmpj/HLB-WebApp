import React from 'react';
import { Button, Row, Col, Table, Input, Icon } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const data = [
  {
    key:'1',
    codigo: 'HLB_COMP_3',
    bspi: 'Hospital León Becerra',
    departamento: 'Financiero',
    empleado: 'Victor Toral',
    name_pc: 'Contador-PC',
    user_pc: 'Contador',
    estado: 'Operativo',
    so: 'Windows 7 Professional',
    so_type: '32 bits',
    servpack: 'No',
    licencia: 'No',
    office: '2013',
    ip: '8',
    monitor: 'HLB_MNT_1',
    teclado: 'HLB_TEC_12',
    mouse: 'HLB_MOU_35',
    parlantes: 'HLB_PAR_23',
    mainboard: 'HLB_MNB_34',
    ram: ['1', 'gfh'],
    dd: 'HLB_DD_4',
    procesador: 'HLB_PRC',
    tarj_red: 'hlb_tred_1',
    case: 'hlb_cas_4',
    f_alim: 'UPS',
    descripcion: 'revisar'
  },
  {
    key:'2',
    codigo: 'HLB_COMP_1',
    bspi: 'Hospital León Becerra',
    departamento: 'Proveeduría',
    empleado: 'John Villamar',
    name_pc: 'UserHLB',
    user_pc: 'Usuario',
    estado: 'No Operativo',
    so: 'Windows 10 Home Single Language',
    so_type: '64 bits',
    servpack: 'Si',
    licencia: 'Si',
    office: '2019',
    ip: 'R3',
    monitor: 'HLB_MNT_2',
    teclado: 'HLB_TEC_13',
    mouse: 'HLB_MOU_36',
    parlantes: 'HLB_PAR_22',
    mainboard: 'HLB_MNB_32',
    ram: 'HLB_RAM_1',
    dd: 'HLB_DD_3',
    procesador: 'HLB_PRC_0',
    tarj_red: 'hlb_tred_1',
    case: 'hlb_cas_3',
    f_alim: 'Regulador',
    descripcion: ''
  },
  {
    key:'63',
    codigo: 'HLB_COMP_1',
    bspi: 'Residencia Mercedes Begué',
    departamento: 'Auditoría',
    empleado: 'John Villamar',
    name_pc: 'UserHLB',
    user_pc: 'Usuario',
    estado: 'No Operativo',
    so: 'Windows 8.1 Pro',
    so_type: '32 bits',
    servpack: 'No',
    licencia: 'Si',
    office: '2007',
    ip: 'R3',
    monitor: 'HLB_MNT_2',
    teclado: 'HLB_TEC_13',
    mouse: 'HLB_MOU_36',
    parlantes: 'HLB_PAR_22',
    mainboard: 'HLB_MNB_32',
    ram: 'HLB_RAM_1',
    dd: 'HLB_DD_3',
    procesador: 'HLB_PRC_0',
    tarj_red: 'hlb_tred_1',
    case: 'hlb_cas_3',
    f_alim: 'UPS',
    descripcion: ''
  },
  
];

class TablaDesktop extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      showComponent: false,
      showTable:true,
      filteredInfo: null,
      sortedInfo: null,
      searchText: '',
      searchedColumn: '',
      index: 0
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      showComponent: true,
      showTable: false,
    });     
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  
  limpiarFiltros = () => {
    this.setState({ filteredInfo: null });
  };
  
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      index: this.state.index + 1
    });
  };

  limpiarBusquedas = () => {
    this.setState({
      index: this.state.index +1
    })
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => { this.searchInput = node }
          }
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
        <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    }
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Código', 
        dataIndex: 'codigo',
        key: 'codigo',
        render: text => <a href="!#" >{text}</a>,
        ...this.getColumnSearchProps('codigo')
      },
      {
        title: 'BSPI Punto',
        dataIndex: 'bspi',
        key: 'bspi',
        filters: [
          {
              text: 'Hospital León Becerra',
              value: 'Hospital León Becerra',
          },
          {
              text: 'Hogar Inés Chambers',
              value: 'Hogar Inés Chambers',
          },
          {
            text: 'Unidad Educativa San José Buen Pastor',
            value: 'Unidad Educativa San José Buen Pastor',
          },
          {
            text: 'Residencia Mercedes Begué',
            value: 'Residencia Mercedes Begué',
          }
        ],
        filteredValue: filteredInfo.bspi || null,
        onFilter: (value, record) => record.bspi.indexOf(value) === 0,
        sorter: (a, b) => a.bspi.length - b.bspi.length,
        sortOrder: sortedInfo.columnKey === 'bspi' && sortedInfo.order,
      },
      {
        title: 'Departamento',
        dataIndex: 'departamento',
        key: 'departamento',
        filters: [
          {
              text: 'Financiero',
              value: 'Financiero',
          },
          {
              text: 'Proveeduría',
              value: 'Proveeduría',
          },
          {
              text: 'Auditoría',
              value: 'Auditoría',
          }
        ],
        filteredValue: filteredInfo.departamento || null,
        onFilter: (value, record) => record.departamento.indexOf(value) === 0,
        sorter: (a, b) => a.departamento.length - b.departamento.length,
        sortOrder: sortedInfo.columnKey === 'departamento' && sortedInfo.order,
      },
      {
        title: 'Empleado',
        dataIndex: 'empleado',
        key: 'empleado',
        ...this.getColumnSearchProps('empleado')
      },
      {
        title: 'Nombre PC',
        dataIndex: 'name_pc',
        key: 'name_pc',
        ...this.getColumnSearchProps('name_pc')
      },
      {
        title: 'Usuario PC',
        dataIndex: 'user_pc',
        key: 'user_pc',
        ...this.getColumnSearchProps('user_pc')
      },
      {
        title: 'Estado',
        dataIndex: 'estado',
        key: 'estado',
        filters: [
          {
              text: 'Operativo',
              value: 'Operativo',
          },
          {
              text: 'No Operativo',
              value: 'No Operativo',
          }
        ],
        filteredValue: filteredInfo.estado || null,
        onFilter: (value, record) => record.estado.indexOf(value) === 0,
        sorter: (a, b) => a.estado.length - b.estado.length,
        sortOrder: sortedInfo.columnKey === 'estado' && sortedInfo.order,
      },
      {
        title: 'Sistema operativo',
        dataIndex: 'so',
        key: 'so',
        filters: [
          {
              text: 'Windows 10 Home Single Language',
              value: 'Windows 10 Home Single Language',
          },
          {
              text: 'Windows 8.1 Pro',
              value: 'Windows 8.1 Pro',
          },
          {
              text: 'Windows 7 Professional',
              value: 'Windows 7 Professional',
          }
        ],
        filteredValue: filteredInfo.so || null,
        onFilter: (value, record) => record.so.indexOf(value) === 0,
        sorter: (a, b) => a.so.length - b.so.length,
        sortOrder: sortedInfo.columnKey === 'so' && sortedInfo.order,
      }, 
      {
        title: 'Tipo de SO',
        dataIndex: 'so_type',
        key: 'so_type',
        filters: [
          {
              text: '32 bits',
              value: '32 bits',
          },
          {
              text: '64 bits',
              value: '64 bits',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.so_type || null,
        onFilter: (value, record) => record.so_type.indexOf(value) === 0,
        sorter: (a, b) => a.so_type.length - b.so_type.length,
        sortOrder: sortedInfo.columnKey === 'so_type' && sortedInfo.order,
      }, 
      {
        title: 'Service Pack 1',
        dataIndex: 'servpack',
        key: 'servpack',
        filters: [
          {
              text: 'Si',
              value: 'Si',
          },
          {
              text: 'No',
              value: 'No',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.servpack || null,
        onFilter: (value, record) => record.servpack.indexOf(value) === 0,
        sorter: (a, b) => a.servpack.length - b.servpack.length,
        sortOrder: sortedInfo.columnKey === 'servpack' && sortedInfo.order,
      }, 
      {
        title: 'Licencia',
        dataIndex: 'licencia',
        key: 'licencia',
        filters: [
          {
              text: 'Si',
              value: 'Si',
          },
          {
              text: 'No',
              value: 'No',
          }
        ],
        // filterMultiple: false,
        filteredValue: filteredInfo.licencia || null,
        onFilter: (value, record) => record.licencia.indexOf(value) === 0,
        sorter: (a, b) => a.licencia.length - b.licencia.length,
        sortOrder: sortedInfo.columnKey === 'licencia' && sortedInfo.order,
      }, 
      {
        title: 'Office',
        dataIndex: 'office',
        key: 'office',
        filters: [
          {
              text: '2007',
              value: '2007',
          },
          {
              text: '2010',
              value: '2010',
          },
          {
              text: '2013',
              value: '2013',
          },
          {
              text: '2016',
              value: '2016',
          },
          {
              text: '2019',
              value: '2019',
          }
        ],
        filteredValue: filteredInfo.office || null,
        onFilter: (value, record) => record.office.indexOf(value) === 0,
        sorter: (a, b) => a.office.length - b.office.length,
        sortOrder: sortedInfo.columnKey === 'office' && sortedInfo.order,
      },
      {
        title: 'Dirección IP',
        dataIndex: 'ip',
        key: 'ip',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Monitor',
        dataIndex: 'monitor',
        key: 'monitor',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Teclado',
        dataIndex: 'teclado',
        key: 'teclado',
        render: text => <a href="!#" >{text}</a>,
      }, 
      {
        title: 'Parlantes',
        dataIndex: 'parlantes',
        key: 'parlantes',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Mouse',
        dataIndex: 'mouse',
        key: 'mouse',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Tarjeta madre',
        dataIndex: 'mainboard',
        key: 'mainboard',
        render: text => <a href="!#" >{text}</a>,
      }, 
      {
        title: 'RAM',
        dataIndex: 'ram',
        key: 'ram',
        render: text => <a href="!#" >{text}</a>,
      },  
      {
        title: 'Disco duro',
        dataIndex: 'dd',
        key: 'dd',
        render: text => <a href="!#" >{text}</a>,
      }, 
      {
        title: 'Procesador',
        dataIndex: 'procesador',
        key: 'procesador',
        render: text => <a href="!#" >{text}</a>,
      }, 
      {
        title: 'Tarjeta de red',
        dataIndex: 'tarj_red',
        key: 'tarj_red',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Case',
        dataIndex: 'case',
        key: 'case',
        render: text => <a href="!#" >{text}</a>,
      },
      {
        title: 'Fuente de alimentación',
        dataIndex: 'f_alim',
        key: 'f_alim',
        render: text => <a href="!#" >{text}</a>,
        filters: [
          {
              text: 'UPS',
              value: 'UPS',
          },
          {
              text: 'Regulador',
              value: 'Regulador',
          }
        ],
        filterMultiple: false,
        filteredValue: filteredInfo.f_alim || null,
        onFilter: (value, record) => record.f_alim.indexOf(value) === 0,
        sorter: (a, b) => a.f_alim.length - b.f_alim.length,
        sortOrder: sortedInfo.columnKey === 'f_alim' && sortedInfo.order,
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
      <div className="table-operations">
        <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
        <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
        <Button onClick={this.clearAll}>Limpiar todo</Button>
      </div> 
      <Table key={this.state.index} onChange={this.handleChange} size="small" tableLayout={undefined} scroll={{ x: 'max-content' }} columns={columns} dataSource={data}></Table>
    </div>
    );
  }
}

export default TablaDesktop;