<style>h2,h3,h4 { border-bottom: 0; } </style>
<style>h3,h4 { font-weight: normal; } </style>
<h1 style="text-align: right"> Iteration 1 </h1>

## USER STORIES
### Block Out Times for Courses & Personal Activities - (Assigned to: *Kunle* | Priority: *High* | Expected: *0.5 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement a search bar UI for finding and selecting courses.                                  | 1.5h | 1h |
| Create API endpoints and controllers to fetch course data.                                    | 2h   | 2h |
| Implement backend service logic to format course data for frontend.                           | 1.5h | 1h |
| Develop dropdown menus to configure course preferences.                                       | 2h   | 1h |
| Write unit tests to validate course selection and scheduling functionality.                   | 1h   |  | 
<br/>
### Visualize a Weekly Schedule - (Assigned to: *Caleb* | Priority: *High* | Expected: *0.5 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Setup React Frontend Application and frontend folder heirarchy.                               | 2h | 2h |
| Design and implement the schedule activity UI, layout, and logic                              | 4h | 2h |
| Implement logic for storing and displaying complex objects in UI and storing objects locally. | 2h | 2.5h |
| Ensure course preferences persist in local storage for user sessions.                         | 3h | 2h |
| Testing, debugging, and UI refinements                                                        | 2h | 1h | 
<br/>
### Create and Account to Save Info Between Sessions - (Assigned to: *Mateo* | Priority: *High* | Expected: *0.4 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement backend logic for account creation and login authentication.                        | 2h | 3h |
| Write unit tests for account login and registration services.                                 | 3h |  |
| Develop frontend UI for login and registration pages.                                         | 4h | 2h |
| Implement session storage to handle errors, and local storage to maintain login.              | 2h | 2h | 
<br/>
### View Statistics on Time Spent in and Between Classes - (Assigned to: *Mirza* | Priority: *Low* | Expected: *0.15 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement logic to calculate time spent in classes and gaps between them.                     | 2h | |
| Develop a UI to visualize these statistics in a user-friendly format (1h).                    | 1h | |
<br/>
### Create a Friends List & Add Friends (Assigned to: *Ahmet* | Priority: *Medium* | Expected: *0.35 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement a search bar UI for finding and adding friends.                                     | 1h | |
| Develop the backend logic for friend request handling, covering multiple interaction types.   | 4h | |
| Write unit tests for friend request functionality.                                            | 2h | |
| Implement a frontend display for confirmed friends in the UI.                                 | 1h | |  
<br/>
### Leave Reviews on Courses (Assigned to: *Zayn* | Priority: *Medium* | Expected: *0.20 days* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement frontend UI for writing and submitting course reviews.                              | 2h | |
| Develop backend logic to store reviews in the database.                                       | 1h | |
| Write unit tests for review submission functionality.                                         | 2h | |
***
## Team Meetings
### January 20th (90 minutes)
* Discussed potential project ideas.
* Talked about what platforms we hope to use and which frameworks we each have experience with.
* Landed on making a website.
### January 27th (60 minutes)
* Finalized our idea for 'Improved Scheduling Tool for YorkU Students' as our project
* Discussed potential users and time frame.
* Created user stories for Iteration 0
### Febuary 3rd (60 minutes)
* Divison of user stories finalized. 
* Discussed more specific requirements for iteration 1, such as StubDatabase implementation ideas.
* Created the repository.
***
## Personal Logs
### Caleb 
 FEB 5TH 2025 (150 mins)
 - created a folder structure for our project
 - created some business objects for our iteration1 with functional helper methods

 FEB 6TH 2025 (120 mins)
 - created a react application which we will shape into our frontend
 - carved out the folder structure within the frontend.
 - created the basic format of the home page.

 FEB 7TH 2025 (150 mins)
 - after playing around with react, created some helper methods for the team to use when working with 
   frontend.

FEB 7-8TH 2025 (180 mins)
 - created a visual tool reflection of users choices for each course.
 - unit testing for the current course services and also the course model class.  
- added functionality for course preferences to be stored locally in the browser.

### Kunle
FEB 7th 2025 (220 mins)
 - Added functionality to the searchbar to find and add courses. Worked with Caleb to create the server
   and dummy data functions.
 - Created business logic to turn a course from the database into a UI-friendly object, and send this
   to the frontend using an express route.
 - You can change the selected section, start time, and duration for each activity on each day of the week.
 - This can now simply be implemented to have features which show it visually for Caleb's user story.

 ### Mateo
 Feb 8th 2025 (350 mins)
 - full implementation of account logic for login/register backend logic
 - full implementation of nessecary frontend hooks for storing logged in state
 - full implementation of account logic for saving course preferences after chaanges are made on front end

 Feb 9th 2025 (120 mins)
 - login and register ui complete
 - previously written login refactored to work with UI for these pages.