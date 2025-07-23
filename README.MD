Site available at: https://envelope-budgeting-ppko.onrender.com/

![img_1.png](https://i.imgur.com/w98JbvA.png)
![img.png](https://i.imgur.com/gyDtHzc.png)

Front: Node+Vite
Back: Express

You can create an account and save the envelope and income states. Envelopes can be created, reordered via drag and drop, renamed, or deleted. Money can be moved into envelopes, spent from them, or taken out.

Tried to implement good practices. No magic values, length limits, timeouts, and error messages. Logic is separated into dedicated modules.

Each part of the app uses local state where appropriate. Server calls are wrapped in small utility functions to avoid repeated fetch boilerplate

I'm using sockets to update the session from other opened browsers/tabs. I've tried to separate the logic and presentation.

Session handling uses express-session with secure cookies. Routes are protected using a simple middleware that checks session state. Rate limiting is implemented per IP during login to avoid brute force attempts. Passwords are hashed using bcrypt.