import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import ExcelExportDesktop from '../Inventario_Desktop/ExcelExportDesktop';
import ExcelExportLaptop from '../Inventario_Laptop/ExcelExportLaptop';
import ExcelExportImpresora from '../Inventario_Impresora/ExcelExportImpresora';
import ExcelExportEquipo from '../Inventario_Equipo/ExcelExportEquipo';
import ExcelExportRouter from '../Inventario_Router/ExcelExportRouter';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportMasivo extends Component {

    filtrarData(tipo_equipo){
        let otros = ['desktop','laptop','router','impresora']
        let ids = [];
        this.props.data.forEach(element => {
            if(element['tipo_equipo'].toLowerCase() === tipo_equipo){
                ids.push(element['id_equipo']);
            }
            if(tipo_equipo === 'otros' && otros.indexOf(element['tipo_equipo'].toLowerCase())===-1){
                ids.push(element['id_equipo']);
            }
        });
        let arrayData = this.props.data_detallada[tipo_equipo];
        let res = arrayData!==undefined && arrayData !== null ? arrayData.filter(function(obj){return ids.indexOf(obj['id_equipo']) > -1}) : [];
        
        return res;
    }


     
    render() {
        return (
            <div>
                <ExcelFile filename={'Reporte Equipos Informaticos Asignados'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={ExcelExportDesktop.generateData(this.filtrarData('desktop'))} name='Inventario Computadores Escritorio' />
                    <ExcelSheet dataSet={ExcelExportLaptop.generateData(this.filtrarData('laptop'))} name='Inventario Laptops' />
                    <ExcelSheet dataSet={ExcelExportImpresora.generateData(this.filtrarData('impresora'))} name='Inventario Impresoras' />
                    <ExcelSheet dataSet={ExcelExportRouter.generateData(this.filtrarData('router'))} name="Inventario Router" />
                    <ExcelSheet dataSet={ExcelExportEquipo.generateData(this.filtrarData('otros'))} name="Inventario Otros Equipos" />
                </ExcelFile>
            </div>
        );
    }
}