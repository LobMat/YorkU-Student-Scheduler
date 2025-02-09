import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../App';
import { useMountedEffect } from '../../logic/CustomEffects';
import './ReviewPage.css'
import { readSession, writeSession, POST, readLocal } from '../../logic/BrowserStorage';


function ReviewPage() {

  //#region - instantiation 
  const navigate = useNavigate();  
  const {navDep, navTrig, hasSignedIn} = useAppContext();
  useEffect(()=>{navTrig()},[]);


  useMountedEffect(() => {
    if (!hasSignedIn) {
      navigate('/login')
    } 
  },[hasSignedIn]);

    const [formData, setFormData] = useState({
    courseCode: "",
    difficulty: "",
    content: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3000/reviews/writeReview`, POST({
      accountId: readLocal('id') ?? "", 
      courseCode: formData.courseCode, 
      difficultyRating: formData.difficulty, 
      contentRating: formData.content, 
      description: formData.description
    }))
    .then(response => {
      if (response.status == 200) alert('review written successfully')
      else if (response.status == 201) alert ('course doesnt exist')
      else if (response.status == 202) alert ('account doesnt exist')
    })
  };

  return (
    <div className="reviewSection">
    <form onSubmit={handleSubmit}>
      <label>
        Course Code:
        <input
          type="text"
          name="courseCode"
          value={formData.courseCode}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Difficulty Rating:
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>

      <label>
        Content Rating:
        <select
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </label>

      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

export default ReviewPage

