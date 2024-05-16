import axios from "axios"

const api = axios.create({baseURL: 'https://wilsoncollegebackend.onrender.com'})


export const getStudents = () =>{
    return api.get()
    .then((response) =>{
        return response.data.students;
    })
    .catch((error) =>{
        console.log("Error fetching students: ", error);
        return error
    })
}

export const getStudentById = (studentId) =>{
    return api.get(`/${studentId}`)
    .then((response) =>{
        return response.data;
    })
    .catch((error) =>{
        console.log("Error fetching student: ", error);
        return error
    })
}

export const deleteStudent = (studentId) =>{
    return api.delete(`/${studentId}`)
    .then(() =>{
    })
    .catch((error) =>{
        console.log("Error deleting student: ", error);
        return error
    })
}

export const amendStudent = (studentId, updateData) =>{
    return api.delete(`/${studentId}`,updateData)
    .then((response) =>{
        console.log(response.body.msg);
    })
    .catch((error) =>{
        console.log("Error deleting student: ", error);
        return error
    })
}

export const addStudent = (newStudent) =>{
    return api.post(`/}`,newStudent)
    .then((response) =>{
        console.log(response.body.msg);
    })
    .catch((error) =>{
        console.log("Error adding student: ", error);
        return error
    })
}

