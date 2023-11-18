import {db} from '../../../firebase/Firebase';
import {
    collection,
    getDocs,
    addDoc,
} from 'firebase/firestore';

const backupColletionRef = (collection(db, "Backups"));

class BackupDataServicie {
    getAllBackups = async() => {
        return getDocs(backupColletionRef);
    }

    addBackup = (newBackup) => {
        return addDoc(backupColletionRef, newBackup);
    };
}

const classBackup = new BackupDataServicie();
export default classBackup;