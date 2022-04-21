# Build a simple blog. The app will allow a user to:

- Create a new post
- Update a post
- Delete a post
- View a single post
- View all posts (with pagination)
- Search for posts via keyword, results must be paginated.
- Sort posts via date created / title
- - via date created
- - via title
- - via date updated
- At minimum, a post has a title and content.
- Validations must be present (like post title and content should be required.)
- Before deleting a post, a confirm modal should be displayed to warn the user, and ask if he/she wants to continue.
- No need for user registration/login.

# Tech Requirements:

1. Must use React and its hooks.
2. Use whatever you prefer for styling, UI frameworks, storage, etc.
3. Push the project to github.

# Notes:

- Pagination is done in the frontend since firestore doesn't support pagination other than infinite scroll
- Delete function just sets the blog as inactive since it's not best practice to delete entries in the database
- Styling is kept at minimum
- Server errors not handled
- Added indicator for submit success
- Added truncate for long contents

# Things that can be improved:

- set loading indicator if still fetching
- styling
- mobile responsive
- refactor Landing page
