import {db} from '../../../firebase/Firebase';
import {
    collection,
    getDocs,
    updateDoc,
    doc,
} from 'firebase/firestore';

const userColletionRef = (collection(db, "permisos"));

class AdminDataServicie {
    updateTypeUser = async(id, field, value) => {
        const usuarioRef = doc(db, "permisos", id);
        try {
            await updateDoc(usuarioRef, {
                [field]: value,
            });
        } catch (error) {
            console.error(error);
        }
    };

    getAllTypeUser = async() => {
        return getDocs(userColletionRef);
    }
}

const classAdmin = new AdminDataServicie();
export default classAdmin;