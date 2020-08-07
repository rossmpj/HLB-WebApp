import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportIP extends Component {

    generateTitlesRouter(){
        let titulos = ['IP','BSPI Punto', 'Departamento', 'Empleado',  'Codigo Equipo Asignado', 'Tipo Eqipo Asignado',
         'Estado','Hostname', 'Subred', 'Fortigate', 'Maquinas Adicionales', 'Asignado', 'Encargado', 'Observacion'] 
        return FuncionesAuxiliares.generateTitlesExcel(titulos,'00B050');
    }

    transform_estado(estado) {
        if (estado === 'R') return 'Libre'
        if (estado === 'EU') return 'En Uso'
        return '-'
    }

    generateColumnsRouter(){
        let rows = []
        this.props.data.forEach(element => {
            let row = [
                { 'value': FuncionesAuxiliares.validarCampo(element.ip, '-'), style: {fill: {patternType: "solid", fgColor: {rgb: "D6DCE4"}}} },
                { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
                { 'value': FuncionesAuxiliares.validarCampo(element.departamento, 'No Asignado')  },
                { 'value': FuncionesAuxiliares.validarCampo(element.empleado, 'No Asignado')},
                { 'value': FuncionesAuxiliares.validarCampo(element.codigo_equipo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.tipo_equipo, '-') },
                { 'value': this.transform_estado(element.estado) },
                { 'value': FuncionesAuxiliares.validarCampo(element.hostname, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.subred, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.fortigate, '-')},
                { 'value': FuncionesAuxiliares.validarCampo(element.maquinas, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.asignado, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.encargado, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.observacion, '-')},
            ]
            rows.push(row);
        });
        return rows;
    }

    generateData(){
        return [{
            columns: this.generateTitlesRouter(),
            data: this.generateColumnsRouter()
        }];
    }
     
    render() {
        return (
            <div>
                <ExcelFile filename={'Inventario IPs'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                <ExcelSheet dataSet={this.generateData()} name="Inventario IPs" />
                </ExcelFile>
            </div>
        );
    }
}