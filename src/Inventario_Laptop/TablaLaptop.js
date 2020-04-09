import React from 'react';
import { Button, Row, Col, Table, Input, Icon, Popconfirm, Tag, Typography, message } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { Link } from 'react-router-dom';
import AxiosLaptop from '../Servicios/AxiosLaptop'
import FuncionesAuxiliares from '../FuncionesAuxiliares'

const { Title } = Typography;

class TablaLaptop extends React.Component{
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
        // {
        //   key: '1',
        //   codigo: 'HLB_COMP_1',
        //   bspi: 'Hospital León Becerra',
        //   departamento: 'Proveeduría',
        //   empleado: 'John Villamar',
        //   marca: 'Lenovo',
        //   modelo: 'h2343',
        //   num_serie: 'tftyfBGPGTH1',
        //   name_pc: 'Admin',
        //   user_pc: 'UsADmin1',
        //   estado: 'No Operativo',
        //   so: 'Windows 10 Home Single Language',
        //   so_type: '64 bits',
        //   servpack: 'No',
        //   licencia: 'Si',
        //   office: '2010',
        //   ip: '1',
        //   id_procesador: 'Intel Core i7-5500U',
        //   frecuencia: '3 GHz',
        //   nnucleos: 4,
        //   ram_soportada: '12 GB',
        //   slots_ram: 2,
        //   rams: ['HLB_S2', 'GGRGHGDGRGT-1', 'DFGHR22'],
        //   discos: ['HLB_DD_9', 'HLB_DDD_1'],
        //   descripcion: 'nn'
        // },
        // {
        //   key: '2',
        //   codigo: 'HL_1',
        //   bspi: 'Unidad Educativa San José Buen Pastor',
        //   departamento: 'UCI',
        //   empleado: 'Carla Villamar',
        //   marca: 'HP',
        //   modelo: 'L450',
        //   num_serie: '24954839605 BGPGTH1',
        //   name_pc: 'UserHLB',
        //   user_pc: 'Usuario',
        //   estado: 'Operativo',
        //   so: 'Windows 7',
        //   so_type: '32 bits',
        //   servpack: 'No',
        //   licencia: 'No',
        //   office: '2019',
        //   ip: 'R3',
        //   id_procesador: 'Intel Core i7-5500U',
        //   ram_soportada: '12 GB',
        //   slots_ram: 2,
        //   rams: ['HLB_Sdg'],
        //   discos: ['HLB_DD_3', 'FGGH24'],
        //   descripcion: 'nn'
        // },
      ]
    };
    this.handleClick = this.handleClick.bind(this);
  }

    obtener_datos = () => {
        let datos = [];
        AxiosLaptop.listar_laptops().then(res => {
        res.data.forEach(function (r) {
            let registro = r.original
            var dip = registro.ip === null ? ' ' : registro.ip.toString();
            let router = {
                key: registro.id_equipo,
                codigo: registro.codigo,
                bspi: registro.bspi,
                departamento: registro.departamento,
                marca: registro.marca,
                modelo: registro.modelo,
                num_serie: registro.numero_serie, 
                estado: registro.estado_operativo,
                ip: dip,
                empleado: registro.empleado+' '+registro.apellido,
                so: registro.so,
                servpack: registro.service_pack === '0' ? 'No' : 'Si',
                so_type: registro.tipo_so,
                name_pc: registro.nombre_pc,
                user_pc: registro.usuario_pc,
                licencia: registro.licencia === '0' ? 'No' : 'Si',
                ram_soportada: registro.ram_soportada,
                slots_ram: registro.numero_slots,
                frecuencia: registro.frecuencia+' GHz',
                nnucleos: registro.nnucleos,
                descripcion: registro.descripcion,
                id_procesador: registro.id_procesador,
                rams: registro.rams,
                discos: registro.discos,
            }
            datos.push(router);
        });
        this.setState({ dataSource: datos });
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
        render: (text, record) =>  <Link to={{ pathname: '/laptop/view', state: { info: record } }} >{text}</Link>,
        ...this.getColumnSearchProps('codigo'),
        sorter: (a, b) => a.codigo.length - b.codigo.length,
        sortOrder: sortedInfo.columnKey === 'codigo' && sortedInfo.order,
      },
      {
        title: 'BSPI Punto',
        dataIndex: 'bspi',
        key: 'bspi',
        elipsis: true,
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
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.departamento, b.departamento),
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
        title: 'Nombre PC',
        dataIndex: 'name_pc',
        key: 'name_pc',
        ...this.getColumnSearchProps('name_pc'),
        sorter: (a, b) => a.name_pc.length - b.name_pc.length,
        sortOrder: sortedInfo.columnKey === 'name_pc' && sortedInfo.order,
      },
      {
        title: 'Usuario PC',
        dataIndex: 'user_pc',
        key: 'user_pc',
        ...this.getColumnSearchProps('user_pc'),
        sorter: (a, b) => a.user_pc.length - b.user_pc.length,
        sortOrder: sortedInfo.columnKey === 'user_pc' && sortedInfo.order,
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
        elipsis: true,
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
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.so_type,b.so_type),
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
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.servpack,b.servpack),
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
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.licencia,b.licencia),
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
        sorter: (a, b) => FuncionesAuxiliares.stringSorter(a.office,b.office),
        sortOrder: sortedInfo.columnKey === 'office' && sortedInfo.order,
      },
      {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
        render: (text, record) =>  <Link to={{ pathname: '/ip/view', state: { info: record } }} >{text}</Link>,
        sorter: (a, b) => a.ip.length - b.ip.length,
        sortOrder: sortedInfo.columnKey === 'ip' && sortedInfo.order,
      },
      {
        title: 'Procesador',
        dataIndex: 'id_procesador',
        key: 'id_procesador',        
        render: text =>  <Link to={{ pathname: '/otros/view', state: { info: text, tipo_equipo: 'procesador'} }} >{text}</Link>,
        sorter: (a, b) => a.nombre_procesador.length - b.nombre_procesador.length,
        sortOrder: sortedInfo.columnKey === 'id_procesador' && sortedInfo.order,
      }, 
      {
        title: 'RAM',
        dataIndex: 'ram',
        key: 'ram',
        children: [
          {
            title: 'Capacidad',
            dataIndex: 'ram_soportada',
            key: 'ram_soportada',
            // width: 130,
            ...this.getColumnSearchProps('ram_soportada'),
            sorter: (a, b) => a.ram_soportada.length - b.ram_soportada.length,
            sortOrder: sortedInfo.columnKey === 'ram_soportada' && sortedInfo.order,
          },  
          {
            title: 'Slots',
            dataIndex: 'slots_ram',
            key: 'slots_ram',
            // width: 140,
            ...this.getColumnSearchProps('slots_ram'),
            sorter: (a, b) => a.slots_ram.length - b.slots_ram.length,
            sortOrder: sortedInfo.columnKey === 'slots_ram' && sortedInfo.order,
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
        ],
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
                        <Link key={id_disco} to={{ pathname: '/otros/view', state: { info: id_disco, tipo_equipo: 'disco Duro' } }} >
                        <Tag style={{margin: 2}} color="blue" key={id_disco.toString()}>{id_disco}</Tag>
                        </Link>              
                    );
                })}
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
            <Link to={{ pathname: '/laptop/form', state: { info: record, titulo: "Editar laptop" } }} >
              <Button style= {{marginRight: '2px'}} size="small" type="primary" icon="edit" />
            </Link>
            <Popconfirm placement="topRight" 
            title="¿Desea eliminar este registro?" 
            okText="Si" cancelText="No" onConfirm={() => this.handleDelete(record.key)}>
            <Button type="danger" size="small" icon="delete" /></Popconfirm>
          </span>
        ),
      },
    ];

    return (
      <div>
        <div className="div-container-title">    
          <Row>
            <Col span={12}><Title level={2}>Inventario de laptops</Title></Col>
            <Col className='flexbox'>
              <Link to={{ pathname: '/laptop/form', state: { titulo: "Nueva laptop" } }} > 
                <Button type="primary" icon="plus">Agregar laptop</Button>
              </Link> 
            </Col>
          </Row>
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
              <Button onClick={this.limpiarFiltros}>Limpiar filtros</Button>
              <Button onClick={this.limpiarBusquedas}>Limpiar búsquedas</Button>
              <Button onClick={this.clearAll}>Limpiar todo</Button>
            </div> 
            <Table bordered key={this.state.index} onChange={this.handleChange} size="small" 
              scroll={{ x: 'max-content' }} columns={columns} dataSource={this.state.dataSource}>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default TablaLaptop;