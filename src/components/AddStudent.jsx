import { Link, useNavigate } from "react-router-dom"
import {addStudent} from '../api'
import { useState, useEffect } from 'react'

const AddStudent = () => {
    const [errorMsg, setErrorMsg] = useState(null)
    const[studentName, setStudentName] = useState('')
    const[studentDob, setStudentDob] = useState('')
    const[studentEmail, setStudentEmail] = useState('')
    const[studentAddress, setStudentAddress] = useState('')
    const [disabledPostButton, setDisabledPostButton] = useState(false);
    const navigate = useNavigate();

     const handleSubmit = (event) =>{
        setDisabledPostButton(true)
        event.preventDefault()
        const newStudent = 
            {name: studentName,
            email:studentEmail,
            address:studentAddress,
            dateOfBirth:studentDob
                  }
        addStudent(newStudent)
        .then(()=>{
        alert("Student successfully added")
        setDisabledPostButton(false)
        navigate("/");
        })
        .catch((error) =>{
            setErrorMsg(error)
            setDisabledPostButton(false)
            console.log("Error submitting student: ", error)
            alert('Something went wrong please refresh and try again')
        })
     }
       

    if(errorMsg){
        return (
            <p>{errorMsg}</p>
        )
    }

    return(
        <>
        <Link to={`/`}><button className='back-button'>Back</button></Link>
        <h1 className='add-new-student'>Add a new student:</h1>
        <form className='add-student-form' onSubmit={handleSubmit}>
            <label htmlFor='student-name'>Name:
            <br />
            <input type='text'value={studentName}
            onChange={(event) => setStudentName(event.target.value)} placeholder='Joe Bloggs...' required>
            </input>
            </label>
            <br />
            <label htmlFor='student-dob'>Date Of birth:
            <br />
            <input type='text'value={studentDob}
            onChange={(event) => setStudentDob(event.target.value)} placeholder='12/04/2001...' required>
            </input>
            </label>
            <br />
            <label htmlFor='student-email'>Email:
            <br />
            <input type='text'value={studentEmail}
            onChange={(event) => setStudentEmail(event.target.value)} placeholder='name@email.com...' required>
            </input>
            </label>
            <br />
            <label htmlFor='student-name'>Address:
            <br />
            <input type='text'value={studentAddress}
            onChange={(event) => setStudentAddress(event.target.value)} placeholder='123 ABC Street...'required>
            </input>
            </label>
            <br />
            <button disabled={disabledPostButton} type='submit'>Add student</button>
        </form>
        </>
    )
}

export default AddStudent