import React, { useState } from 'react';
import '../styles/ProfilePage.css';

const ProfilePage = () => {
  const [tasks, setTasks] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    role: '',
    dateJoined: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: `Task ${tasks.length + 1}`,
      status: 'pending'
    };
    setTasks([...tasks, newTask]);
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">
          <span className="logo-text">TaskHawk</span>
          <span className="menu-icon">☰</span>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item">
            <span className="nav-icon">🏠</span>
            Dashboard
          </div>
          <div className="nav-item active">
            <span className="nav-icon">📋</span>
            My Task
          </div>
          <div className="nav-item">
            <span className="nav-icon">📅</span>
            Calendar
          </div>
          <div className="nav-item">
            <span className="nav-icon">📊</span>
            Analytics
          </div>
          <div className="nav-item">
            <span className="nav-icon">👥</span>
            Teamwork
          </div>
          <div className="nav-item">
            <span className="nav-icon">🏆</span>
            Leaderboard
          </div>
          <div className="nav-item">
            <span className="nav-icon">🍅</span>
            Pomodoro
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search Task..." className="search-input" />
          </div>
          <div className="header-actions">
            <button className="new-task-btn" onClick={handleAddTask}>
              + New Task
            </button>
            <div className="notification-icon">🔔</div>
            <div className="user-menu">
              <div className="user-avatar-small">👤</div>
              <div className="dropdown-menu">
                <div className="dropdown-item">
                  <span className="dropdown-icon">👤</span>
                  Profile
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">⚙️</span>
                  Settings
                </div>
                <div className="dropdown-item">
                  <span className="dropdown-icon">🚪</span>
                  Logout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-circle">
                <span className="avatar-icon">👤</span>
              </div>
            </div>
            
            <div className="profile-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={userProfile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label>Role</label>
                <input
                  type="text"
                  value={userProfile.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Enter your role"
                />
              </div>
              
              <div className="form-group">
                <label>Date Joined</label>
                <input
                  type="date"
                  value={userProfile.dateJoined}
                  onChange={(e) => handleInputChange('dateJoined', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <button 
                className="edit-btn"
                onClick={isEditing ? handleSaveProfile : handleEditProfile}
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="right-panel">
            {/* User Status */}
            <div className="status-card">
              <h3>User Status</h3>
              <div className="status-items">
                <div className="status-item">
                  <span className="status-label">Completed</span>
                  <span className="status-count">{tasks.filter(t => t.status === 'completed').length}</span>
                </div>
                <div className="status-item">
                  <span className="status-label">In Progress</span>
                  <span className="status-count">{tasks.filter(t => t.status === 'in-progress').length}</span>
                </div>
              </div>
              <div className="status-summary">
                <span>Total</span>
                <span>Streak</span>
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="recent-tasks-card">
              <h3>Recent Task</h3>
              <div className="tasks-list">
                {tasks.length === 0 ? (
                  <div className="no-tasks">
                    <p>No tasks yet. Click "New Task" to get started!</p>
                  </div>
                ) : (
                  tasks.slice(-3).map((task) => (
                    <div key={task.id} className="task-item">
                      <span className="task-title">{task.title}</span>
                      <button className="task-action">View</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
