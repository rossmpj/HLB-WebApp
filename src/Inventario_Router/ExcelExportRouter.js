import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportRouter extends Component {

    generateTitlesRouter(){
        let titulos = ['BSPI Punto', 'Departamento', 'Empleado', 'Codigo', 'Marca', 'Modelo', 'Numero de Serie',
         'Estado','Nombre', 'Pass', 'Usuario', 'clave', 'IP', 'Puerta Enlace', 'Fecha de Registro', 'Descripcion'] 
        return FuncionesAuxiliares.generateTitlesExcel(titulos,'FFC000');
    }

    generateColumnsRouter(){
        let rows = []
        this.props.data.forEach(element => {
            let row = [
                { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
                { 'value': FuncionesAuxiliares.validarCampo(element.departamento, 'No Asignado')  },
                { 'value': FuncionesAuxiliares.validarCampo(element.empleado, 'No Asignado')},
                { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.num_serie, '-') },
                { 'value': FuncionesAuxiliares.transform_estado(element.estado) },
                { 'value': FuncionesAuxiliares.validarCampo(element.nombre, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.pass, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.usuario, '-')},
                { 'value': FuncionesAuxiliares.validarCampo(element.clave, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.ip, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.penlace, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.fecha, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-')},
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
                <ExcelFile filename={'Inventario Router'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={this.generateData()} name="Inventario Router" />
                </ExcelFile>
            </div>
        );
    }
}