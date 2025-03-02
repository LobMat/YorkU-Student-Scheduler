# Iteration 1

## USER STORIES
### Block Out Times for Courses & Personal Activities - (Assigned to: *Kunle* | Priority: *High* | Expected: *0.5 days* | Actual: *0.3333 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement a search bar UI for finding and selecting courses.                                  | 1.5h | 1h |
| Create API endpoints and controllers to fetch course data.                                    | 2h   | 2h |
| Implement backend service logic to format course data for frontend.                           | 1.5h | 1h |
| Develop dropdown menus to configure course preferences.                                       | 2h   | 1h |
| Write unit tests to validate course selection and scheduling functionality.                   | 1h   | 3h | 
<br/>

### Visualize a Weekly Schedule - (Assigned to: *Caleb* | Priority: *High* | Expected: *0.5 days* | Actual: *~0.4 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Setup React Frontend Application and frontend folder heirarchy.                               | 2h | 2h |
| Design and implement the schedule activity UI, layout, and logic                              | 4h | 2h |
| Implement logic for storing and displaying complex objects in UI and storing objects locally. | 2h | 2.5h |
| Ensure course preferences persist in local storage for user sessions.                         | 3h | 2h |
| Testing, debugging, and UI refinements                                                        | 2h | 1h | 
<br/>

### Create and Account to Save Info Between Sessions - (Assigned to: *Mateo* | Priority: *High* | Expected: *0.4 days* | Actual: *0.375 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement backend logic for account creation and login authentication.                        | 2h | 3h |
| Write unit tests for account login and registration services.                                 | 3h | 2h |
| Develop frontend UI for login and registration pages.                                         | 4h | 2h |
| Implement session storage to handle errors, and local storage to maintain login.              | 2h | 2h | 
<br/>

### View Statistics on Time Spent in and Between Classes - (Assigned to: *Mirza* | Priority: *Low* | Expected: *0.125 days* | Actual: *0.125 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement logic to calculate time spent in classes and gaps between them.                     | 2h | 2h |
| Develop a UI to visualize these statistics in a user-friendly format (1h).                    | 1h | 1h |
<br/>

### Create a Friends List & Add Friends (Assigned to: *Ahmet* | Priority: *Medium* | Expected: *0.35 days* | Actual: *~0.3 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement a search bar UI for finding and adding friends.                                     | 1h | 1h |
| Develop the backend logic for friend request handling, covering multiple interaction types.   | 4h | 3h |
| Write unit tests for friend request functionality.                                            | 2h | 2h |
| Implement a frontend display for confirmed friends in the UI.                                 | 1h | 1h |  
<br/>

### Leave Reviews on Courses (Assigned to: *Zayn* | Priority: *Medium* | Expected: *0.20 days* | Actual: *~0.20 days* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implement frontend UI for writing and submitting course reviews.                              | 2h | 2h |
| Develop backend logic to store reviews in the database.                                       | 1h | 1h |
| Write unit tests for review submission functionality.                                         | 2h | 2h |
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
### February 10th (120 minutes)
 - check in on individual user stories (everything is good)
 - discussion on any possible changes and ideas for iteration 2.
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

FEB 11th 2025 (90 mins) 
 - created an easily compilable version of the app for submission.

### Kunle
FEB 7th 2025 (220 mins)
 - Added functionality to the searchbar to find and add courses. Worked with Caleb to create the server
   and dummy data functions.
 - Created business logic to turn a course from the database into a UI-friendly object, and send this
   to the frontend using an express route.
 - You can change the selected section, start time, and duration for each activity on each day of the week.
 - This can now simply be implemented to have features which show it visually for Caleb's user story.
FEB 11th 2025 (180 mins)
- unit testing for both course services.

 ### Mateo
 Feb 8th 2025 (350 mins)
 - full implementation of account logic for login/register backend logic
 - full implementation of nessecary frontend hooks for storing logged in state
 - full implementation of account logic for saving course preferences after chaanges are made on front end

 Feb 9th 2025 (120 mins)
 - login and register ui complete
 - previously written login refactored to work with UI for these pages.
 Feb 10th 2025 (120 mins) 
 - extensive unit testing for login and registration services
 
 ### Zayn
 Feb 9th 2025 (180 mins)
 - backend and ui for writing reviews, fully functional.

Feb 13th 2025 (120 mins)
- review unit tests written and passed.

 ### Ahmet 
 Feb 9th 2025 (120 mins)
 - extensive logic for adding friends
 - routes and controllers set up
 - some stub data added for accounts
 
 Feb 10th 2025 (180 mins)
 - frontend page for friends list added
 - dev tools tested.

Feb 12th 2025 (120 mins)
- unit tests for adding friends

 ### Mirza
Feb 11th 2025 (150 mins) 
- implemented the schedule time between and during logic 
- implemented the time spent UI


# Iteration 2
## USER STORIES
### Viewing Reviews - (Assigned to: *Zayn* | Priority: *High* | Expected: *0.5 days* | Actual: )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Design the display of reviews made by other users in the review page.                         | 1.5h |  |
| Design database calls to fetch review data from database.                                     | 2h   |  |
| Display retrived reviews from database on review page.                                        | 1.5h |  |
<br/>

### Improved Friend Features - (Assigned to: *Ahmet* | Priority: *Medium* | Expected: *0.5 day* | Actual:  )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Created users to simulate the addition of friends.                                            | 0.5h | |
| Created backend methods to allow users to send a request to other users.                      | 1h   | |
| Wrote more methods to accept or deny incoming friend requests.                                | 2h   | |
| Wrote unit tests to ensure friend requests are sent.                                          | 2h   | |

### Easier Time Selection - (Assigned to: *Caleb* | Priority: *High* | Expected: *0.5 day* | Actual: *0.3 day* )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Implemented updating course preferences by dragging and drop time selections of a course.     | 4h   | 3h |
| Modified course selection UI to allow the user to pick preferred times dynamically.           | 2h   | 1h |
| Test for errors in schedule overlap, handle edge cases.                                       | 2h   | 1h |

### Time Average Option - (Assigned to: *Mirza* | Priority: *Low* | Expected: *1 day* | Actual: )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Configured frontend displays to toggle options to display average courses.                    | 4h   | |
| Designed backend code to accumulate frequency of given courses.                               | 4h   | |
| Configured algorithms to calculate time averages for each courses.                            | 3h   | |

### Viewing Friends Schedules - (Assigned to: *Mateo* | Priority: *Medium* | Expected: *0.5 day* | Actual: *0.25 day*)
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Configured backend methods to access courses in a friend's schedule.                          | 3h   | 2h |
| Designed frontend pages to display a friend's schedule.                                       | 2h   | 2h |
| Designed frontend components to render schedules of friends.                                  | 2h   | 1h |

### More Schedule Options - (Assigned to: *Kunle* | Priority: *Medium* | Expected: *0.5 day* | Actual: )
| Development Task                             |  Expected Cost      |   Actual Cost       |
| :--------------------------------------------| :-----------------: | :-----------------: |
| Created frontend components for a user to enter details of custom activities.     | 2h   |  |
| Refined UI for custom activity picker.                                            | 3h   |  |
| Handled routing of custom activities to be displayed on the schedule.             | 2h   |  |
| Write backend functionality to access custom activities.                          | 3h   |  |

## Team Meetings
### Feb 21st (120 minutes)
* Came up with iteration 2 user stories.
* discussed what our goals were for this iteration's workflow, and how we can improve on the previous iteration's workflow.
* discussed database implementation ideas for iteration 2. 
### Feb 24th (45 mins)
* quick check-in to see how busy people are and when if they will be able to manage the work.
* did not discuss project much other than database implementation concerns.

## Personal Logs
### Mateo 
Feb 23rd 2025 (80 mins)
* PostgreSQL research and playing around.
* learned about common implementations in Node.js projects.
* learned how to create simple SQL databases

Feb 26th 2025 (120 mins)
* began playing around with how a PostgreSQL would look in our database
* created an outline and started to implement it into the actual repository.

Feb 27th 2025 (180 mins)
* created robust methods which enable our program to work easily with database
* sadly, some method calls had to be changed from our Stub implementation, so Stub implementation was also adjusted for integration testing.

March 1st 2025 (180 mins)
* Finished user story allowing users to see their friends' schedules
* tested it with current database implementation, and it works well.

### Caleb
March 1st (300 minutes)
* spent all day working on drag and drop feature.
* in the process, fixed some bugs with how activites are mapped to the grid.
* overall, the visual schedule functions much better than it did previously.

### Kunle
Feb 28 2025 (180 mins) 
* Reviewed scheduling algorithms for courses in preparation for custom activities
* Additionally reviewed back-end functionality for courses.
* Began to design UI for user inputted custom activities.

March 1st 2025 (220 mins)
* Finished styling for user-selected custom activities
* Passed user-selected activities to the proper pages for handling
* Integrated custom activities to the interactive grid so they can show on the schedule.
* Wrote custom activities to local storage.