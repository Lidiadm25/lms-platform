### Frontend InnovaLearn

Frontend used for project InnovaLearn, a LMS platform still in development for online teaching for everyone.

## ✨ Features 

- **CRUD of Courses**: Teachers will be able to create courses, units, lessons with materials they can upload and even tasks.
- **Grade reviews**: Teachers will be able to download and visualize the files submitted by users to a task.
- **Explore**: Intuitive interface filtered by categories to search for the course that's more interesting for you.
- **Text Formatting**: Teachers will be able to edit the description of their lessons, tasks and courses with a text editor. Also allowing embedded videos. 
- **Calendar**: Users will be able to visualize past / active tasks in a all in one calendar.
- **Graphics**: Teachers can visualize in the dashboard everything related to their courses and students.
- **Messaging service**: Chat in web, where you can text anyone who's already online.


---

## 📌 TODO LIST

- Change logic in all related to manager-page, since the title doenst change and url dependency is problematic: 
  * Solution would be to use a service to manage the state of the course.
- Add a component to show the file list given by te teacher in lessons
- Work in the styles of the pages.
- Add accessibility features like Dark mode.


## How to deploy
1.- Clone project
2.- npm install
3.- Change enviroment variables, just using your own backend url.
4.- Make sure the backend is running already
6.- Use npm run start:dev
