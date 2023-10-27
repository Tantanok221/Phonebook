import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.sass'
import axios from "axios"


axios.get("http://localhost:3000/persons").then(response => {
  
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App data={response.data}/>
  )
  

})

