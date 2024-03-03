import React, { useEffect, useState } from "react";
import { getcomplaint, addcomplaint} from "../services/ApiService";
//import { getcomplaint, addcomplaint, editcomplaint, deletecomplaint } from "../services/ApiService";
import { SectionWrapper } from "../hoc";
import Popup from 'reactjs-popup';
import { Tilt } from 'react-tilt'

import { motion } from "framer-motion"

import { styles } from '../styles';
import { services } from '../constants';

import { fadeIn,textVariant } from '../utils/motion'
import AddComplaints from "./AddComplaints";
import EditComplaints from "./EditComplaints";


const Feedbacks = () => {

  const [complaints, setComplaints] = useState([])
  const [showAddComplaintForm, setShowAddComplaintForm] = useState(false)
  const [showEditComplaintForm, setShowEditComplaintForm] = useState(false)
  const [SelectedEditData, setSelectedEditData] = useState()

  useEffect(() => {
    let mount = true
    getcomplaint()
    .then(res => {console.log("res from api",res)
      setComplaints(res)
      return() => mount = false
    })
  },[])

const handleAddSubmit = (e) => {
  addcomplaint(e.target)
  .then(res => {
  setComplaints(res)
  })
}

const handleEditBtn = (complaint) => {
  setSelectedEditData(complaint)
  setShowEditComplaintForm(true)
  setShowAddComplaintForm(false)
}

const handleDeleteBtn = (id) => {
  deletecomplaint(id)
  .then(res => {
    setComplaints(complaints.filter(p=>p.patient_id !== id))
  })
}


const handleEditSubmit = (e,id) => {
  editcomplaint(id, e.target)
  .then(res => {
    setComplaints(res)
  })
}

  return(
    <>

      <div class="flex flex-col">
        
        <motion.div variants={textVariant()}>
          <h2 className={styles.sectionHeadText}>Complaint List</h2>
        </motion.div>
        <br/>
        <br/>
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              {/* table here */}
              {complaints.map(complaint => {
                  return <tr key={complaint.complaint_id} >
                    <Popup trigger=
                        {<button class="bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 border-b-4 border-violet-700 hover:border-violet-500 rounded text-[20px]">{complaint.category}<br/>[ {complaint.date_time} ]</button>} 
                        
                        modal nested>
                        {
                            close => (
                              <div className='xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
                                 <motion.div className='flex-[2] bg-black-100 p-8 rounded-2xl'style={{ background: "#1d1836" }}> 
                                <p className={styles.sectionHeadText}>Detail</p>
                                <br/>
                                <h3 className=' text-white font-medium mb-4' style={{ fontSize: "20px" }}><h3 className='bg-tertiary py-4 px-6 text-secondary text-white rounded-lg outlined-none border-none font-medium'>{complaint.category}</h3></h3>
                                <div style={{ height: "7px" }} />
                                <h3 className='text-white font-medium mb-4' style={{ fontSize: "20px" }}><h3 className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'>{complaint.date_time}</h3></h3>
                                <div style={{ height: "7px" }} />
                                <h3 className='text-white font-medium mb-4' style={{ fontSize: "20px" }}><h3 className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'>{complaint.location}</h3></h3>
                                <div style={{ height: "7px" }} />
                                <h3 className='text-white font-medium mb-4' style={{ fontSize: "20px" }}><h3 className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'>{complaint.description}</h3></h3>
                                <div style={{ height: "7px" }} />
                                <h3 className='text-white font-medium mb-4' style={{ fontSize: "20px" }}><h3 className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'>{complaint.evi_format}</h3></h3>
                                <div style={{ height: "7px" }} />
                                {/* Add a new blank line */}
                                <div style={{ height: "20px" }} />
                                <div>
                                  <button
                                  className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
                                  onClick=
                                  {() => close()}>
                                          Close
                                  </button>
                                </div>
                                </motion.div>
                                  </div>
                            )
                        }
                    </Popup>
                    {/* Add a new blank line */}
                    <div style={{ height: "20px" }} />
                  </tr> 
              })}
            </div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      {showAddComplaintForm && <AddComplaints handleAddSubmit={handleAddSubmit}/>}
      {showEditComplaintForm && <EditComplaints handleEditSubmit={handleEditSubmit} SelectedEditData = {SelectedEditData}/>}
    </>
  )

}

export default SectionWrapper(Feedbacks,"feedbacks")


{/*

<table class="table-auto">
  <thead class="bg-black-100 p-8 rounded-2xl text-[22px]">
    <tr>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Case Category</th>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Date & Time of Incident</th>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Location of Incident</th>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Description</th>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Evidence Format</th>
      <th scope="col" class="whitespace-nowrap px-6 py-4 font-medium">Uploaded File</th>
    </tr>
  </thead>
  <tbody className="text-[18px]">
  {complaints.map(complaint => {
        return <tr key={complaint.complaint_id} class="bg-tertiary">
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.category}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.date_time}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.location}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.description}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.evi_format}</td>
          <td class="whitespace-nowrap px-6 py-4 font-medium">{complaint.evidence}</td>
        </tr> 
    })}
  </tbody>
</table>

*/}