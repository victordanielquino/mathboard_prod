import { fbStorageRef} from "../firebase.config2";

// STORAGE: ADD galeria:
const storageAddFile = async (nombre, imgBase64) => {
    try {
        let respuesta = await fbStorageRef.child('imagenes/'+nombre).putString(imgBase64, 'data_url');
        return await respuesta.ref.getDownloadURL();
    } catch (e) {
        console.log(e);
        return null;
    }
}
const getFecha = () => {
    let date = new Date();
    let fecha = date.getDate() + '' + ( (date.getMonth() + 1 < 10) ? '0'+(date.getMonth() + 1): date.getMonth() + 1) + '' + date.getFullYear();
    let hora = date.getHours() + '' + date.getMinutes() + '' + date.getSeconds();
    return fecha+'_'+hora;//dia_mes_ano_hora_min_seg
}
export {
    storageAddFile,
    getFecha
}