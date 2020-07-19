import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, Typography, message, Tag } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import AxiosRouter from '../Servicios/AxiosRouter';
import ExcelExportRouter from './ExcelExportRouter';
import FuncionesAuxiliares from '../FuncionesAuxiliares';
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
      id_router: 0,
      dataSource: [],
      currentDataSource:[],
      disabelExport:true,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  
  recargar_datos(){
    this.obtener_datos();
  }

    obtener_datos = () => {
        let datos = [];
        AxiosRouter.listar_routers().then(res => {
        datos = FuncionesAuxiliares.transform_data_router(res.data);
        this.setState({ dataSource: datos, currentDataSource:datos, disabelExport:false }); 
        }).catch(err => {
            message.error('No se pueden cargar los datos, inténtelo más tarde', 4);
        });
    }
  
  componentDidMount = () => {
    this.obtener_datos();
  }

  handleClick() {
    this.setState({
      showComponent: true,
      showTable: false,
    });     
  }

  handleChange = (pagination, filters, sorter, currentDataSource) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
      currentDataSource: currentDataSource.currentDataSource
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

  handleDelete(id) {
    console.log("clave a eliminar",id)
    AxiosRouter.eliminar_router(id).then(res => {
      message.success({ content: 'Registro eliminado satisfactoriamente', duration: 3 });
      this.recargar_datos();
    }).catch(err => {
      message.error("Ha ocurrido un error al procesar la petición, inténtelo más tarde", 4);
    });
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
          render: (text, record) => <Link to={{ pathname: '/router/view/'+record.key}} >{text}</Link>,
          ...this.getColumnSearchProps('codigo'),
          sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.codigo, b.codigo),
          sortOrder: sortedInfo.columnKey === 'codigo' && sortedInfo.order,
        },
        {
          title: 'BSPI Punto',
          dataIndex: 'bspi',
          key: 'bspi',
          width: 130,
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
          sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.departamento, b.departamento),
          sortOrder: sortedInfo.columnKey === 'departamento' && sortedInfo.order,
        },
        {
          title: 'Empleado',
          dataIndex: 'empleado',
          key: 'empleado',
          ...this.getColumnSearchProps('empleado'),
          sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.empleado,b.empleado),
          sortOrder: sortedInfo.columnKey === 'empleado' && sortedInfo.order,
        },
        {
          title: 'Nombre',
          dataIndex: 'nombre',
          key: 'nombre',
          ...this.getColumnSearchProps('nombre'),
          sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.nombre, b.nombre),
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
          render: (text, record) => <Link to={{ pathname: '/ip/view/'+record.ip}} >{text}</Link>,
        },
        {
          title: 'Puerta enlace',
          dataIndex: 'penlace',
          key: 'penlace',
          ...this.getColumnSearchProps('penlace'),
          sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.penlace,b.penlace),
          sortOrder: sortedInfo.columnKey === 'penlace' && sortedInfo.order,
          
        },
        {
          title: 'Marca',
          dataIndex: 'marca',
          key: 'marca',
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
                text: 'Disponible',
                value: 'D',
            },
            {
                text: 'Operativo',
                value: 'O',
            },
            {
                text: 'En revisión',
                value: 'ER',
            },
            {
                text: 'Reparado',
                value: 'R',
            },
            {
                text: 'De baja',
                value: 'B',
            }
          ],
          filteredValue: filteredInfo.estado || null,
          onFilter: (value, record) => record.estado.indexOf(value) === 0,
          sorter: (a, b) => a.estado.length - b.estado.length,
          sortOrder: sortedInfo.columnKey === 'estado' && sortedInfo.order,
          render: (text, value) => (
            <div >
                {text==="D" ? <Tag style={{margin: 2}} color="green" key={value}>Disponible</Tag> : 
                text==="O" ?  <Tag style={{margin: 2}} color="blue" key={value}>Operativo</Tag> :
                text==="ER" ?  <Tag style={{margin: 2}} color="orange" key={value}>En revisión</Tag> :
                text==="R" ?  <Tag style={{margin: 2}} color="magenta" key={value}>Reparado</Tag> :
                                <Tag style={{margin: 2}} color="red" key={value}>De baja</Tag> }
            </div>
          ),
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
                <Link to={{ pathname: '/router/form', state: { info: record, titulo: "Editar router", disabled: true } }} >
                    {record.estado === 'B' ? <Button disabled style= {{marginRight: '2px'}} type="primary" size="small" icon="edit" /> :
                    <Button style= {{marginRight: '2px'}} type="primary" size="small" icon="edit" /> }
                </Link>

                <Popconfirm placement="topRight" 
                title="¿Desea eliminar este registro?" 
                okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
                    {record.estado === 'B' ? 
                    <Button disabled type="danger" icon="delete" size="small" /> : <Button type="danger" icon="delete" size="small" /> }
                </Popconfirm> 
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
                  {/* <ButtonGroup> */}
                    <Button type="primary" icon="import">Importar</Button>
                    {/* <Button type="primary" icon="cloud-download">Exportar</Button> */}
                    <ExcelExportRouter data={this.state.currentDataSource} dis = {this.state.disabelExport}></ExcelExportRouter>
                  {/* </ButtonGroup> */}
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