
import React, {useState, useEffect} from "react";
import '../styles/LeftBody.css'
import SearchBar from './SearchBar';
import CourseList from './CourseList'

function LeftBody() {
    
  return (  
    <>
      <div id="left-body">
        <SearchBar />
        
        <CourseList />
      </div>
      
    </>
  )
}

export default LeftBody;

