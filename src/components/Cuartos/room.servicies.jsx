import {db} from '../../firebase/Firebase';
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from 'firebase/firestore';

const roomColletionRef = (collection(db, "roomsUsers"));
class RoomDataServicie {
    addRooms = (newRoom) => {
        return addDoc(roomColletionRef, newRoom);
    };

    updateRoom = (id, updatedRoom) => {
        const roomDoc = doc(db, "roomsUsers", id);
        return updateDoc(roomDoc, updatedRoom);
    };

    deleteRoom = (id) => {
        const roomDoc = doc(db, "roomsUsers", id);
        return deleteDoc(roomDoc);
    };

    getAllRooms = async(user) => {
        const q = query(roomColletionRef, where("id_arrendador", "==", user));
        return getDocs(q);
    }

    getRoom = (id) => {
        const roomDoc = doc(db, "roomsUsers", id);
        return getDoc(roomDoc);
    }
    getUser = (id) => {
        const userDoc = doc(db, "usuarios", id);
        return getDoc(userDoc);
    }
    addCita = (newCita) => {
        const roomColletionRef = collection(db, "citas");
        return addDoc(roomColletionRef, newCita);
    };
    updateEstado = (id , estado) => {
        const roomDoc = doc(db, "rooms", id);
        const fieldToUpdate = { 'estado': estado };
        return updateDoc(roomDoc, fieldToUpdate);
    };
    updateCita = (id, estado) => {
        const citaDoc = doc(db, 'citas', id);
        const fieldToUpdate = {'estadoCita' : estado};
        return updateDoc(citaDoc, fieldToUpdate);
    }
}

const classRoom = new RoomDataServicie();
export default classRoom;