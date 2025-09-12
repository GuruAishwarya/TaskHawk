import React, { useState } from 'react';
import '../styles/Teamwork.css';
import CreateTeamModal from '../components/CreateTeamModal';
import ViewTeamModal from '../components/ViewTeamModal';
import TaskListView from '../components/TaskListView'; // Import the new component

const Teamwork = () => {
  const [activeFilter, setActiveFilter] = useState('All Task');
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showViewTeamModal, setShowViewTeamModal] = useState(false);
  const [teams, setTeams] = useState([]); // Store created teams
  const [currentTeam, setCurrentTeam] = useState(null); // Currently selected team

  // Extract user's name from about_me context
  // This should come from your <about_me> context.
  // For demonstration, I'm hardcoding it. Please replace this with actual extraction if needed.
  const creatorName = "Rubini"; 

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const handleAddTeam = () => {
    setShowCreateTeamModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateTeamModal(false);
  };

  const handleCreateTeam = () => {
    setShowCreateTeamModal(true);
  };

  const handleViewTeam = () => {
    if (teams.length > 0) {
      setCurrentTeam(teams[0]); // Show first team by default if multiple
    }
    setShowViewTeamModal(true);
  };

  const handleCloseViewModal = () => {
    setShowViewTeamModal(false);
    setCurrentTeam(null);
  };

  const handleTeamCreated = (newTeam) => {
    console.log('New team created:', newTeam);
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setShowCreateTeamModal(false);
  };

  const handleTeamClick = (team) => {
    setCurrentTeam(team);
    setShowViewTeamModal(true);
  };

  // Function to update a team (e.g., when a task is edited in EditTaskModal)
  const handleUpdateTeam = (updatedTeam) => {
    setTeams(prevTeams => 
      prevTeams.map(team => (team.id === updatedTeam.id ? updatedTeam : team))
    );
    // Also update the currentTeam if it's the one being viewed
    if (currentTeam && currentTeam.id === updatedTeam.id) {
      setCurrentTeam(updatedTeam);
    }
  };

  // Team card colors matching Figma
  const teamCardColors = [
    { bg: '#8b5cf6' }, // Purple
    { bg: '#ef4444' }, // Red  
    { bg: '#f59e0b' }, // Orange
    { bg: '#10b981' }, // Green
    { bg: '#3b82f6' }  // Blue
  ];

  return (
    <div className="teamwork-container">
      <div className="layout">
        {/* Top Navigation Bar */}
        <nav className="top-navbar">
          <div className="nav-left">
            <div className="logo">
              <span className="logo-icon">🦅</span>
              <span className="logo-text">TaskHawk</span>
            </div>
            <div className="search-container">
              <input type="text" placeholder="🔍 Search Task..." className="search-input" />
            </div>
          </div>
          <div className="nav-right">
            <button className="new-task-btn">+ New Task</button>
            <div className="notification-icon">🔔</div>
            <div className="profile-icon">👤</div>
          </div>
        </nav>

        <div className="main-layout">
          {/* Left Sidebar */}
          <div className="sidebar">
            <div className="sidebar-item">
              <span className="sidebar-icon">🏠</span>
              <span>Dashboard</span>
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">📋</span>
              <span>My Task</span>
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">📅</span>
              <span>Calendar</span>
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">📊</span>
              <span>Analytics</span>
            </div>
            <div className="sidebar-item active">
              <span className="sidebar-icon">👥</span>
              <span>Teamwork</span>
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">🏆</span>
              <span>Leaderboard</span>
            </div>
            <div className="sidebar-item">
              <span className="sidebar-icon">🍅</span>
              <span>Pomodoro</span>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="main-content">
            {/* Header Section */}
            <div className="content-header">
              <h1>Team Task</h1>
              <div className="header-buttons">
                <button className="view-team-btn" onClick={handleViewTeam}>👁️ view team</button>
                <button className="create-team-btn" onClick={handleCreateTeam}>+ create Team</button>
              </div>
            </div>

            {/* Teams Grid */}
            <div className="figma-teams-grid">
              {/* Show created teams first */}
              {teams.map((team, index) => {
                const colorScheme = teamCardColors[index % teamCardColors.length];
                return (
                  <div 
                    key={team.id || index} 
                    className={`figma-team-card ${currentTeam?.id === team.id ? 'active-team-card' : ''}`}
                    onClick={() => handleTeamClick(team)}
                  >
                    <div className="figma-team-icon">
                      <div className="figma-icon-circle" style={{ backgroundColor: colorScheme.bg }}>
                        👥
                      </div>
                    </div>
                    <div className="figma-team-info">
                      <div className="figma-team-name">{team.name}</div>
                      <div className="figma-team-members">{team.members?.length || 0} members</div>
                    </div>
                  </div>
                );
              })}

              {/* Add Team Card - Always last */}
              <div className="figma-add-team-card" onClick={handleAddTeam}>
                <div className="figma-add-icon">
                  <div className="figma-plus-circle">
                    +
                  </div>
                </div>
                <div className="figma-add-info">
                  <div className="figma-add-title">Add Team</div>
                  <div className="figma-add-subtitle">Create New</div>
                </div>
              </div>
            </div>

            {/* Filter Navigation */}
            <div className="filter-nav">
              <button 
                className={`filter-btn ${activeFilter === 'All Task' ? 'active' : ''}`}
                onClick={() => handleFilterClick('All Task')}
              >
                All Task
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'In Progress' ? 'active' : ''}`}
                onClick={() => handleFilterClick('In Progress')}
              >
                In Progress
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Completed' ? 'active' : ''}`}
                onClick={() => handleFilterClick('Completed')}
              >
                Completed
              </button>
              <button 
                className={`filter-btn ${activeFilter === 'Assigned to me' ? 'active' : ''}`}
                onClick={() => handleFilterClick('Assigned to me')}
              >
                Assigned to me
              </button>
            </div>

            {/* Conditional rendering of TaskListView or Welcome Section */}
            {teams.length === 0 ? (
              <div className="welcome-section">
                <h2>Welcome to TeamWork</h2>
                <p>Create your first team to get started with collaborative task management.</p>
              </div>
            ) : (
              <TaskListView teams={teams} activeFilter={activeFilter} />
            )}
          </div>
        </div>

        {/* Create Team Modal Component */}
        <CreateTeamModal 
          isOpen={showCreateTeamModal} 
          onClose={handleCloseCreateModal}
          onTeamCreated={handleTeamCreated}
          creatorName={creatorName} 
        />

        {/* View Team Modal Component */}
        <ViewTeamModal 
          isOpen={showViewTeamModal} 
          onClose={handleCloseViewModal}
          teamData={currentTeam}
          hasTeams={teams.length > 0}
          onTeamUpdated={handleUpdateTeam}
        />
      </div>
    </div>
  );
};

export default Teamwork;
