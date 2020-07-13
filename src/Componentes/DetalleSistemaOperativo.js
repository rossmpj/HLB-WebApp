import React from 'react';
import { Tabs } from 'antd';
import { WindowsOutlined } from '@ant-design/icons';
import DescripcionEquipo from './DetalleEquipo'
import { Descriptions, Badge } from 'antd';

const { TabPane } = Tabs;

function DetalleSistemaOperativo(props) {
    return (
        <TabPane tab={<span><WindowsOutlined />SO</span>} key="2" >
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
            <br />
            <div>
                {props.programas === undefined ? null : 
                    props.programas.map((programa, i) => {
                        return (
                            <div key={programa.id_programa}>
                                <DescripcionEquipo 
                                    titulo={'Programa '} index={i} codigo={programa.codigo} nombre={programa.nombre} version={programa.version} 
                                    editor={programa.editor} fecha_instalacion={programa.fecha_instalacion} observacion={programa.observacion} >
                                </DescripcionEquipo> 
                                <br />
                            </div>
                        );
                    })
                }
            </div>
        </TabPane>
    )
}
export default DetalleSistemaOperativo;