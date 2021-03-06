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

    static dataFormatCorreos() {
        let titlesnames = ['Empleado', 'Correo', 'Pass'];
        let values = [['0825730544', 'example@hospitalleonbecerra.org', 'passwordexample'], ['0829930544', 'example2@hospitalleonbecerra.org', 'password2example']];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatIPs() {
        let titlesnames = ['IP', 'Hostname', 'Subred', 'Fortigate', 'Maquinas Adicionales', 'Observacion']
        let values = [['192.168.0.1', 'Asistente_finan', '192.168.0.0', 'ADMINISTRACION_KATHIUSKA_QUINDE', 3, 'Ninguna'], ['192.168.0.2', 'BSPI_1-PC', '192.168.0.0', 'UCI_ROUTER_UCI', 4, 'Revisar']]
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatRouters() {
        let titlesnames = ['Empleado', 'Codigo', 'Marca', 'Modelo', 'N/S', 'Estado', 'Nombre', 'Pass', 'Usuario', 'Clave', 'IP', 'Puerta Enlace', 'Descripcion'];
        let values = [['0945683123', 'HLB_ROU_011', 'LG', '1fersd45', '112wderft566', 'Operativo', 'Lab', '1wes345', 'administrador', '1weJl45', '192.168.0.9', '192.168.9.1', 'Ninguna'],
        ['0933683123', 'HLB_ROU_013', 'LG', '1rrrtd45', '112cverfvg66', 'Operativo', 'Lab3', '1wes345', 'sistemas', '1jkD345', '192.168.1.9', '192.168.1.0', 'Revisar']];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatImpresoras() {
        let titlesnames = ['Empleado', 'Codigo', 'Marca', 'Modelo', 'N/S',
            'Estado', 'Tipo', 'IP', 'Componente Principal', 'Tinta', 'Cartucho', 'Toner', 'Rodillo', 'Cinta', 'Rollo/Brazalete', 'Descripcion'];
        let values = [['0945683123', 'HLB_ROU_011', 'LG', '1fersd45', '112wderft566', 'Operativo', 'Multifuncional', '192.168.0.9', 'HLB_DSK_003', 'Negra', '', '', '', '', '', 'Ninguna'],
        ['0933683123', 'HLB_ROU_013', 'LG', '1rrrtd45', '112cverfvg66', 'Operativo', 'Matricial', '', 'HLB_DSK_002', '', 'Cartucho Nuevo', '', '', 'Cinta', '', 'Revisar']];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatLaptops() {
        let titlesnames = ['Empleado', 'Codigo', 'Tipo', 'Principal', 'Marca', 'Modelo', 'N/S',
            'Estado', "NombrePC", "UsuarioPC", "SO",
            "TipoSO", "ServicePack1", "Licencia", 'IP', 'Frecuencia', 'Nucleos', 'Tipo RAM Soportada', 'RAM Soportada',
            'Slots RAM', 'Capacidad Almacenamiento', 'Tipo Almacenamiento', 'Descripcion'];
        let values = [
            ["0825730575", "HLB_LAP_012", 'Laptop', '', "Asus", "802ew.11ac", "246-FDX", "Operativo", "PC_PRUEBA", "PC_EJEMPLO", "Windows 10 Home Single Language", "64 Bits", '1', '0', '', '', '', "DDR4", '12 GB', '4', '', '', "etiquetar"],
            ["", "HLB_CAS_02", "DISCO DURO", 'HLB_LAP_012', "Asus", "802rgbr.11ac", "2owr-FDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "1 TB", "HDD", "etiquetar"],
            ["", "HLB_PCD_011", "Procesador", 'HLB_LAP_012', "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "", "", "", '', '', '', '', '3.0', '4', "", '', '', '', '', "etiquetar22"],
            ["", "HLB_RM_011", "memoria ram", 'HLB_LAP_012', "Ricoh", "ii2ew.222ac", "gg66-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '16 gb', 'DDR4', "etiquer22"],
            ["0825110575", "HLB_LAP_044", 'Laptop', '', "Asus", "80ethw.11ac", "2ee-FDX", "Operativo", "PC_PRUEBA2", "PC_EJEMPLO2", "Windows 10 Home", "64 Bits", '0', '0', '', '', '', "DDR3", '8 GB', '4', '', '', "etiquetar"],
            ["", "HLB_CAS_02", "DISCO DURO", 'HLB_LAP_044', "Asus", "8FFFr.11ac", "2oGGGFDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "500 GB", "HDD", "etiquetar"],
            ["", "HLB_PCD_991", "Procesador", 'HLB_LAP_044', "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "", "", "", '', '', '', '', '3.0', '4', "", '', '', '', '', "etiquetar22"],
            ["", "HLB_RM_331", "memoria ram", 'HLB_LAP_044', "Ricoh", "ii2ew.2ggc", "gg66vvDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '8 gb', 'DDR3', "etiquer22"]
        ];
        return FunAuxImport.generateData(titlesnames, values);
    }

    static dataFormatDesktops() {
        let titlesnames = ['Empleado', 'Codigo', 'Tipo', 'Principal', 'Marca', 'Modelo', 'N/S',
            'Estado', "NombrePC", "UsuarioPC", "SO",
            "TipoSO", "ServicePack1", "Licencia", 'IP', 'Frecuencia', 'Nucleos', 'Tipo RAM Soportada', 'RAM Soportada',
            'Slots RAM', 'Capacidad Almacenamiento', 'Tipo Almacenamiento', 'Conexiones Discos', 'Descripcion'];
        let values = [
            ["0825730575", "HLB_LAP_012", 'Desktop', '', "Asus", "802ew.11ac", "246-FDX", "Operativo", "PC_PRUEBA", "PC_EJEMPLO", "Windows 10 Home Single Language", "64 Bits", '1', '0', '', '', '', "", '', '', '', '', '', "etiquetar"],
            ["", "HLB_CAS_02", "DISCO DURO", 'HLB_LAP_012', "Asus", "802rgbr.11ac", "2owr-FDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "1 TB", "HDD", '', "etiquetar"],
            ["", "HLB_PCD_011", "Procesador", 'HLB_LAP_012', "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "", "", "", '', '', '', '', '3.0', '4', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_RM_011", "memoria ram", 'HLB_LAP_012', "Ricoh", "ii2ew.222ac", "gg66-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '16 gb', 'DDR4', '', "etiquer22"],
            ["", "HLB_TC_02", "Teclado", 'HLB_LAP_012', "Asus", "8ssencbr.11ac", "GCEjwr-FDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "", "", '', "etiquetar"],
            ["", "HLB_Mou_011", "Mouse", 'HLB_LAP_012', "Ricoh", "bcye2ew.222ac", "XEN53C-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_PRL_011", "Parlantes", 'HLB_LAP_012', "Ricoh", "ii2ew.222ac", "gllaa6-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_MJ_8371", "Monitor", 'HLB_LAP_012', "Ricoh", "bcjeok.222ac", "ifnxkPM-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_PNC_321", "Tarjeta de red", 'HLB_LAP_012', "Ricoh", "bcUgar4.222ac", "gllaa6-BG5gE", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_CS_101", "Case", 'HLB_LAP_012', "Ricoh", "bcye2ew.222ac", "XEN53C-bdgT", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_PRL_011", "Fuente de poder", 'HLB_LAP_012', "Ricoh", "ii2ew.222ac", "gllaa6-NCF4", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_CS_101", "UPS", 'HLB_LAP_012', "Ricoh", "ncje54.222ac", "XEN53C-bdgT", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_PRL_011", "Tarjeta Madre", 'HLB_LAP_012', "Ricoh", "ii2ew.csxd3", "gllaa6-NCas2", "Operativo", "", "", "", '', '', '', '', '', '', "DDR3", '12 GB', '3', '', '', '4', "etiquer22"],
            ["0825110575", "HLB_LAP_044", 'Laptop', '', "Asus", "80ethw.11ac", "2ee-FDX", "Operativo", "PC_PRUEBA2", "PC_EJEMPLO2", "Windows 10 Home", "64 Bits", '0', '0', '', '', '', "", '', '', '', '', '', "etiquetar"],
            ["", "HLB_BDYW_02", "DISCO DURO", 'HLB_LAP_044', "Asus", "8FFFr.11ac", "2oGGGFDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "500 GB", "HDD", '', "etiquetar"],
            ["", "HLB_bcgTD_991", "Procesador", 'HLB_LAP_044', "Ricoh", "802ew.222ac", "25466-FDX", "Operativo", "", "", "", '', '', '', '', '3.0', '4', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_NCy_331", "memoria ram", 'HLB_LAP_044', "Ricoh", "ii2ew.2ggc", "gg66vvDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '8 gb', 'DDR3', '', "etiquer22"],
            ["", "HLB_NCU7_02", "Teclado", 'HLB_LAP_044', "Asus", "8ssencbr.11ac", "GCEjwr-FDX", "Operativo", '', "", '', '', '', '', '', '', '', '', '', '', "", "", '', "etiquetar"],
            ["", "HLB_MNN_6382", "Mouse", 'HLB_LAP_044', "Ricoh", "bcye2ew.222ac", "XEN53C-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_NHCY_123", "Parlantes", 'HLB_LAP_044', "Ricoh", "ii2ew.222ac", "gllaa6-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_MJHB_71", "Monitor", 'HLB_LAP_044', "Ricoh", "bcjeok.222ac", "ifnxkPM-FDX", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_NJC_231", "Tarjeta de red", 'HLB_LAP_044', "Ricoh", "bcUgar4.222ac", "gllaa6-BG5gE", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_CBBS_121", "Case", 'HLB_LAP_044', "Ricoh", "bcye2ew.222ac", "XEN53C-bdgT", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_CBL_1231", "Fuente de poder", 'HLB_LAP_044', "Ricoh", "ii2ew.222ac", "gllaa6-NCF4", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquer22"],
            ["", "HLB_CSBC_121", "Regulador", 'HLB_LAP_044', "Ricoh", "ncje54.222ac", "XEN53C-bdgT", "Operativo", "", "", "", '', '', '', '', '', '', "", '', '', '', '', '', "etiquetar22"],
            ["", "HLB_PRX_231", "Tarjeta Madre", 'HLB_LAP_044', "Ricoh", "ii2ew.csxd3", "gllaa6-NCas2", "Operativo", "", "", "", '', '', '', '', '', '', "DDR4", '32 GB', '4', '', '', '3', "etiquer22"],
        ];
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

    static ExcelToJson = (inputFile, encargado_registro = null, equipo_especial = null) => {
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
                    if (elem['Empleado'] !== null && elem['Empleado'] !== undefined) {
                        elem['Empleado'] = String(elem['Empleado']).length === 9 ? String('0' + elem['Empleado']) : String(elem['Empleado']);
                    }
                    if (equipo_especial !== null && equipo_especial !== undefined) {
                        elem['eq_error'] = true;
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

    // static generateRequestLaptop(hoja){
    //     let laptops =  hoja.data.filter(function (element){ return element.tipo.toLowerCase() === 'laptop' });
    //     laptops.forEach(el=>{
    //         let compomentes = hoja.data.filter(function (element){ return element['Principal'].toLowerCase() === el['Codigo'] });
    //         compomentes.forEach(comp => {
    //             el[comp['']]
    //         })

    //     });
    // }
}