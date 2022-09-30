import { useState ,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import { useParams} from 'react-router-dom';

import db from '../../firebase'

import {ref,get,update,child} from 'firebase/database'


import './index.css'

const UpdateStudent = () => {
    const id = useParams().id

    const Navigate = useNavigate()

    let [inputStudentData,setInputData] =useState({studentName:'',studentBranch:'',studentClass:''})

    let [branchList,setBranchList] = useState([])

    let [dropdownVal,setDropdownVal] = useState({optionId:''})

   useEffect(() => {
   getUserData()
   gettingBranchList()
   },[])

   const getUserData = async () => {
    const dbRef = ref(db);
    await get(child(dbRef, 'students/'+id)).then((snapshot) => {
        if (snapshot.exists()) {
            let data = snapshot.val()
            setInputData({
                studentName:data.StudentName,
                studentBranch:data.Branch,
                studentClass:data.Class
            })
            setDropdownVal({optionId:data.Branch})
           console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
 }




   const gettingBranchList = async () => {
    const dbRef = ref(db);
    await get(child(dbRef, 'branches')).then((snapshot) => {
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

const getStudentName = event => {
setInputData({
    ...inputStudentData,
    studentName:event.target.value
})
}


const getStudentBranch = event => {
    console.log(event.target.value)
setInputData({
    ...inputStudentData,
    studentBranch:event.target.value
})
setDropdownVal({optionId:event.target.value})
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

    await update(ref(db, 'students/' + id), {
        StudentName:inputStudentData.studentName,
        Branch:inputStudentData.studentBranch,
        Class:inputStudentData.studentClass
      })
      .then(() => alert("Updated Successfully"))
      .catch(err => alert(err))
    Navigate('/')
}

}



return <div className='form-bg-container'>
<div className="modal-container"> 
<h2>Enter Details to Update!</h2>
<form className='form-container' onSubmit={onSubmittingForm}>
   <label htmlFor='input-box'>Enter Student Name</label>
   <input type='text' id='input-box' onChange={getStudentName} value={inputStudentData.studentName} className="name-box"/>
   <label htmlFor='input-box-branch'>Select Branch</label>
   <select className='update-drop-down' value={dropdownVal.optionId} onChange={getStudentBranch}>
            {/* <option value='' selected>Select Branch</option> */}
            {branchList.slice(1,branchList.length).map((eachItem,currInd) => <option value={eachItem.Branch} id={currInd} key={currInd}>{eachItem.Branch}</option> )}
    </select>
   <label htmlFor='input-box-class'>Enter Student Class</label>
   <input type='text' id='input-box-class' onChange={getStudentClass} value={inputStudentData.studentClass} className="name-box"/>
  <div className='form-btns-container'>
  <button type='submit' className='update-btn'>Update</button>
  <button onClick={() => {Navigate('/')}} className="update-btn cancel-btn">Cancel</button>
  </div>
</form>
</div>
<p className='warning'>*make sure fields should not be empty!</p>
</div>


}

export default UpdateStudent