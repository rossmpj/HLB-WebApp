import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportCorreo extends Component {

    generateTitlesImp(){
        let titulos = ['BSPI Punto', 'Departamento', 'Empleado', 'Correo', 'Pass', 'Estado', 'Fecha de Asignacion'] 
        return FuncionesAuxiliares.generateTitlesExcel(titulos,'FFC000');
    }

    transform_estado(estado,replace='-'){
        if (estado === 'EU') return 'En Uso';
        if (estado === 'I') return 'Inactivo';
        return replace;
    }

    generateColumnsImp(){
        let rows = []
        this.props.data.forEach(element => {
            let row = [
                { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
                { 'value': FuncionesAuxiliares.validarCampo(element.departamento, 'No Asignado')  },
                { 'value': FuncionesAuxiliares.validarCampo(element.empleado, 'No Asignado')},
                { 'value': FuncionesAuxiliares.validarCampo(element.correo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.contrasena, '-') },
                { 'value': this.transform_estado(element.estado) },
                { 'value': FuncionesAuxiliares.validarCampo(element.asignacion, '-') },
            ]
            rows.push(row);
        });
        return rows;
    }

    generateData(){
        return [{
            columns: this.generateTitlesImp(),
            data: this.generateColumnsImp()
        }];
    }
     
    render() {
        return (
            <div>
                <ExcelFile filename={'Inventario Correo'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={this.generateData()} name="Inventario Correo" />
                </ExcelFile>
            </div>
        );
    }
}