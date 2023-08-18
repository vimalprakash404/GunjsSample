import { upload } from '@testing-library/user-event/dist/upload';
import './App.css';
import Gun from 'gun'
import {useEffect, useRef, useState} from 'react'

const gun = Gun({
  peers: ['http:localhost:5000/gun'] // Put the relay node that you want here
})
var students = [
  {
      id: 1001,
      first_name: "John",
      last_name: "Doe",
      age: 18,
      verified: false
  },
  {
      id: 1002,
      first_name: "Jane",
      last_name: "Smith",
      age: 17,
      verified: false
  },
  {
      id: 1003,
      first_name: "Michael",
      last_name: "Johnson",
      age: 16,
      verified: false
  },
  {
      id: 1004,
      first_name: "Emily",
      last_name: "Williams",
      age: 18,
      verified: false
  },
  {
      id: 1005,
      first_name: "Daniel",
      last_name: "Brown",
      age: 17,
      verified: false
  },
  {
      id: 1006,
      first_name: "Olivia",
      last_name: "Jones",
      age: 16,
      verified: false
  },
  {
      id: 1007,
      first_name: "William",
      last_name: "Taylor",
      age: 18,
      verified: false
  },
  {
      id: 1008,
      first_name: "Sophia",
      last_name: "Anderson",
      age: 17,
      verified: false
  },
  {
      id: 1009,
      first_name: "James",
      last_name: "Martinez",
      age: 16,
      verified: false
  },
  {
      id: 1010,
      first_name: "Ava",
      last_name: "Hernandez",
      age: 18,
      verified: false
  },
];


function App() {
  const [getdata,setdata]=useState({id : 1000})
  const idinput= useRef()
  function getfromgun()
  {
    gun.get(idinput.current.value).once((node) => { // Retrieve the text value on startup
      console.log(node)
      if(node === undefined) {
        gun.get('text').put({text: "Write the text here"})
      } else {
        console.log("Found Node")
        setdata(node)
        setverified(false)
  
      //  setdata(node)
      }
    })
    gun.get("updated").once((node) => { // Retrieve the text value on startup
      console.log(node[idinput.current.value])
      if (node[idinput.current.value])
      {
        setverified(true)
      }
    })
  }
  function verifyuser()
  { 
    getfromgun()
    gun.get(idinput.current.value).once((node) => { // Retrieve the text value on startup
      console.log(node)  
      if (node.verified)
        {
          alert("user all ready verified")
          setdata(node)
        }
        else 
        {
          gun.get(idinput.current.value).put({verified:true})
          var data = {}
          data[idinput.current.value]=true
          gun.get("updated").put(data)
          setverified(true)
        }
    })
  }
  

  const [verified,setverified]= useState(false)
  
  useEffect(() => {
    
    gun.get("updated").on((node) => { // Is called whenever text is updated
      // setdata(node)
      if (node[idinput.current.value])
      {
        setverified(true)
      }
    })
  }, [getdata])

  function uploaddata()
  {
    students.map((data)=>{
      gun.get(data['id']).put(data)
    })
    gun.get("updated").put({})
    
  }
  return (
    <div className="App">
      
      <input placeholder="student id"  ref={idinput}/>
      <button onClick={getfromgun}>get</button>
      
      {getdata != null ? <button onClick={verifyuser}>verify</button> : ""} <br/>
      {getdata != null ? "name :" + getdata.first_name: ""} <br/>
      {getdata != null ? "verified :" + getdata.verified: ""} 
      {/* {verified ? 'verified': ''} */}
      <br/>
      <button onClick={uploaddata}>upload</button><br/>
      {verified?"verified":""}
    </div>
    
  );
}

export default App;