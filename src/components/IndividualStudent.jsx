import { useParams } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom"
import {getStudentById, deleteStudent, amendStudent} from '../api'
import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const IndividualStudent = () => {
    const {student_id} = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const[student, setStudent] = useState({})
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[studentName, setStudentName] = useState('')
    const[studentDob, setStudentDob] = useState('')
    const[studentEmail, setStudentEmail] = useState('')
    const[studentAddress, setStudentAddress] = useState('')

    useEffect(() => {
        getStudentById(student_id)
        .then((returnedData) => {
            setStudent(returnedData.student)
            setIsLoading(false)
        })
       .catch((error) => {
            setErrorMsg(error)
            console.log(errorMsg);
       })
    }, []);

    function handleDelete(){
        deleteStudent(student_id)
        .then(()=>{
            alert("Student successfully deleted")
            navigate("/");
        })
        .catch((error) =>{
            console.log("Error deleteing student: ", error);
            alert("There was a problem deleting the student, please refresh and try again")
        })
    }

    function handleAmend(event){
        event.preventDefault()
        let fullName = ''
        let dob = ''
        let emailAd = ''
        let fullAddress = ''

        if(studentName){
            fullName = studentName
        }
        else{
            fullName = student.name
        }

        if(studentDob){
            dob = studentDob
        }
        else{
            dob = student.dateOfBirth
        }
        if(studentEmail){
            emailAd = studentEmail
        }
        else{
            emailAd = student.email
        }
        if(studentAddress){
            fullAddress = studentAddress
        }
        else{
            fullAddress = student.address
        }
        const studentData = {
            name:fullName,
            dateOfBirth:dob,
            email:emailAd,
            address:fullAddress
        }
        amendStudent(student_id, studentData)
        .then(() =>{
            alert("Student successfully amended")
            navigate(`/`)
        })
        .catch((error) =>{
            console.log("Error amending student: ", error);
            alert("Something went wrong, please refresh and try again")
        })
    }

    
    if(isLoading){
        return <div className="loading">
        <Spinner animation="border" variant="dark" />
        <p>Loading...</p>
        </div>
    }

    if(errorMsg){
        return (
            <p>{errorMsg}</p>
        )
    }

    return(
        <>
        <Link to={`/`}><button className='back-button'>Back</button></Link>
        <Container  className='students-container' fluid>
        <Row>
            <Col key={student.student_id} className='students-individual'>
            <p className='student-info'><strong>Name:</strong> {student.name}</p>
            <p className='student-info'><strong>D.O.B:</strong> {student.dateOfBirth}</p>
            <p className='student-info'><strong>Email:</strong> {student.email}</p>
            <p className='student-info'><strong>Address:</strong> {student.address}</p>
            <Button className='buttons' onClick={handleShow}>Amend</Button> <Button className='buttons' onClick={handleDelete}>Delete</Button>
            </Col>
        </Row>
        </Container>
        <Modal show={show} onHide={handleClose}
        className='modal'>
        <Modal.Header closeButton>
          <Modal.Title>Amending student id {student_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='amend-student-form' onSubmit={handleAmend}>
            <label htmlFor='student-name'>Name:
            <br />
            <input type='text'value={studentName}
            onChange={(event) => setStudentName(event.target.value)} placeholder={student.name}>
            </input>
            </label>
            <br />
            <label htmlFor='student-dob'>Date Of birth:
            <br />
            <input type='text'value={studentDob}
            onChange={(event) => setStudentDob(event.target.value)} placeholder={student.dateOfBirth}>
            </input>
            </label>
            <br />
            <label htmlFor='student-email'>Email:
            <br />
            <input type='text'value={studentEmail}
            onChange={(event) => setStudentEmail(event.target.value)} placeholder={student.email}>
            </input>
            </label>
            <br />
            <label htmlFor='student-name'>Address:
            <br />
            <input type='text'value={studentAddress}
            onChange={(event) => setStudentAddress(event.target.value)} placeholder={student.address}>
            </input>
            </label>
            <br />
            <button type='submit' className='modal-buttons'>Submit</button>
        </form>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='modal-buttons' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
        
    )
}

export default IndividualStudent