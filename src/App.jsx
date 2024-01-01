import React, { useState } from 'react'
import './App.css'
import Data from './resources/countryData.json'

function App()  {

  const [count, setCount] = useState("");
  const [dataVisibility, setDataVisibility] = useState(false);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setCount(searchTerm);
    setDataVisibility(searchTerm.length > 0);
  }

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      console.log("Escape key pressed");
      setDataVisibility(false);
    } else {
      setDataVisibility(count.length > 0);
    }
  }


  const search = (searchTerm) => {
    setCount(searchTerm);
    setDataVisibility(false);
  }

  const filteredItems = Data.filter((item) => {
    const searchTerm = count.toLowerCase();
    const name = item.name.toLowerCase();
    return name.startsWith(searchTerm);
  });

  const handleButtonClick = () => {
    search(count);
    console.log("Escape");
  }

  return (
    <>
      <div className='full-container'>
         <h1>Auto Complete Text Box</h1>
         <div className='search-container'>
           <input type="text" value={count} onChange={handleChange} onKeyDown={handleEsc} />
           <button onClick={handleButtonClick}>Search</button>
         </div>
         <div id='autocomplete' className='data-display' style={{ display: dataVisibility ? 'block' : 'none' }}>
           {filteredItems.length > 0 ? (
             <ul>
               {filteredItems.map((item) => (
                 <li key={item.name} onClick={() => search(item.name)}>
                   {item.name}
                 </li>
               ))}
             </ul>
             ) : ( <p>No matching results</p> )}
         </div>
      </div>
    </>
  )
}

export default App
