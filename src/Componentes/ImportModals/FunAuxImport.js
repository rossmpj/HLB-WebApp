import * as XLSX from 'xlsx';

export default class FunAuxImport {

    static dataFormatEquipos() {
        let titlesnames = ['Empleado', 'Codigo', 'Marca', 'Modelo', 'N/S',
            'Estado', 'Tipo', 'IP', 'Capacidad Almacenamiento', 'Tipo Almacenamiento', 'Numero de Slots RAM', 'RAM Soportada',
            'Conexiones para Discos', 'Nucleos', 'Frecuencia', 'Componente Principal', 'Descripcion']
        let values = [["0825730575", "HLB_CAS_012", "Asus", "802ew.11ac", "246-FDX", "Operativo", "DISCO DURO", "", "1 TB", "SSD", '', '', '', '', '', "HLB_DSK_003", "etiquetar"],
        ["", "HLB_TMA_011", "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "TARJETA MADRE", "", "", "", '5', '12 GB', '2', '', '', "HLB_DSK_002", "etiquetar22"]];
        
        // let titlesDesc = ['Descripcion Columnas']
        // let valuesDesc =[['Asignado: Cedula del empleado al cual se asignara el equipo'],['Codigo']];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatCorreos(){
        let titlesnames =['Empleado', 'Correo', 'Pass'];
        let values = [['0825730544','example@hospitalleonbecerra.org','passwordexample'],['0829930544','example2@hospitalleonbecerra.org','password2example']]; 
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatIPs(){
        let titlesnames = ['IP', 'Hostname', 'Subred', 'Fortigate', 'Maquinas Adicionales', 'Observacion']
        let values = [['192.168.0.1', 'Asistente_finan', '192.168.0.0','ADMINISTRACION_KATHIUSKA_QUINDE', 3, 'Ninguna'],['192.168.0.2', 'BSPI_1-PC', '192.168.0.0','UCI_ROUTER_UCI', 4, 'Revisar']]
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatRouters(){
        let titlesnames =['Empleado', 'Codigo', 'Marca', 'Modelo', 'N/S', 'Estado','Nombre', 'Pass', 'Usuario', 'Clave', 'IP', 'Puerta Enlace', 'Descripcion'];
        let values = [['0945683123', 'HLB_ROU_011','LG', '1fersd45', '112wderft566', 'Operativo','Lab', '1wes345', 'administrador', '1weJl45' ,'192.168.0.9','192.168.9.1', 'Ninguna'],
        ['0933683123', 'HLB_ROU_013','LG', '1rrrtd45', '112cverfvg66', 'Operativo','Lab3', '1wes345', 'sistemas', '1jkD345' ,'192.168.1.9','192.168.1.0', 'Revisar']];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatImpresoras(){
       
        let titlesnames = [ 'Empleado', 'Codigo', 'Marca', 'Modelo', 'N/S',
        'Estado','Tipo', 'IP', 'Componente Principal', 'Tinta', 'Cartucho', 'Toner', 'Rodillo', 'Cinta', 'Rollo/Brazalete' , 'Descripcion'];
        let values = [['0945683123', 'HLB_ROU_011','LG', '1fersd45', '112wderft566', 'Operativo','Multifuncional','192.168.0.9', 'HLB_DSK_003', 'Negra', '' , '','','', '', 'Ninguna'],
        ['0933683123', 'HLB_ROU_013','LG', '1rrrtd45', '112cverfvg66', 'Operativo','Matricial', '', 'HLB_DSK_002', '' ,'Cartucho Nuevo','', '','Cinta', '', 'Revisar']];
        return FunAuxImport.generateData(titlesnames, values);
    }


    static generateData(titlesnames, values) {
        let titles = [];
        let valuesArr = [];
        titlesnames.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 }
            }
            titles.push(titulo);
        });
        values.forEach(vals => {
            let arr = [];
            vals.forEach(val => {
                let value = {
                    value: val
                }
                arr.push(value);
            });
            valuesArr.push(arr);
        })
        let resp = [
            {
                columns: titles,
                data: valuesArr
            }
        ];

        return resp;
    }

    static ExcelToJson = (inputFile, encargado_registro=null) => {
        const temporaryFileReader = new FileReader();

        return new Promise((resolve, reject) => {

            temporaryFileReader.onerror = () => {
                temporaryFileReader.abort();
                reject(new DOMException("El archivo no puede ser procesado!"));
            };

            temporaryFileReader.onloadend = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array', sheetRows: 50 });
                const wsname = workbook.SheetNames[0];
                const ws = workbook.Sheets[wsname];
                let XL_row_object = XLSX.utils.sheet_to_row_object_array(ws, { defval: '' });
                XL_row_object.forEach(elem => {
                    if (elem['Empleado'] !== null && elem['Empleado'] !== undefined ){
                        elem['Empleado'] = String(elem['Empleado']).length === 9 ? String('0'+elem['Empleado']) : String(elem['Empleado']);
                    }
                    elem['rowNum'] = elem.__rowNum__ + 1;
                })
                let hojas = {
                    data: XL_row_object,
                    sheetName: wsname,
                    fileName: inputFile.name,
                    encargado_registro
                }
                resolve(hojas);
            };
            temporaryFileReader.readAsArrayBuffer(inputFile);
        });
    };
}