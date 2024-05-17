import {getStudents} from '../api.js'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Students = () => {

    const [isLoading, setIsLoading] = useState(true)
    const[students, setStudents] = useState([])
    const [errorMsg, setErrorMsg] = useState(null)

    useEffect(() => {
        getStudents()
        .then((returnedData) => {
            setStudents(returnedData)
            console.log("Students data: ",students);
            setIsLoading(false)
        })
       .catch((error) => {
            setErrorMsg(error)
            console.log(errorMsg);
       })
    }, []);

    
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
        <Container fluid className="student-page">
        <Container fluid className="add-container">
        <Link to={`/add_student`}><button className='add-student' data-testid="add-button">Add Student</button></Link>

        </Container>
        <Container fluid className='students-container'>
        <Row>
        {students.map((student, index) =>{
            return(
            <Col xs={true} sm={true} md={true} lg={true} key={student.student_id} className='students-individual' data-testid={`student-${index}`}>
            <p className='student-info'>{student.name}</p>
            <Link to={`/${student.student_id}`}><button className='buttons' data-testid={`see-more-${index}`}>See more</button></Link>
            </Col>
            )
        })}
        </Row>
        </Container>
        </Container>
        </>
    )
}

export default Students