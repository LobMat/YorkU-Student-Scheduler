import React, {useState, useEffect} from 'react';
import  { useNavigate } from 'react-router-dom'
import { useAppContext } from '../../App';
import { useMountedEffect } from '../../logic/CustomEffects';
import './ReviewPage.css'
import { readSession, writeSession, POST, readLocal } from '../../logic/BrowserStorage';
import SearchBar from './SearchBar';

function ReviewPage() {

  //#region - instantiation 
  const navigate = useNavigate();  
  const {navigation: {hasSignedIn, navigationTrigger}} = useAppContext();


  // mount effect, check for valid login
  useEffect(() => { navigationTrigger() }, []);

  // post-mount effect, check for any changes to login status after first render.
  useMountedEffect(()=> {
    if (!hasSignedIn) {
      navigate('/');
    }
  }, [hasSignedIn])

    const [formData, setFormData] = useState({
    courseCode: "",
    difficulty: "",
    content: "",
    description: "",
  });
  const [searchResults, setSearchResults] = useState([])
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

  const handleReviewSearch = (query) => {
    const parameters = new URLSearchParams();
    parameters.append('query', `${query}`);
    fetch(`http://localhost:3000/reviews/getReviews?${parameters.toString()}`, {method: 'GET'})
    .then(response => response.json())
    .then(data => setSearchResults(data.response));
  }

  return (
    <div className="review-container">
      {/* Left Panel: Search Bar & Results */}
      <div className="review-search">
        <SearchBar handleSearch={handleReviewSearch} />
        <div className="review-list">
          {searchResults.length > 0 ? (
            searchResults.map((review, index) => (
              <div key={index} className="review-item">
                <h4>{review.course}</h4>
                <p><strong>Difficulty:</strong> {review.difficulty}/5</p>
                <p><strong>Content:</strong> {review.quality}/5</p>
                <p>{review.description}</p>
              </div>
            ))
          ) : (
            <p>No matching reviews found.</p>
          )}
        </div>
      </div>

      {/* Right Panel: Review Form */}
      <div className="review-form">
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
            <select name="difficulty" value={formData.difficulty} onChange={handleChange} required>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>

          <label>
            Content Rating:
            <select name="content" value={formData.content} onChange={handleChange} required>
              <option value="">Select</option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </label>

          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage

