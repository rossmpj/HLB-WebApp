import { message } from 'antd';
import AxiosAuth from './Servicios/AxiosAuth';

export default class FuncionesAuxiliares {

    static stringSorter = (a, b) => {
        let y = a || '';
        let u = b || '';
        return y.localeCompare(u);
    }

    static filtrar_array(arr, value) {
        if (arr !== null) {
            return arr.indexOf(value) === 0;
        }
    }

    static ipValidator = (penlace) => {
        try {
            // eslint-disable-next-line
            if (penlace.match('^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$')) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    static  passwordValidator = (password) => {
        try {
            if(password.match('^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{5,10}$')){                
                return true;
            } else {
                return false;
            }
        } catch (err) { 
            return false;
        }
    }

    static IDValidator = (value) => {
        let regexp = new RegExp('^[0-9]{10}$');   
        return regexp.test(value);
    }


    // FUNCIONES PARA EXPORTACION DE EXCEL

    static transform_estado(estado, replace = '-') {
        if (estado === 'D') return 'Disponible';
        if (estado === 'O') return 'Operativo';
        if (estado === 'ER') return 'En revisión';
        if (estado === 'R') return 'Reparado';
        if (estado === 'B') return 'De baja';
        return replace;
    }

    static UpperCase(str, replace = '-') {
        return FuncionesAuxiliares.validarCampo(str, replace).replace('_', ' ').toUpperCase();
    }

    static validarCampo(campo, replace) {
        return campo === undefined || campo === '' || campo === null ? replace : campo;
    }

    static generateGeneralData(element) {
        return [
            { 'value': FuncionesAuxiliares.validarCampo(element.bspi, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.departamento, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.empleado, 'No Asignado') },
            { 'value': FuncionesAuxiliares.validarCampo(element.codigo, '-') },
            { 'value': FuncionesAuxiliares.UpperCase(element.tipo_equipo) },
            { 'value': FuncionesAuxiliares.validarCampo(element.marca, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.modelo, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.num_serie, '-') },
            { 'value': FuncionesAuxiliares.transform_estado(element.estado) },
            { 'value': FuncionesAuxiliares.validarCampo(element.name_pc, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.user_pc, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.so, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.so_type, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.servpack, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.licencia, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.dirIP, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.ram_soportada, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.slots_ram, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

        ]
    }

    static generateDataProcesador(element) {
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
            { 'value': FuncionesAuxiliares.validarCampo(element.frecuencia, '-') + " GHz" },
            { 'value': FuncionesAuxiliares.validarCampo(element.nucleos, '-') },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': '-' },
            { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
            { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

        ]
    }



    static generateDataRAM_DISK(array) {
        let rows = []
        array.forEach(element => {
            let row = [
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
                { 'value': '-' },
                { 'value': '-' },
                { 'value': '-' },
                { 'value': FuncionesAuxiliares.validarCampo(element.capacidad, '-') },
                { 'value': element.tipo_equipo === 'memoria_ram' ? FuncionesAuxiliares.validarCampo(element.tipo, '-') : '-' },
                { 'value': element.tipo_equipo === 'disco_duro' ? FuncionesAuxiliares.validarCampo(element.tipo, '-') : '-' },
                { 'value': FuncionesAuxiliares.validarCampo(element.fecha_registro, '-') },
                { 'value': FuncionesAuxiliares.validarCampo(element.descripcion, '-') },

            ]
            rows.push(row);
        });
        return rows;
    }

    static generateTitlesDL() {
        let names = ["BSPI Punto", "Departamento", "Empleado", "Codigo", 'Equipo',
            "Marca", "Modelo", "S/N", "Estado", "Nombre PC", "Usuario PC", "Sistema Operativo",
            "Tipo S.O.", "Service Pack 1", "Licencia", 'IP', 'Frecuencia (GHz)', 'Nucleos', 'RAM Soportada',
            'Slots para RAM', 'Conexiones para Discos', 'Capacidad', 'Tipo RAM', 'Tipo Disco', 'Fecha Registro', 'Descripcion'];
        return FuncionesAuxiliares.generateTitlesExcel(names, "9BBB59");
    }

    static generateTitlesExcel(names, color) {
        let arrayColumnName = [];
        names.forEach(element => {
            let titulo = {
                title: element, width: { wch: 30 },
                style: {
                    font: { sz: "16", bold: true },
                    fill: { patternType: "solid", fgColor: { rgb: color } }
                }
            }
            arrayColumnName.push(titulo);
        });
        return arrayColumnName;
    }


    // FUNCIONES PARA TRANSFORMAR DATA DEL BACK
    static transform_data_desktop(arraydesktop) {
        let datos = [];
        arraydesktop.forEach(function (r) {
            let registro = r.original
            var dip = registro.general.ip === null ? ' ' : registro.general.ip.toString();
            let router = {
                key: registro.general.id_equipo,
                id_equipo: registro.general.id_equipo,
                codigo: registro.general.codigo,
                fecha_registro: registro.general.fecha_registro,
                tipo_equipo: registro.general.tipo_equipo,
                dirIP: dip === undefined ? '' : registro.general.direccion_ip,
                bspi: registro.general.bspi === undefined ? '' : registro.general.bspi,
                departamento: registro.general.departamento === undefined ? '' : registro.general.departamento,
                empleado: registro.general.empleado === undefined ? '' : registro.general.empleado + ' ' + registro.general.apellido,
                marca: registro.general.marca === undefined ? '' : registro.general.marca,
                modelo: registro.general.modelo === undefined ? '' : registro.general.modelo,
                num_serie: registro.general.numero_serie === undefined ? '' : registro.general.numero_serie,
                estado: registro.general.estado_operativo === undefined ? '' : registro.general.estado_operativo,
                ip: dip === undefined ? '' : dip,
                so: registro.so.so === undefined ? '' : registro.so.so,
                servpack: registro.so.service_pack === '0' ? 'No' : 'Si',
                so_type: registro.so.tipo_so === undefined ? '' : registro.so.tipo_so,
                name_pc: registro.so.nombre_pc === undefined ? '' : registro.so.nombre_pc,
                user_pc: registro.so.usuario_pc === undefined ? '' : registro.so.usuario_pc,
                licencia: registro.so.licencia === '0' ? 'No' : 'Si',
                office: registro.programas === undefined ? [] : registro.programas,
                tarj_red: registro.tarjeta_red === undefined ? '' : registro.tarjeta_red,
                monitor: registro.monitor === undefined ? '' : registro.monitor,
                teclado: registro.teclado === undefined ? '' : registro.teclado,
                parlantes: registro.parlantes === undefined ? '' : registro.parlantes,
                mouse: registro.mouse === undefined ? '' : registro.mouse,
                mainboard: registro.tarjeta_madre === undefined ? '' : registro.tarjeta_madre,
                case: registro.case === undefined ? '' : registro.case,
                f_poder: registro.fuente_poder === undefined ? '' : registro.fuente_poder,
                f_alim: registro.f_alim === undefined ? [] : registro.f_alim,
                descripcion: registro.general.descripcion,
                procesador: registro.procesador === undefined ? '' : registro.procesador,
                rams: registro.rams === undefined ? [] : registro.rams,
                discos: registro.discos === undefined ? [] : registro.discos,
            }
            datos.push(router);
        });
        return datos;
    }

    static transform_data_laptop(arraylaptop) {
        let datos = [];
        arraylaptop.forEach(function (r) {
            let registro = r.original
            var dip = registro.general.ip === null ? undefined : registro.general.ip.toString();

            let router = {
                key: registro.general.id_equipo,
                id_equipo: registro.general.id_equipo,
                fecha_registro: registro.general.fecha_registro,
                tipo_equipo: registro.general.tipo_equipo,
                codigo: registro.general.codigo,
                bspi: registro.general.bspi === undefined ? '' : registro.general.bspi,
                departamento: registro.general.departamento === undefined ? '' : registro.general.departamento,
                empleado: registro.general.empleado === undefined ? '' : registro.general.empleado + ' ' + registro.general.apellido,
                marca: registro.general.marca === undefined ? '' : registro.general.marca,
                modelo: registro.general.modelo === undefined ? '' : registro.general.modelo,
                num_serie: registro.general.numero_serie === undefined ? '' : registro.general.numero_serie,
                estado: registro.general.estado_operativo === undefined ? '' : registro.general.estado_operativo,
                ip: dip === undefined ? '' : dip,
                dirIP: dip === undefined ? '' : registro.general.direccion_ip,
                so: registro.so.so === undefined ? '' : registro.so.so,
                servpack: registro.so.service_pack === '0' ? 'No' : 'Si',
                so_type: registro.so.tipo_so === undefined ? '' : registro.so.tipo_so,
                name_pc: registro.so.nombre_pc === undefined ? '' : registro.so.nombre_pc,
                user_pc: registro.so.usuario_pc === undefined ? '' : registro.so.usuario_pc,
                licencia: registro.so.licencia === '0' ? 'No' : 'Si',
                office: registro.programas === undefined ? '' : registro.programas,
                ram_soportada: registro.ram_soportada === undefined ? '' : registro.ram_soportada,
                slots_ram: registro.numero_slots === undefined ? '' : registro.numero_slots,
                descripcion: registro.general.descripcion === undefined ? '' : registro.general.descripcion,
                id_procesador: registro.procesador === undefined ? '' : registro.procesador,
                rams: registro.rams === undefined ? '' : registro.rams,
                discos: registro.discos === undefined ? '' : registro.discos,
            }
            datos.push(router);
        });
        return datos;
    }

    static transform_data_impresora(arrayimpresora) {
        let datos = [];
        arrayimpresora.forEach(function (dato) {
            let empleado = ""
            if (dato.empleado !== null) {
                empleado = dato.empleado.concat(" ", dato.apellido);
            }
            let impresoras = {
                key: dato.id_impresora,
                numero_serie: dato.numero_serie,
                bspi: dato.bspi_punto,
                asignado: empleado,
                dpto: dato.departamento,
                tipo: dato.tipo,
                marca: dato.marca,
                codigo: dato.codigo,
                estado_operativo: dato.estado_operativo,
                modelo: dato.modelo,
                tinta: dato.tinta,
                cartucho: dato.cartucho,
                descripcion: dato.descripcion,
                toner: dato.toner,
                rodillo: dato.rodillo,
                cinta: dato.cinta,
                rollo: dato.rollo,
                ip: dato.direccion_ip,
                componente_principal: dato.componente_principal,
                id_equipo: dato.id_equipo,
                fecha: dato.fecha_registro
            }
            datos.push(impresoras)
        });
        return datos;
    }

    static transform_data_router(arrayrouter) {
        let datos = [];
        arrayrouter.forEach(function (registro) {
            var dip = registro.ip === null ? ' ' : registro.ip;
            var dirip = registro.direccion_ip === null ? ' ' : registro.direccion_ip;
            let router = {
                key: registro.id_equipo,
                id_equipo: registro.id_equipo,
                codigo: registro.codigo,
                bspi: registro.bspi_punto === null ? '' : registro.bspi_punto,
                departamento: registro.departamento === null ? '' : registro.departamento,
                nombre: registro.nombre,
                pass: registro.pass,
                penlace: registro.puerta_enlace,
                usuario: registro.usuario,
                clave: registro.clave,
                marca: registro.marca,
                modelo: registro.modelo,
                num_serie: registro.numero_serie,
                estado: registro.estado_operativo,
                ip: dip,
                dirip: dirip,
                empleado: registro.nempleado === null ? '' : registro.nempleado + ' ' + registro.apellido,
                descripcion: registro.descripcion,
                fecha: registro.fecha_registro
            }
            datos.push(router);
        });
        return datos;
    }

    static transform_data_otros(arraysotros) {
        let datos = [];
        arraysotros.forEach(function (dato) {
            let empleado = "";
            if (dato.empleado !== null) {
                empleado = dato.empleado.concat(" ", dato.apellido);
            }
            let equipos = {
                key: dato.id_equipo,
                id_equipo: dato.id_equipo,
                estado_operativo: dato.estado_operativo,
                codigo: dato.codigo,
                tipo_equipo: FuncionesAuxiliares.UpperCase(dato.tipo_equipo, ''),
                marca: dato.marca,
                modelo: dato.modelo,
                descripcion: dato.descripcion,
                numero_serie: dato.numero_serie,
                encargado_registro: dato.encargado,
                componente_principal: dato.principal,
                asignado: empleado,
                fecha_registro: dato.fecha_registro,
                ip: dato.direccion_ip,
                bspi: dato.bspi_punto,
                departamento: dato.departamento,
                capacidad: dato.capacidad,
                tipo: dato.tipo,
                numero_slots: dato.numero_slots,
                ram_soportada: dato.ram_soportada,
                conexiones_dd: dato.conexiones_dd,
                frecuencia: dato.frecuencia,
                nucleos: dato.nucleos
            }
            datos.push(equipos)
        });
        return datos;
    }

    static updateUser(values, key, hist, route) {
        AxiosAuth.editar_user_web(values).then(res => {
            message.loading({ content: 'Guardando datos...', key });
            setTimeout(() => {
                message.success({ content: 'Usuario actualizado satisfactoriamente', key, duration: 3 });
            }, 1000);
            hist.push(route);
        }).catch(error => {
            if (error.response) {
                if (error.response.status === 400) {
                    message.error(error.response.data.log, 4)
                        .then(() => message.error('No fue posible registrar los datos', 3))
                }
                if (error.response.status === 500) {
                    message.error('Ocurrió un error al procesar los datos, inténtelo más tarde', 4);
                }
                console.log(error.response)

            } else {
                message.error('Ocurrió un error al procesar su solicitud, inténtelo más tarde', 4)
            }
        });
    }


}