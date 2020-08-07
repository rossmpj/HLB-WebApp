import React from 'react';
import { Descriptions, Badge } from 'antd';


function DetalleEquipo(props) {
    return (
        <div key={props.id_equipo}>
            <Descriptions title={props.titulo + (props.index>=0 ? (props.index + 1):"")} bordered column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}> 
                { props.titulo==="Datos del sistema operativo" ?
                    <>
                        <Descriptions.Item label="Sistema operativo" span={2}>{props.so}</Descriptions.Item>
                        <Descriptions.Item label="Tipo de sistema operativo">{props.so_type}</Descriptions.Item>
                        <Descriptions.Item label="Service Pack 1" span={3}><Badge status="success" text={props.servpack} /></Descriptions.Item>
                        <Descriptions.Item label="Licencia" span={3}>
                            <Badge status="error" text={props.licencia} />
                        </Descriptions.Item>
                    </> : null
                }
                {/* <br /> */}
                {props.titulo==="Programa " ?
                    <>
                        <Descriptions.Item span={1} label="Código">{props.codigo} </Descriptions.Item>
                        <Descriptions.Item span={1} label="Nombre">{props.nombre} </Descriptions.Item>
                        <Descriptions.Item span={1} label="Versión">{props.version} </Descriptions.Item>
                        <Descriptions.Item span={1} label="Editor">{props.editor} </Descriptions.Item>
                        <Descriptions.Item span={1} label="Fecha de instalación">{props.fecha_instalacion.slice(0,10)} </Descriptions.Item>
                        <Descriptions.Item span={1} label="Observación">{props.observacion} </Descriptions.Item>
                    </> : null 
                }
                {
                    props.titulo==="Memoria RAM " || (props.titulo==='Disco duro ') || props.titulo==='Procesador ' ?
                    <>  
                        <Descriptions.Item label="Código">{props.codigo} </Descriptions.Item>
                        <Descriptions.Item label="Marca">{props.marca} </Descriptions.Item>
                        <Descriptions.Item label="Modelo">{props.modelo} </Descriptions.Item>
                        <Descriptions.Item label="Número de serie">{props.numero_serie} </Descriptions.Item>
                    
                        {(props.titulo==='Memoria RAM ') || (props.titulo==='Disco duro ') ? 
                            <>
                                <Descriptions.Item label="Capacidad">{props.capacidad} </Descriptions.Item>
                                <Descriptions.Item label="Tipo">{props.tipo} </Descriptions.Item>
                            </> : null
                        }
                        { props.titulo==='Procesador ' ? 
                            <>
                                <Descriptions.Item label="Frecuencia" span={2}>{props.frecuencia} </Descriptions.Item>
                                <Descriptions.Item label="Núcleos" span={2} >{props.nucleos} </Descriptions.Item>
                            </> : null
                        }
                        <Descriptions.Item label="Descripción">{props.descripcion} </Descriptions.Item>
                    </>
                    : null
                }
            </Descriptions>
            <br />
        </div>
    )
}
export default DetalleEquipo;