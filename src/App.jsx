import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Students from './components/Students'
import IndividualStudent from './components/IndividualStudent'
import AddStudent from './components/AddStudent'

function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path='/' element={<Students />} />
      <Route path='/:student_id' element={<IndividualStudent />} />
      <Route path='/add_student' element={<AddStudent />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
