import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, Typography } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';

const { Title } = Typography;

class TablaRouter extends React.Component{
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
      dataSource : [
        {
          key: 1,
          codigo: '0',
          bspi: 'Hogar Inés Chambers',
          departamento: 'Proveeduría',
          empleado: 'John Villamar',
          nombre: 'John Brown',
          pass: 'gjgkd32',
          ip: '2',
          penlace: '192.168.1.0',
          usuario: 'drgd5547', 
          clave: '345',
          marca: 'LG',
          modelo: 'ergr',
          num_serie: 23,
          estado: 'Operativo',
          descripcion: 'muy bueno'
        },
        {
          key: 112,
          codigo: '1',
          bspi: 'Hospital León Becerra',
          departamento: 'Proveeduría',
          empleado: 'Marco Mendieta',
          nombre: 'John Brown',
          pass: 'admin132',
          ip: '78',
          penlace: '192.168.1.0',
          usuario: 'admin', 
          clave: '345',
          marca: 'HP',
          modelo: 'ergr',
          num_serie: '23',
          estado: 'Operativo',
          descripcion: 'muy bueno'
        },
        {
          key: 3,
          codigo: '2',
          bspi: 'Residencia Mercedes Begué',
          departamento: 'Proveeduría',
          empleado: 'John Villamar',
          nombre: 'Hospital1',
          pass: '123456',
          ip: '16',
          penlace: '0.0.1.0',
          usuario: 'dgfthw', 
          clave: '345',
          marca: 'Lenovo',
          modelo: 'ergr',
          num_serie: '23',
          estado: 'Operativo',
          descripcion: 'muy bueno'
        },
        {
          key: 7,
          codigo: 'HlB-454',
          bspi: 'Unidad Educativa San José Buen Pastor',
          departamento: 'UCI',
          empleado: 'Rosa Pincay',
          nombre: 'John Brown',
          pass: '4321',
          ip: '',
          penlace: '',
          usuario: 'hpso', 
          clave: '345',
          marca: 'TPLink',
          modelo: 'ergr',
          num_serie: '23',
          estado: 'Operativo',
          descripcion: 'muy bueno'
        },
        {
          key: 5,
          codigo: '3',
          bspi: 'Unidad Educativa San José Buen Pastor',
          departamento: 'UCI',
          empleado: 'Rosa Pincay',
          nombre: 'John Brown',
          pass: '4321',
          ip: '125',
          penlace: '192.168.1.0',
          usuario: 'hpso', 
          clave: '345',
          marca: 'TPLink',
          modelo: 'ergr',
          num_serie: '23',
          estado: 'Operativo',
          descripcion: 'muy bueno'
        },
      ]
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
          render: (text, record) => <Link to={{ pathname: '/router/view', state: { info: record } }} >{text}</Link>,
          ...this.getColumnSearchProps('codigo'),
          sorter: (a, b) => this.sortString(a.codigo,b.codigo),
          sortOrder: sortedInfo.columnKey === 'codigo' && sortedInfo.order,
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
            },
            {
                text: 'UCI',
                value: 'UCI',
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
          ...this.getColumnSearchProps('empleado'),
          sorter: (a, b) => a.empleado.length - b.empleado.length,
          sortOrder: sortedInfo.columnKey === 'empleado' && sortedInfo.order,
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          ...this.getColumnSearchProps('nombre'),
          sorter: (a, b) => a.nombre.length - b.nombre.length,
          sortOrder: sortedInfo.columnKey === 'nombre' && sortedInfo.order,
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
          ...this.getColumnSearchProps('usuario'),
          sorter: (a, b) => a.usuario.length - b.usuario.length,
          sortOrder: sortedInfo.columnKey === 'usuario' && sortedInfo.order,
        }, 
        {
          title: 'Clave',
          dataIndex: 'clave',
          key: 'clave',
        },
        {
          title: 'IP',
          dataIndex: 'ip',
          key: 'ip',
          render: (text, record) => <Link to={{ pathname: '/ip/view', state: { info: record } }} >{text}</Link>,
          sorter: (a, b) => a.ip.length - b.ip.length,
          sortOrder: sortedInfo.columnKey === 'ip' && sortedInfo.order,
        },
        {
          title: 'Puerta enlace',
          dataIndex: 'penlace',
          key: 'penlace',
          ...this.getColumnSearchProps('penlace'),
          sorter: (a, b) => this.sortString(a.penlace,b.penlace),
          sortOrder: sortedInfo.columnKey === 'penlace' && sortedInfo.order,
          
        },
        {
          title: 'Marca',
          dataIndex: 'marca',
          key: 'marca',
          filters: [
            {
                text: 'LG',
                value: 'LG',
            },
            {
                text: 'Lenovo',
                value: 'Lenovo',
            },
            {
                text: 'HP',
                value: 'HP',
            }
          ],
          filteredValue: filteredInfo.marca || null,
          onFilter: (value, record) => record.marca.indexOf(value) === 0,
          sorter: (a, b) => a.marca.length - b.marca.length,
          sortOrder: sortedInfo.columnKey === 'marca' && sortedInfo.order,
        },
        {
          title: 'Modelo',
          dataIndex: 'modelo',
          key: 'modelo',
          ...this.getColumnSearchProps('modelo'),
          sorter: (a, b) => a.modelo.length - b.modelo.length,
          sortOrder: sortedInfo.columnKey === 'modelo' && sortedInfo.order,
        }, 
        {
          title: 'S/N',
          dataIndex: 'num_serie',
          key: 'num_serie',
          ...this.getColumnSearchProps('num_serie'),
          sorter: (a, b) => a.num_serie.length - b.num_serie.length,
          sortOrder: sortedInfo.columnKey === 'num_serie' && sortedInfo.order,
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
          title: 'Descripción',
          dataIndex: 'descripcion',
          key: 'descripcion',
        },
        {
          title: 'Acción',
          key: 'accion',
          fixed: 'right',
          render: (text, record) => (
            <span> 
              <Link to={{ pathname: '/router/form', state: { info: record, titulo: "Editar router" } }} >
                <Button style= {{marginRight: '2px'}} type="primary" ghost size="small" icon="edit" />
              </Link>
              
              <Popconfirm placement="topRight" 
              title="¿Desea eliminar este registro?" 
              okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
              <Button type="danger" icon="delete" ghost size="small" /></Popconfirm>
            </span>
          ),  
        },
    ];
    return (
      <div>
        <div className="div-container-title">    
          <Row>
            <Col span={12}><Title level={2}>Inventario de routers</Title></Col>
            <Col className='flexbox'>
              <Link to={{ pathname: '/router/form', state: { titulo: "Nuevo router" } }} > 
                <Button type="primary" icon="plus">Agregar router</Button>
              </Link> 
            </Col>
          </Row>
          <div className="div-container">
            <div>
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
              <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
              <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
              <Button onClick={this.clearAll}>Limpiar todo</Button>
            </div>
            <Table size="small" bordered key={this.state.index} onChange={this.handleChange} tableLayout={undefined} 
            scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}></Table>
          </div>
        </div>
      </div>
    );
  }
}

export default TablaRouter;