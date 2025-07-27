import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';
import './SideDrawer.css';

const pages = [
  { name: 'Dashboard', path: '/dashboardscreen' },
  { name: 'Options', path: '/options' },
  { name: 'Chat', path: '/chat' },
  { name: 'Exercise', path: '/exercise' },
  { name: 'Mood', path: '/mood' },
  { name: 'Food', path: '/food' },
  { name: 'Music Player', path: '/musicplayer' },
  { name: 'Questions', path: '/questions' },
  { name: 'Breathing', path: '/breathing' },
  { name: 'Medications', path: '/medications' },
];

const SideDrawer = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ username: '', image: '' });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found');
      setLoading(false);
      return;
    }

    axios.get('http://localhost:5000/api/users/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        setUserData(res.data);
      })
      .catch(err => console.error('Error fetching user data:', err))
      .finally(() => setLoading(false));
  }, []);

  const imageUrl = userData.image
    ? `http://localhost:5000/${userData.image.replace(/\\/g, '/')}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.username || 'User')}`;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <button className="drawer-toggle" onClick={() => setOpen(!open)}>
        &#9776;
      </button>
      <nav className={`side-drawer ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>&times;</button>
        <div className="drawer-user">
          {loading ? (
            <div className="skeleton-avatar" />
          ) : (
            <img
              src={imageUrl}
              alt="User"
              className="drawer-avatar"
              onError={e => { e.target.src = 'https://ui-avatars.com/api/?name=User'; }}
            />
          )}
          <div className="drawer-username">
            {loading ? <div className="skeleton-text" /> : (userData.username || 'Guest')}
          </div>
        </div>
        <ul>
          {pages.map(page => (
            <li key={page.name}>
              <Link
                to={page.path}
                className={location.pathname === page.path ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {page.name}
              </Link>
            </li>
          ))}
          <li>
            <NavLink to="/stress-relief" activeClassName="active">
              🫧 Stress Relief Game
            </NavLink>
          </li>
        </ul>
        <div style={{ padding: 24, borderTop: '1px solid #e0e0e0', background: '#fafafa' }}>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </>
  );
};

export default SideDrawer;
