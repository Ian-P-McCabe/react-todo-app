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
- Nice animations when adding, viewing, and filtering Todos

# 3 Design Decisions

- When researching sample todo applications, I was a fan of having just the title visible, which is why the description is hidden unless the user hovers over the item
- I initially envisioned the todo items as their own cards, and built the application around that idea

# 4 Challenges

- Using useEffect on the todos list is an efficient way to ensure they're always saved to local storage, however when the Todos array is initialized it clears the local storage, so I had to add a check to see if the user was on their first render

# 5 Improvements

- Export the todo update/create/delete logic to a reducer, it would be much cleaner and all the logic could be in a separate file
- Export the filter buttons to their own component, the animation has a bit of logic to it so the footer component would be cleaner if that logic was elsewhere
- I would explore breaking up the TodoCard component into a couple of different components since it is quite meaty at the moment
- I would also add some more animations and color to the application, some of the designs I drew from had pretty backgrounds as well
