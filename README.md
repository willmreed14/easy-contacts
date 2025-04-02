# Easy Contacts

A modern web application for managing contacts, built with React, Firebase, and Tailwind CSS. Store and manage your contacts seamlessly with both local and cloud storage options.

## Features

- 👤 **User Authentication**
  - Email/Password login
  - Google Sign-in
  - Password reset functionality
  - Automatic contact migration upon sign-up

- 📱 **Contact Management**
  - Create, read, update, and delete contacts
  - Store name, email, and phone information
  - Automatic phone number formatting
  - One-click copy for email and phone numbers

- 🔍 **Search & Sort**
  - Real-time contact filtering
  - Sort by name or email
  - Clear empty state indicators

- 💾 **Storage Options**
  - Local storage for non-authenticated users
  - Cloud storage (Firebase) for authenticated users
  - Automatic migration from local to cloud storage

- 📤 **Export Options**
  - Export to CSV with date-stamped filenames
  - Export filtered contacts only

## Technologies Used

- Frontend:
  - React
  - Tailwind CSS
  - Heroicons
  - Vite

- Backend/Storage:
  - Firebase Authentication
  - Cloud Firestore
  - Local Storage API

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd contact-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the project root and add your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
contact-manager/
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx
│   │   ├── ContactForm.jsx
│   │   ├── ContactList.jsx
│   │   └── SignInBanner.jsx
│   ├── services/
│   │   └── contactService.js
│   ├── App.jsx
│   ├── firebase.js
│   └── main.jsx
├── .env
└── package.json
```

## Firebase Setup

1. Create a new Firebase project
2. Enable Authentication (Email/Password and Google providers)
3. Set up Cloud Firestore
4. Add your web app to the Firebase project
5. Copy the configuration to your `.env` file

## Security

- Firestore security rules ensure users can only access their own contacts
- Secure authentication flow with password reset capability
- Local storage for temporary data before authentication

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License

Copyright (c) 2024 William Reed

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Acknowledgments

- [Heroicons](https://heroicons.com/) for the beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for the styling
- [Firebase](https://firebase.google.com/) for authentication and storage
- [React](https://reactjs.org/) for the frontend framework
