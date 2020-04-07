import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, Tag, Typography } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';

const { Title } = Typography;

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
      index: 0,
      dataSource: [
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
          rams: ['1', 'gfh'],
          discos: ['HLB_DD_4'],
          procesador: 'HLB_PRC',
          tarj_red: 'hlb_tred_1',
          case: 'hlb_cas_4',
          f_alim: 'UPS',
          f_poder: 'HLB_fpod_1',
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
          rams: ['HLB_RAM_1', 'HFDGFSt2', 'GHTH43_34'],
          discos: ['HLB_DD_3', 'THRTE2534'],
          procesador: 'HLB_PRC_0',
          tarj_red: 'hlb_tred_1',
          case: 'hlb_cas_3',
          f_alim: 'Regulador',
          f_poder: 'HLB_fpod_2',
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
          rams: ['HLB_RAM_1'],
          discos: ['HLB_DD_3'],
          procesador: 'HLB_PRC_0',
          tarj_red: 'hlb_tred_1',
          case: 'hlb_cas_3',
          f_alim: 'UPS',          
          f_poder: 'HLB_fpod_3',
          descripcion: ''
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    //this.setState({ dataSource: dataSource.estado = "De baja"})
     this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

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
          Limpiar
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

  sortString(a,b){
    return a.localeCompare(b);
  }

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
        fixed: 'left',
        render: (text, record) =>  <Link to={{ pathname: '/desktop/view', state: { info: record } }} >{text}</Link>,
        ...this.getColumnSearchProps('codigo')
      },
      {
        title: 'BSPI Punto',
        dataIndex: 'bspi',
        key: 'bspi',
        width: 150,
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
        width: 150,
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
        title: 'Tipo SO',
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
        sorter: (a, b) => this.sortString(a.so_type,b.so_type),
        sortOrder: sortedInfo.columnKey === 'so_type' && sortedInfo.order,
      }, 
      {
        title: 'Service Pack 1',
        dataIndex: 'servpack',
        key: 'servpack',
        width: 110,
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
        sorter: (a, b) => this.sortString(a.servpack,b.servpack),
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
        filterMultiple: false,
        filteredValue: filteredInfo.licencia || null,
        onFilter: (value, record) => record.licencia.indexOf(value) === 0,
        sorter: (a, b) => this.sortString(a.licencia,b.licencia),
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
        sorter: (a, b) => this.sortString(a.office,b.office),
        sortOrder: sortedInfo.columnKey === 'office' && sortedInfo.order,
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
        render: (text, record) =>  <Link to={{ pathname: '/ip/view', state: { info: record } }} >{text}</Link>,
      },
      {
        title: 'Monitor',
        dataIndex: 'monitor',
        key: 'monitor',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'monitor'} }} >{text}</Link>,
      },
      {
        title: 'Teclado',
        dataIndex: 'teclado',
        key: 'teclado',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'teclado'} }} >{text}</Link>,
      }, 
      {
        title: 'Parlantes',
        dataIndex: 'parlantes',
        key: 'parlantes',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'parlantes'} }} >{text}</Link>,
      },
      {
        title: 'Mouse',
        dataIndex: 'mouse',
        key: 'mouse',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'mouse'} }} >{text}</Link>,
      },
      {
        title: 'Mainboard',
        dataIndex: 'mainboard',
        key: 'mainboard',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'mainboard'} }} >{text}</Link>,
      }, 
      {
        title: 'Memorias RAM',
        dataIndex: 'rams',
        key: 'rams',
        width: 70,
        render: (rams) => (
          <div>
            {rams.map(id_memoria => {
              return (
                <Link key={id_memoria} to={{ pathname: '/otros/view', state: { info: id_memoria, tipo_equipo: 'memoria RAM' } }} >
                  <Tag style={{margin: 2}} color="cyan" key={id_memoria.toString()}>{id_memoria}</Tag>
                </Link>              
              );
            })}
          </div>
        ),
      },  
      {
        title: 'Discos duros',
        dataIndex: 'discos',
        key: 'discos',
        width: 70,
        render: (discos) => (
          <div>
            {discos.map(id_disco => {
              return (
                <Link key={id_disco} to={{ pathname: '/otros/view', state: { info: id_disco, tipo_equipo: 'disco duro' } }} >
                  <Tag style={{margin: 2}} color="blue" key={id_disco.toString()}>{id_disco}</Tag>
                </Link>              
              );
            })}
          </div>
        ),
      }, 
      {
        title: 'Procesador',
        dataIndex: 'procesador',
        key: 'procesador',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'procesador'} }} >{text}</Link>,
      }, 
      {
        title: 'Tarjeta de red',
        dataIndex: 'tarj_red',
        key: 'tarj_red',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'tarjeta de red'} }} >{text}</Link>,
      },
      {
        title: 'Case',
        dataIndex: 'case',
        key: 'case',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'case'} }} >{text}</Link>,
      },
      {
        title: 'Fuente poder',
        dataIndex: 'f_poder',
        key: 'f_poder',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'fuente de poder' } }} >{text}</Link>,
      },
      {
        title: 'Alimentación',
        dataIndex: 'f_alim',
        key: 'f_alim',
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'fuente de alimentación'} }} >{text}</Link>,
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
        fixed: 'right',
        render: (text, record) => (
          this.state.dataSource.length >= 1 ? (
            <span>
              <Link to={{ pathname: '/desktop/form', state: { info: record, titulo: "Editar computadora" } }} >
                <Button style= {{marginRight: '2px'}} type="primary" icon="edit" />
              </Link>
              <Popconfirm placement="topRight" 
              title="¿Desea eliminar este registro?" 
              okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
              <Button type="danger" icon="delete" /></Popconfirm>
            </span>
          ) : null 
        ),
      },
    ];
      
    return (
      <div>
        <div className="div-container-title">    
          <Row>
            <Col span={12}><Title level={2}>Inventario de computadoras</Title></Col>
            <Col className='flexbox'>
              <Link to={{ pathname: '/desktop/form', state: { titulo: "Nueva computadora" } }} > 
                <Button type="primary" icon="plus">Agregar computadora</Button>
              </Link> 
            </Col>
          </Row>
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
      <Table bordered key={this.state.index} onChange={this.handleChange} size="small" tableLayout={undefined} 
      scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
    </div>
        </div>
      </div>
    );
  }
}

export default TablaDesktop;