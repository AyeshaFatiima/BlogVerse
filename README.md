# BlogVerse-A Full-StackWeb Application

BlogVerse is a feature-rich, responsive full-stack web application designed for seamless content sharing. It empowers users with a secure authentication system to sign up and log in, alongside full CRUD (Create, Read, Update, Delete) capabilities. Built with a focus on user experience, the platform allows creators to manage their blogs effortlessly while ensuring data integrity and a mobile-friendly interface.


## ✨ Key Features
- **User Authentication & Authorization:** - Secure Signup and Login functionality using `passport-local`.
  - Protected routes to ensure only logged-in users can create or edit blogs.
  
- **Complete CRUD Functionality:**
  - **Create:** Share your thoughts by creating new blog posts.
  - **Read:** Browse through a collection of diverse blogs from various authors.
  - **Update:** Edit and refine your existing posts via a dedicated edit form.
  - **Delete:** Remove your posts instantly with a single click.

- **Responsive Design:** - Fully optimized for all devices, including desktops, tablets, and mobile phones, ensuring a smooth reading experience anywhere.

- **Interactive UI/UX:**
  - User-friendly navigation and modern layouts built with Bootstrap and EJS Mate.
  - Flash messages to provide instant feedback for actions like successful login or post deletion.
  - 
## 🛠️ Tech Stack

- **Frontend:** EJS (Embedded JavaScript), Bootstrap 5, Custom CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** Passport.js (Local Strategy)
- **Image Storage:** Cloudinary (via `cloudConfig.js`)
- **Validation:** Joi (Schema-based validation)

## 📁 Project Structure

- **/controllers** - Contains the logic for route handlers.
- **/models** - Mongoose schemas for Blogs, Reviews, and Users.
- **/routes** - Modularized Express routes for clean code architecture.
- **/views** - EJS templates for dynamic frontend rendering.
- **/public** - Static assets (CSS, client-side JavaScript, and images).
- **/utils** - Utility functions like async wrappers and custom error classes.
- **/init** - Data initialization scripts for the database.
- **app.js** - The main entry point of the server.
- **middleware.js** - Custom Express middleware (e.g., login checks).
- **schema.js** - Server-side data validation schemas (Joi).
- **cloudConfig.js** - Configuration for cloud services (like Cloudinary).
 
```
