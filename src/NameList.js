import React from 'react';
import './NameList.css';
import FlipMove from 'react-flip-move';

function NameList(props){
    

  const players = props.players

  
    
    

    
   

  //   const listNames = nameList.map(name =>
  //  {
  //      return <div className="list" key={name.key}>
  //    <p>
  //        <input type="text" id={name.key} value={name.name} />
      
  //    </p>
     
  //   </div>})


const listNames1 = players.map((player,i) =>
  {
      return <div className="list" key={player.name}>
    <p>
       {i +1} <input type="text" id={player.key} value={player.name.$t} />
     
    </p>
    
   </div>})

    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listNames1}
        </FlipMove>
    
    </div>;
  }

  export default NameList;