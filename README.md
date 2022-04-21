Build a simple blog. The app will allow a user to:
X Create a new post
X Update a post
X Delete a post

X View a single post
X View all posts (with pagination)
X Search for posts via keyword, results must be paginated.
X Sort posts via date created / title
via date created
via title
via date updated
X At minimum, a post has a title and content.
X Validations must be present (like post title and content should be required.)
X Before deleting a post, a confirm modal should be displayed to warn the user, and ask if he/she wants to continue.
X No need for user registration/login.

Tech Requirements:

1. Must use React and its hooks.
2. Use whatever you prefer for styling, UI frameworks, storage, etc.
3. Push the project to github.

Notes:

- Pagination is done in the frontend since firestore doesn't support pagination other than infinite scroll
- Delete function just sets the blog as inactive since it's not best practice to delete entries in the database
- Styling is kept at minimum
- Server errors not handled
