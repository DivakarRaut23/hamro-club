import React, {useState, useEffect} from 'react';
import './App.css';
import NameList from './NameList'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFutbol } from '@fortawesome/free-solid-svg-icons'

library.add(faFutbol)
function App() {

const initialName = {
  name: '',
  key : ''
}

const [venue, setvenue] = useState('')
const [formData, setFormData] = useState({
  name:" ",
  key: " "
})
const [data, setData] = useState('')
const [nameList, setNameList] = useState([])
const [currentName, setCurrentName] = useState(initialName)


useEffect(() => {
  
  fetch(`https://spreadsheets.google.com/feeds/list/1y_za4ROstVZN6g4XS38nOIDZgVIVXngVcZcbNziJjjs/od6/public/basic?alt=json`)
      .then(res => res.json())
      .then(json => setData(json.feed.entry))
         
}, [])


const players =[];
for (let index = 0; index < data.length; index++) {
 
  const element = data[index];
  
   const user = {
     name:element.title,
     key: element.title
   }
  //  setNameList(...nameList,user)
 players.push(user)
  
}


const {name, key } = currentName;


const addItem = async (e) => {
  e.preventDefault();
  const newName = currentName;
  if(currentName.name !==""){

    const names = [...nameList, newName];
  setNameList( names)
    setCurrentName(initialName)
  
}

try {

  const response = await fetch('https://v1.nocodeapi.com/thewalker/google_sheets/WIddlvQOkPypNWpI?tabId=Sheet1',
  {
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([[name, key]])

  })
  await response.json();


  
} catch (error) {
  console.log(error)
}



}

const handleInput = (e) => {
  const playerName = {
    name: e.target.value,
    key: Date.now()
  }
 setCurrentName(playerName)
}






  return (
    <div className="App">
      <header>
        <div id='title'> Hamro Club Oran Park </div>
        <div id='venue'><b>Venue:</b> Wayne Gardener Reserve</div>
        <div id='date'><b>Date:</b> 26/06/2021, Saturday </div>
        <form id="to-do-form" onSubmit={addItem}>
          <input type="text" placeholder="Enter Name" value= {currentName.name} onChange={handleInput}></input>
          <button type="submit">Add</button>
        </form>
        
                    
          <NameList data={data} players={players} nameList={nameList} />

                 
      </header>
    </div>
  );
}

export default App;
