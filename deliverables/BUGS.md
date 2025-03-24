## Bug Reports

| Problem Report # | *insert # here* |
| :--------------       | :---------      |
| Reported by | *insert name* |
| Date | *insert date* |
| Program/Component Name | *insert fitting part* |
| Version/Build | *insert name of branch or build* |
| Type | *coding, design issues, etc.* |
| Can Reproduce? | *Yes, No, Sometimes, Unknown* |
| Severity | *value 1-5* |
| Priority | *high, medium, low* |
| Summary | *insert 1-line summary* |
| Detailed Description | *insert detailed description/how to recreate* |
| Suggested Fix | *insert suggestions* |
| Status | *open, closed, resolved* |
| Resolution | *pending, fixed, cannot reproduce, duplicate, etc.* |
| Resolved by | *insert name* |

| Problem Report # | 1 |
| :--------------       | :---------      |
| Reported by | Mateo |
| Date | 03/20/2025 |
| Program/Component Name | YorkU-Account-Scheduler User Reviews |
| Version/Build | Main branch based on iter-2 |
| Type | code |
| Can Reproduce? | Yes |
| Severity | 3 |
| Priority | medium |
| Summary | Error when adding review |
| Detailed Description | When trying to add a review on the website, there is an error when trying to add it to the database. Something to do with an incorrect type trying to be added to a field in the reviews table. |
| Suggested Fix | Either change the type in the table in the DB or change the field to an accepted value when the review object is created. |
| Status | resolved |
| Resolution | fixed |
| Resolved by | Mateo |

| Problem Report # | 2 |
| :--------------       | :---------      |
| Reported by | Mateo |
| Date | 03/22/2025 |
| Program/Component Name | YorkU-Account-Scheduler User Reviews |
| Version/Build | Main branch based on iter-2 |
| Type | code |
| Can Reproduce? | Yes |
| Severity | 3 |
| Priority | medium |
| Summary | Issue when adding review |
| Detailed Description | In the database, the array for ids of reviews made by a user gets added to their customActs column. It’s supposed to be added to the array of review ids. |
| Suggested Fix | Find where the parameters are passed to the DB and correct it. |
| Status | resolved |
| Resolution | fixed |
| Resolved by | Mateo |


| Problem Report # | 3 |
| :--------------       | :---------      |
| Reported by | Kunle |
| Date | 03/24/2025 |
| Program/Component Name | YorkU-Account-Scheduler Drag and Drop Scheduling |
| Version/Build | Main branch based on iter-2 |
| Type | code/design |
| Can Reproduce? | Yes |
| Severity | 2 |
| Priority | medium |
| Summary | Issue when adding custom activities that conflict with course components |
| Detailed Description | When a custom activity is added that conflicts with a course component, the custom activity does not show up. |
| Suggested Fix | Edit the schedule to account for conflicts, or disallow conflicts. |
| Status | Open |
| Resolution | Pending |
| Resolved by |  |

