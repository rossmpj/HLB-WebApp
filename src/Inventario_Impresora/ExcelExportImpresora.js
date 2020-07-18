import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportImpresora extends Component {

    generateTitlesImp(){
        let titulos = ['BSPI Punto', 'Departamento', 'Asignado', 'Codigo', 'Marca', 'Modelo', 'Numero de Serie',
         'Estado','Tipo', 'IP', 'Tinta', 'Cartucho', 'Toner', 'Rodillo', 'Cinta', 'Rollo/Brazalete', 'Descripcion'] 
        return FuncionesAuxiliares.generateTitlesExcel(titulos,'FFC000');
    }

    generateColumnsImp(){
        let rows = []
        this.props.data.forEach(element => {
            let row = [
                { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
                { 'value': FuncionesAuxiliares.validarCampo(element.dpto, 'No Asignado')  },
                { 'value': FuncionesAuxiliares.validarCampo(element.asignado, 'No Asignado')},
                { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.numero_serie, '-') },
                { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
                { 'value': FuncionesAuxiliares.validarCampo(element.tipo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.ip, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.tinta, '-')},
                { 'value': FuncionesAuxiliares.validarCampo(element.cartucho, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.toner, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.rodillo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.cinta, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.rollo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-')},
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
                <ExcelFile filename={'Inventario Inpresoras'} element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={this.generateData()} name="Inventario Impresoras" />
                </ExcelFile>
            </div>
        );
    }
}