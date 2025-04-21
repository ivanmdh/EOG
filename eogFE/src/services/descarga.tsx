import apiService from "@services/apiServices"
import { toast } from "react-toastify"

// Exportación de luminarias
const exportLuminariasRequest = (fechaInicio?: string, fechaFin?: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/export/luminarias', 
                { 
                    fecha_inicio: fechaInicio, 
                    fecha_fin: fechaFin 
                }, 
                { responseType: 'blob' }) // Movido responseType a la configuración correcta
            .then((response: any) => {
                resolve(response.data as Blob)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

export const exportLuminarias = (fechaInicio?: string, fechaFin?: string) => {
    return toast.promise(exportLuminariasRequest(fechaInicio, fechaFin), {
        pending: 'Generando reporte de luminarias',
        success: 'Reporte generado correctamente',
        error: 'Error al generar el reporte de luminarias'
    })
}

// Exportación de direcciones
const exportDireccionesRequest = (fechaInicio?: string, fechaFin?: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        apiService
            .post('/api/export/direcciones', 
                { 
                    fecha_inicio: fechaInicio, 
                    fecha_fin: fechaFin 
                }, 
                { responseType: 'blob' }) // Movido responseType a la configuración correcta
            .then((response: any) => {
                resolve(response.data)
            })
            .catch((error: any) => {
                reject(error)
            })
    })
}

export const exportDirecciones = (fechaInicio?: string, fechaFin?: string) => {
    return toast.promise(exportDireccionesRequest(fechaInicio, fechaFin), {
        pending: 'Generando reporte de direcciones',
        success: 'Reporte generado correctamente',
        error: 'Error al generar el reporte de direcciones'
    })
}

// Función auxiliar para descargar el blob
export const downloadBlob = (blob: Blob, fileName: string) => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    
    // Limpieza
    setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }, 100);
};
