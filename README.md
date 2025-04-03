# 👥 Easy Contacts

A modern contact management application with two implementations:
- **Main Branch (Firebase)**: A fully client-side application using Firebase for authentication and data storage
- **Flask Branch**: A full-stack implementation using a Flask REST API and local storage

## 🌟 Features

### Common Features (Both Versions)
- Clean, responsive UI built with React and Tailwind CSS
- Full CRUD operations for contact management
- Automatic phone number formatting
- One-click copy for email and phone numbers
- Real-time search and filter functionality
- Column sorting
- CSV export capability
- Interactive feedback (toast notifications)

### Main Branch (Firebase) Features
- Email/Password and Google Sign-in authentication
- Cloud storage using Firestore
- Local storage for unauthenticated users
- Automatic migration of local contacts upon authentication
- Multi-device sync for authenticated users

### Flask Branch Features
- Local data persistence using SQLite database
- RESTful API endpoints for contact operations
- Server-side data validation
- No authentication required - perfect for personal use

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+ (for Flask branch)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/easy-contacts.git
cd easy-contacts
```

2. Choose your version:

#### For Main Branch (Firebase):
```bash
git checkout main  # or just stay on main branch
npm install
```

Create a `.env` file with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### For Flask Branch:
```bash
git checkout Flask
```

Setup Frontend:
```bash
npm install
```

Setup Backend:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

#### Main Branch (Firebase):
```bash
npm run dev
```

#### Flask Branch:
Terminal 1 (Backend):
```bash
cd backend
flask run
```

Terminal 2 (Frontend):
```bash
npm run dev
```

## 🔄 Switching Between Versions

To switch between versions:
```bash
git checkout main    # For Firebase version (main branch)
git checkout Flask  # For Flask version
```

## 🛠️ Technologies Used

### Common (Both Versions)
- React
- Tailwind CSS
- Vite
- Axios

### Firebase Version
- Firebase Authentication
- Cloud Firestore
- Firebase Hosting

### Flask Version
- Flask
- SQLite
- Flask-SQLAlchemy
- Flask-CORS

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- React + Vite template
- Tailwind CSS
- Heroicons
- React Hot Toast
