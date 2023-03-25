
//import { Inter } from 'next/font/google'


//import e from "express";
import React,{Fragment, useState,useEffect} from "react";

import Multiselect from 'multiselect-react-dropdown';
export async function getServerSideProps() { 
  const res = await fetch("https://einstein-server.onrender.com/get_distinct_recipes")
  const data = await res.json()
  return {
    props: {
      todos: data
    }
  }
}

//const inter = Inter({ subsets: ['latin'] })

export default function Radioactive() {

    async function getServerSideProps() { 
        const res = await fetch("https://einstein-server.onrender.com/get_distinct_recipes")
        const data = await res.json()
        return {
            'todos': data
        }
      }
    var t = getServerSideProps()
    var todos = t.todos
    const formElem = document.querySelector('form');
    formElem.addEventListener('submit', async (e) => {
        console.log("form submitted")
        console.log(formElem)
      e.preventDefault();
      await fetch('/upload', {
        method: 'POST',
        body: new FormData(formElem),
      });
    });
  var [sel,setSel] = useState([])
  const [imagesrc,setImageSrc] = useState()
  const [uploadData,setUploadData] = useState()
  const onsubmit = async(e) =>{
    e.preventDefault();
    
}
function handleOnChange(changeEvent){
  const reader = new FileReader()
    reader.onload = function(onLoadEvent){
      setImageSrc(onloadEvent.target.result)
      setUploadData(undefined)
    }
  reader.readAsDataURL(changeEvent.target.files[0])
}
function onSelect(selectedList, selectedItem) {
  setSel(selectedList);
}
function onRemove(selectedList, removedItem) {
  setSel(selectedList);
}
  return `
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
 
  <body>
    <form>
    <Multiselect
                    options={todos} // Options to display in the dropdown
                    selectedValues={sel} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                    />
      <input type="file" name="Files" required multiple />
      <input type="text" name="Name" placeholder="Name" />
      <button type="submit">Submit</button>
    </form>
  </body>
  <script>
    
  </script>
</html>
  `
}
