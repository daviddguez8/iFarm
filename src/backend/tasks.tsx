import app from '../config';
import { onSnapshot, addDoc, where, getDoc, doc, getFirestore, getDocs, collection, query, orderBy, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(app);
const tasksRef = collection(db, 'tasks');

export interface Task {
    description: string;
    dueDate: string;
    done: string;
    uid: string;
}
export const fetchTasks = async (setTasks: any) => {
    const latestTasksQuery = query(tasksRef, where('done','==',false), orderBy('due_date', 'desc'),);

    /*
    onSnapshot(latestTasksQuery, (docs)=> {
        const tasks: Task[] = []
        docs.forEach((document) => {

            const data = document.data();
            console.log(data);
            const task: Task = {
                'description': data.description,
                'done': data.done,
                'dueDate': data.due_date.toDate().toLocaleString('en-US', { timeZone: 'UTC' }),
                'uid': document.id
            }
            tasks.concat(task);
            return task;
        });
        console.log(tasks);
        setTasks(tasks);
    });
    */

    const tasks =  await getDocs(latestTasksQuery).then((response) => {
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

    setTasks(tasks);
    return tasks;

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

export const deleteTask = async (uid: string) => {
    const taskToDelete = doc(tasksRef, uid);

    deleteDoc(taskToDelete).then((value) => {
        console.log("Deleted:)");
    }).catch((e) => {
        console.log(e);
    })
}

export const addTask = async (description: string) => {
    console.log(description);

    const newDoc = {
        description: description,
        done: false,
        due_date: new Date('01/01/2025')//TODO: placeholder, implement calendar
    }

    await addDoc(tasksRef, newDoc).then((response)=> {
        console.log(response);
    }).catch((e)=> {
        console.log(e);
    })

}