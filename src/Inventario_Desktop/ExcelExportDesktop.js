import React, { Component } from 'react';
import ReactExport from 'react-data-export';
import '../App.css';
import { Button } from 'antd';
import FuncionesAuxiliares from '../FuncionesAuxiliares'


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export default class ExcelExportDesktop extends Component {

    generateDataMainBoard(element) {
        return [
            { 'value': '' },
            { 'value': '' },
            { 'value': '' },
            { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },

            { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.numero_serie, '-') },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado_operativo) },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.ram_soportada, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.numero_slots, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.conexiones_dd, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },
        ]
    }

    generateDataComponents(data) {
        let letArrayData = [];
        let arrayCommponets = ['monitor', 'case', 'f_alim', 'f_poder', 'teclado', 'mouse', 'parlantes', 'tarj_red']
        arrayCommponets.forEach(element => {

            if (data[element] === undefined || data[element] === null || data[element].length === 0) {
                //  console.log('entro')
                return;
            }

            let row = [
                { 'value': '' },
                { 'value': '' },
                { 'value': '' },
                { 'value': FuncionesAuxiliares.validarCampo(data[element].codigo, '-') },
                { 'value': FuncionesAuxiliares.UpperCase(data[element].tipo_equipo) },

                { 'value': FuncionesAuxiliares.validarCampo(data[element].marca, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(data[element].modelo, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(data[element].numero_serie, '-') },
                { 'value': FuncionesAuxiliares.transform_estado(data[element].estado_operativo) },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': FuncionesAuxiliares.validarCampo(data[element].fecha_registro, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(data[element].descripcion, '-') },

            ]
            letArrayData.push(row);
        });

        return letArrayData;
    }



    generateData() {

        let ArrayData = []
        this.props.data.forEach(element => {
            let rowGeneral = FuncionesAuxiliares.generateGeneralData(element);
            let rowsRAM = FuncionesAuxiliares.generateDataRAM_DISK(element.rams);
            let rowsDISK = FuncionesAuxiliares.generateDataRAM_DISK(element.discos);
            let rowProcesador = FuncionesAuxiliares.generateDataProcesador(element.procesador)
            let rowsComponents = this.generateDataComponents(element);
            let rowsMainBoard = this.generateDataMainBoard(element.mainboard)
            ArrayData.push(rowGeneral);
            ArrayData.push(rowProcesador);
            ArrayData.push(rowsMainBoard);
            rowsComponents.forEach(comp => {
                ArrayData.push(comp)
            });
            rowsRAM.forEach(ram => {
                ArrayData.push(ram)
            });
            rowsDISK.forEach(disk => {
                ArrayData.push(disk)
            });
        });

        //console.log(ArrayData, 'arrays data')

        return [{
            columns: FuncionesAuxiliares.generateTitlesDL(),
            data: ArrayData
        }];

    }

    render() {
        return (
            <div>
                <ExcelFile filename='Inventario Computadores Escritorio' element={<Button disabled={this.props.dis} type="primary" icon="cloud-download">Exportar</Button>}>
                    <ExcelSheet dataSet={this.generateData()} name='Inventario Computadores Escritorio' />
                </ExcelFile>
            </div>
        );
    }


}