import {db} from '../../firebase/Firebase';
import {
    doc,
    getDoc,
    getDocs,
    query,
    where,
    collection
} from 'firebase/firestore';

class RoutesDataServicie {
    getUserType = (id) => {
        const userDoc = doc(db, "usuarios", id);
        return getDoc(userDoc);
    }

    getTypePermission = async(type) => {
        // const typeColletionRef = (collection(db, "permisos"));
        const q = query(collection(db, "permisos"), where("TipoUsuario", "==", type));
        return getDocs(q);
    }
}

const classRoutes = new RoutesDataServicie();
export default classRoutes;