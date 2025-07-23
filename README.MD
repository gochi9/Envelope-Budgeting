Site available at: https://envelope-budgeting-ppko.onrender.com/

![img_1.png](img_1.png)
![img.png](img.png)

This is a budgeting tool based on the envelope method. You allocate income into virtual envelopes and spend from them as needed. It runs on React on the frontend and Express.js on the backend. Real-time updates are handled via socket.io, and the UI uses basic CSS without any UI frameworks.

The frontend is built with React and organized using hooks for different domains like login, socket management, budgeting logic, and theme handling. The backend is an Express.js server exposing a REST API and socket interface. Drag-and-drop is handled with react-dnd. Styling is written from scratch and includes support for dark mode toggling.

You can log in, register, and manage your budget once authenticated. Income can be added globally. Envelopes can be created, reordered via drag and drop, renamed, or deleted. Money can be moved into envelopes, spent from them, or taken out. All actions are pushed to the server, which updates every connected client in real time.

The project avoids magic numbers by defining constants in a central config file. Length limits, timeouts, and error messages are declared clearly. Logic is separated into dedicated modules. For example, envelope operations (move, spend, take) are handled in a separate hook, as is login handling and socket management.

There’s no unnecessary global state. Each part of the app uses local state where appropriate. The theme logic is isolated. Server calls are wrapped in small utility functions to avoid repeated fetch boilerplate. State updates from the server are cleanly handled via a socket listener, and only update relevant parts of the UI.

There’s a clear separation between logic and presentation. All interaction logic is handled outside of the UI components. Effects are controlled, side effects are isolated, and state flows are predictable.

The backend runs on Express.js. It's a REST API with a small set of endpoints for auth, income handling, envelope operations, and state sync. Everything that changes server-side is pushed to connected clients via socket.io.

Session handling uses express-session with secure cookies. Routes are protected using a simple middleware that checks session state. Rate limiting is implemented per IP during login to avoid brute force attempts. Passwords are hashed using bcrypt.

Data is stored in SQLite. There's a minimal schema with users, income, and envelopes tables. Order of envelopes is preserved with an order_index column. All SQL queries are explicit, no ORM involved. Changes to envelopes or income trigger socket refreshes for the user’s room, so state stays consistent across tabs or devices.

Socket authentication reuses the session middleware. Each user is put in a separate socket.io room keyed by their ID. When something changes, that room gets a refresh event so all views update.