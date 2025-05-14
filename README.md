1. Complete the project within one day (24 hours) from receiving this assignment
2. Create a ZIP file of your project directory, excluding the `node_modules` folder
3. Include a README.md with:

   - Setup instructions
   - Features implemented
   - Any design decisions or trade-offs you made
   - Challenges faced and how you overcame them
   - What you would improve with more time

4. Ensure the application is fully functional when following your setup instructions
5. Submit the ZIP file via the provided submission method

# 1 Setup

1. Navigate to the root directory of this project 'my-todo-app'
2. Run 'npm ci'
3. Run 'npm run dev'

# 2 Features

- Create new todos with a title and optional description
- Mark todos as complete/incomplete
- Edit existing todos
- Delete todos
- Filter todos by status (All, Active, Completed)
- Todos are locally stored and persist between browser sessions

# 3 Design Decisions

- I have implemented minimal accessibility labels due to time
- The application is a little small overall
- I would add a feature so that when a user hit enter while on the Title/Description field when adding a todo it would submit without them having to tab over to the add button

# 4 Challenges

- Using useEffect on the todos list is an efficient way to ensure they're always saved to local storage, however when the Todos array is initialized it clears the local storage, so I had to add a check to see if the user was on their first render

# 5 Improvements

- Export the todo update/create/delete logic to a reducer, it would be much cleaner and all the logic could be in a separate file
- I would explore breaking up the TodoCard component into a couple of different components since it is quite meaty at the moment
- I would also add some more animations and color to the application, some of the designs I drew from had pretty backgrounds as well
