# 🎵 **M4U - Music Streaming Platform**

**Music Streaming Platform** lets users browse, play, and manage songs, favorite tracks, and personal albums. It supports authentication, artist and songs browsing, responsive audio player, search and filters.

Furthermore, it features a Admin Dashboard, providing administrators with control songs, albums, artist, genres, and user management through a secure, role-based access control (RBAC) system.

## 🌐 Deployment
- 🚀 **Front-end React-JS**: [music4u-reactjs.vercel.app](https://music4u-reactjs.vercel.app/)
- 🚀 **Back-end Django REST APIs**: [phamquoctuan041203.pythonanywhere.com/api](https://phamquoctuan041203.pythonanywhere.com/api/)
- 🚀**Web App MVC**: [phamquoctuan041203.pythonanywhere.com](https://phamquoctuan041203.pythonanywhere.com/)

###

- *Source Front-end:* [github.com/quoctuan-IT/Music_4U-React_JS](https://github.com/quoctuan-IT/Music_4U-React_JS.git)
- *Source Back-end:* [github.com/quoctuan-IT/Music_4U](https://github.com/quoctuan-IT/Music_4U.git)

## 🛠️ Tech Stack
- 🎨 **Frontend**: React-JS (Vite), Axios, JavaScript, HTML5, CSS3, Bootstrap5
- ⚙️ **Backend**: Python 3 (Django REST Framework 5)
- 🗄️ **Database**: MySQL Workbench 8
- 🔗 **ORM**: Django ORM
- 🔐 **Authentication**: Django Session + Simple JWT Auth
- 📄 **API Documentation**: Django REST Framework API
- 🌈 **Icons**: Bootstrap Icons

## ✨ Features

### 👤 Customer
- **Smart Streaming:** High-quality audio playback with auto-play next track logic.
- **Library Management:** Personalize experience with Favorites and Custom Albums.
- **Discovery:** Browse latest releases, artist profiles, and detailed track insights.
- **Advanced Search:** Quick navigation with smart filtering by songs and artists.

### 👨‍💼 Admin Panel (Django Admin)
- **Authorization:** Secure RBAC (Role-Based Access Control).
- **Catalog:** Full CRUD Songs, Users, Genres, Artists, Albums.
- **Users:** Account oversight and security credential resets.
- **Token:** Management Outstanding Token and Blacklisted Token.

## API Endpoints

Base URL (local): `http://127.0.0.1:8000/api/` — configured in React at `src/services/api.js`.

Endpoints marked **JWT** require header: `Authorization: Bearer <ACCESS_TOKEN>`.

### Home API (`/api/`)
- `GET /` — Latest songs & artists for homepage

### Auth API (`/api/auth/`)
- `POST register/` — Register user (returns JWT)
- `POST login/` — Login (get access + refresh tokens)
- `POST refresh/` — Refresh access token
- `POST verify/` — Verify access token
- `POST logout/` — Logout (blacklist refresh token) **JWT**
- `GET profile/` — User profile & favorite songs **JWT**

### Search API (`/api/search/`)
- `GET /?query=<string>&genre=<id>` — Search songs & artists (filter by genre optional)

### Songs API (`/api/songs/`)
- `GET /` — List songs (paginated)
- `GET /{id}/` — Song detail (`is_favorite`, `user_albums` when logged in)

### Favorites API (`/api/`)
- `GET favorites/` — List favorite songs **JWT**
- `POST songs/{id}/favorite/` — Toggle favorite **JWT**

### Artists API (`/api/artists/`)
- `GET /` — List artists (paginated)
- `GET /{id}/` — Artist detail (includes songs)

### Genres API (`/api/genres/`)
- `GET /` — List genres (used by SearchCard filter)
- `GET /{id}/` — Genre detail

### Albums API (`/api/albums/`) **JWT**
- `GET /` — List my albums
- `POST /` — Create album (`{ "name": "..." }`)
- `GET /{id}/` — Album detail (with songs)
- `DELETE /{id}/` — Delete album
- `POST /{album_id}/songs/{song_id}/` — Add song to album
- `DELETE /{album_id}/songs/{song_id}/remove/` — Remove song from album

## 🏗️ Solution Structure

The project is split into two repositories: **React SPA (frontend)** and **Django (backend API + MVC + Admin)**.

```text
Music_4U-React_JS/                 # React frontend (this repo)
├── src/
│   ├── components/                # UI: Header, SongCard, MusicPlayer, SearchCard, ...
│   ├── pages/                     # Home, Search, Song, Artist, Profile, Favorite, Album, Auth, ...
│   ├── context/                   # AuthContext (JWT), MessageContext (toast notifications)
│   ├── services/api.js            # Axios client + JWT interceptors
│   ├── utils/authStorage.js       # localStorage: access / refresh tokens
│   └── App.jsx                    # React Router routes
├── package.json
└── vite.config.js

Music_4U/                          # Django backend (separate repo)
└── source/
    ├── app/                       # Models, API views, serializers, MVC views
    ├── project/                   # settings.py, urls.py, CORS
    ├── media/                     # Uploaded audio & images
    ├── templates/                 # Django MVC templates (legacy UI)
    ├── manage.py
    └── requirements.txt
```

## 🚀 Setup & Run Locally

Run **backend first**, then **frontend**. React dev server defaults to `http://localhost:5173`.

### A) Backend — Django REST API

```bash
git clone https://github.com/quoctuan-IT/Music-4U.git
cd Music-4U/source

python -m venv venv
venv\Scripts\activate          # macOS/Linux: source venv/bin/activate
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

python manage.py runserver
```

**Backend URLs**
- API: `http://127.0.0.1:8000/api/`
- Admin: `http://127.0.0.1:8000/admin/`
- MVC (legacy): `http://127.0.0.1:8000/`

### B) Frontend — React (Vite)

```bash
git clone https://github.com/quoctuan-IT/Music_4U-React_JS.git
cd Music_4U-React_JS

npm install
npm run dev
```

**Frontend URL:** `http://localhost:5173`

> Ensure `src/services/api.js` points to your running API (`http://127.0.0.1:8000/api`). Enable CORS for `http://localhost:5173` in Django settings when developing locally.

## 🧪 Quick API Test Flow

```bash
# Register
curl -X POST http://127.0.0.1:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123","password2":"pass123","email":"test@example.com"}'

# Login → save access & refresh tokens
curl -X POST http://127.0.0.1:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"pass123"}'
# Response: {"access":"<ACCESS_TOKEN>","refresh":"<REFRESH_TOKEN>"}

# Public: list songs
curl http://127.0.0.1:8000/api/songs/

# Authenticated: profile
curl http://127.0.0.1:8000/api/auth/profile/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Refresh when access token expires
curl -X POST http://127.0.0.1:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"<REFRESH_TOKEN>"}'

# Search songs & artists
curl "http://127.0.0.1:8000/api/search/?query=love&genre=1"

# Toggle favorite
curl -X POST http://127.0.0.1:8000/api/songs/1/favorite/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>"

# Create album
curl -X POST http://127.0.0.1:8000/api/albums/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"My Playlist"}'

# Add song to album
curl -X POST http://127.0.0.1:8000/api/albums/1/songs/2/ \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"album_id":1}'
```

## 📝 Notes
Media (images, audio files) are saved at: `source/media/`.

<div align="center">
    <br />
    <svg width="100%" height="10" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#092e20;stop-opacity:1" /> <stop offset="100%" style="stop-color:#3776ab;stop-opacity:1" /> </linearGradient>
        </defs>
        <rect width="100%" height="4" fill="url(#grad1)" rx="2" />
    </svg>
    <br />
    <p align="center">
        <img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge" />
        <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white" />
        <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
        <img src="https://img.shields.io/badge/Django_Rest_Framework-092E20?style=for-the-badge&logo=django&logoColor=white" />
        <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
    </p>
    <p>
        💻 Developed by <strong style="color: #3776ab;">Phạm Quốc Tuấn</strong> ❤️<br/>
        🎓 <strong>IT - Saigon University (SGU)</strong>
    </p>
    <p>
        <a href="https://github.com/quoctuan-IT">
            <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
        </a>
    </p>
    <p style="color: #888; font-size: 0.85rem;">
        &copy; 2026 Music Streaming Project. All rights reserved.
    </p>
</div>