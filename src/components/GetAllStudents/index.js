import {useState, useEffect}from 'react'

import { Link } from 'react-router-dom'; 

import db from '../../firebase'

import {ref,get,remove,child} from 'firebase/database'

import Header from '../Header';

import './index.css'
import Footer from '../Footer';



const GetAllStudents = () => {
   let [studentsData,setStudentsData] = useState([]);

   let [loader,setLoader] = useState({isLoading:true})

   useEffect(() => {
    getAllStudents()
   },[])

   const getAllStudents = async () => {
    const dbRef = ref(db);
    await get(child(dbRef, 'students')).then((snapshot) => {
      let studentsArr = []
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        let students = snapshot.val()
        
        Object.keys(students).map(eachItem => studentsArr.push(students[eachItem]))
         
        setStudentsData(studentsArr)
        setLoader({isLoading:null})
        //console.log(studentsArr)

      } else {
        setLoader({isLoading:false})
        setStudentsData(studentsArr)
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
        }
 
    const deleteStudent = async (id) => {
        await remove(ref(db, 'students/' + id))
          .then(() => alert("Deleted Successfully"))
          .catch(err => alert(err))
           getAllStudents()
            }
   

    
    return (
     <>
    <Header onGetAll={getAllStudents} />
    {/* {console.log(branchList)} */}
    

    <div className='app-bg-container'>

    {studentsData.length !== 0 && <table className='table-view'>
    <thead>
    <tr>
    <th>Student Id</th>
    <th>Student Name</th>
    <th>Branch</th>
    <th>Class</th>
    <th>Manage Options</th>
    </tr>
    </thead>
    <tbody>
    {
    studentsData.map((student) => {
    return (
    <tr key={student.StudentId}>
    <td ><div className='table-name'>{student.StudentId}</div></td>
    <td ><div className='table-name'>{student.StudentName}</div></td>
    <td ><div className='table-name'>{student.Branch}</div></td>
    <td ><div className='table-name'>{student.Class}</div></td>
    <td className='button-styles'>
    <Link to={`/update-student/${student.StudentId}`} style={{"textDecoration":'none'}}><button className='edit-btn'>Edit</button></Link>
    <button onClick={()=>deleteStudent(student.StudentId)} className="edit-btn del-btn">Delete</button>
    </td>
    </tr>
    )
    })
    }
    </tbody>
    </table> }

    {loader.isLoading === true && <h1>Loading......</h1>}

    {loader.isLoading === false && <h1>No Students are there!</h1>}

    <Footer />
    </div>
    </>
    );
}



export default GetAllStudents