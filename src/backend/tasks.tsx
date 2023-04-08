import app from '../config';
import { where, getDoc, doc, getFirestore, getDocs, collection, query, orderBy, limit, updateDoc } from 'firebase/firestore';

const db = getFirestore(app);
const tasksRef = collection(db, 'tasks');

export interface Task {
    description: string;
    dueDate: string;
    done: string;
    uid: string;
}
export const fetchTasks = async () => {
    const latestTasksQuery = query(tasksRef, where('done','==',false), orderBy('due_date', 'desc'),);

    return await getDocs(latestTasksQuery).then((response) => {
        const fetchedData = response.docs.map((document) => {
            const data = document.data();
            const task: Task = {
                'description': data.description,
                'done': data.done,
                'dueDate': data.due_date.toDate().toLocaleString('en-US', { timeZone: 'UTC' }),
                'uid': document.id
            }
            return task
        });
        return fetchedData;
    });

}


export const markDone = async (uid: string) => {
    // Assume we have the UID and the tasks collection reference

    // Define the updated data
    const updatedData = {
        done: true
    };

    const task = doc(tasksRef, uid);

    getDoc(task).then((data) => {
        console.log(data.data());
    });

    updateDoc(task, updatedData).then((response)=> {
        console.log(response);
    }).catch((error)=> {
        console.log(error);
    })
}