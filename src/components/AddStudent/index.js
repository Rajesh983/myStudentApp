import { useState ,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import db from '../../firebase'

import {ref,set,get,child} from 'firebase/database'

import './index.css'

const AddStudent = () => {
    const Navigate = useNavigate()

    let [inputStudentData,setInputData] =useState({studentName:'',studentBranch:'',studentClass:''})

    let [branchList,setBranchList] = useState([])


   useEffect(() => {
    getAllStudents()
    gettingBranchList()
   },[])

   const getAllStudents = async () => {
    const dbRef = ref(db);
    await get(child(dbRef, 'students')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
        }

const getStudentName = event => {
setInputData({
    ...inputStudentData,
    studentName:event.target.value
})
}


const gettingBranchList = () => {
  const dbRef = ref(db);
  get(child(dbRef, 'branches')).then((snapshot) => {
    if (snapshot.exists()) {
      //console.log(snapshot.val());
      let branchesArr = [{default:'Select Branch'}]

      snapshot.val().map(eachItem => {
        let updatedBranch = {Branch:eachItem}
        branchesArr.push(updatedBranch)
      })

      setBranchList(branchesArr)
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}



const getStudentBranch = event => {
setInputData({
    ...inputStudentData,
    studentBranch:event.target.value
})
}


const getStudentClass = event => {
setInputData({
    ...inputStudentData,
    studentClass:event.target.value
})
}


const onSubmittingForm = async event => {
event.preventDefault()
console.log(inputStudentData)
if(inputStudentData.studentName !== '' && inputStudentData.studentBranch !== '' && inputStudentData.studentClass !== ''){
     let userJson = {
        StudentId:new Date().getTime().toString(),
        StudentName:inputStudentData.studentName,
        Branch:inputStudentData.studentBranch,
        Class:inputStudentData.studentClass
    }
    
    await set(ref(db,'students/'+userJson.StudentId),userJson)
    .then(() => alert("Added"))
    .catch((err) => alert(err))
    Navigate('/')
    console.log("Added")
    
}

}


return <div className='form-bg-container'>
<div className="modal-container add-bg-container"> 
<h2>Enter Student Details!</h2>
<form className='form-container' onSubmit={onSubmittingForm}>
   <label htmlFor='input-box'>Enter Student Name</label>
   <input type='text' id='input-box' onChange={getStudentName} value={inputStudentData.studentName} className="name-box"/>
   <label htmlFor='input-box-branch'>Select Student Branch</label>
   <select className='update-drop-down' id="input-box-branch" onChange={getStudentBranch}>
            <option value='' selected>Branches</option>
            {branchList.slice(1,branchList.length).map((eachItem,currInd) => <option value={eachItem.Branch} id={currInd} key={currInd}>{eachItem.Branch}</option> )}
        </select>
   <label htmlFor='input-box-class'>Enter Student Class</label>
   <input type='text' id='input-box-class' onChange={getStudentClass} value={inputStudentData.studentClass} className="name-box"/>
  <div className='form-btns-container'>
  <button type='submit' className='update-btn add-btn'>Add</button>
  <button onClick={() => {Navigate('/')}} className="update-btn cancel-btn">Cancel</button>
  </div>
</form>
</div>
<p className='warning'>*make sure fields should not be empty!</p>
</div>


}

export default AddStudent