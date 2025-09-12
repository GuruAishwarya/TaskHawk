import React, { useState } from 'react';
import '../styles/ViewTeamModal.css';
import EditTaskModal from './EditTaskModal';

const ViewTeamModal = ({ isOpen, onClose, teamData, hasTeams, onTeamUpdated }) => {
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  if (!isOpen) return null;

  // If no teams created yet
  if (!hasTeams || !teamData) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="view-team-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>View Team</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-content">
            <div className="no-team-state">
              <div className="no-team-icon">👥</div>
              <h4>No Teams Created Yet</h4>
              <p>Create your first team to get started with collaborative task management.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics based on tasks
  const calculateStats = (team) => {
    const tasks = team.tasks || [];
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.status === 'completed').length;
    const remainingTasks = totalTasks - completedTasks;
    const efficiency = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalTasks,
      completed: completedTasks,
      remaining: remainingTasks,
      efficiency
    };
  };

  const stats = calculateStats(teamData);

  const handleEditTask = () => {
    // Get the first task if exists, otherwise pass null for new task
    // You might want to pass a specific task if you implement a list of tasks in ViewTeamModal
    const taskToEdit = teamData.tasks && teamData.tasks.length > 0 ? teamData.tasks[0] : null;
    setCurrentTask(taskToEdit);
    setShowEditTaskModal(true);
  };

  const handleTaskUpdated = (updatedTask) => {
    // Update the team data with the updated task
    const updatedTeam = { ...teamData };
    
    if (updatedTeam.tasks) {
      // Find and update existing task
      const taskIndex = updatedTeam.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex >= 0) {
        updatedTeam.tasks[taskIndex] = updatedTask;
      } else {
        // Add new task if not found (e.g., if EditTaskModal was opened for a new task)
        updatedTeam.tasks.push(updatedTask);
      }
    } else {
      // Create tasks array if it doesn't exist
      updatedTeam.tasks = [updatedTask];
    }

    // Call parent update function (from Teamwork.jsx) to update the main teams state
    if (onTeamUpdated) {
      onTeamUpdated(updatedTeam);
    }

    setShowEditTaskModal(false);
    setCurrentTask(null);
  };

  const handleCloseEditModal = () => {
    setShowEditTaskModal(false);
    setCurrentTask(null);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="view-team-modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{teamData.name}</h3>
            <button className="close-btn" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-content">
            <div className="team-members-section">
              <h4>Team Members({teamData.members?.length || 0})</h4>
              <div className="members-container">
                {teamData.members?.map((member, index) => (
                  <div key={index} className="member-item">
                    <div className="member-left">
                      <div className="member-avatar" style={{ backgroundColor: member.color || '#3498db' }}>
                        {member.avatar || member.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="member-info">
                        <div className="member-name">{member.name}</div>
                        <div className="member-role-tag">{member.role}</div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <div className="no-members">No members added yet</div>
                )}
              </div>
            </div>

            <div className="team-details-section">
              <h4>Team Description</h4>
              <p className="team-description">
                {teamData.description || "No description provided for this team."}
              </p>
            </div>

            <div className="team-statistics">
              <h4>Team Statistics</h4>
              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-number blue">{stats.totalTasks}</div>
                  <div className="stat-label">Total Tasks</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number blue">{stats.completed}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-item">
                  <div className="stat-number blue">{stats.remaining}</div>
                  <div className="stat-label">Remaining</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number blue">{stats.efficiency}%</div>
                  <div className="stat-label">Efficiency</div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="close-modal-btn" onClick={onClose}>Close</button>
              <button className="edit-task-btn" onClick={handleEditTask}>✏️ Edit Task</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Task Modal */}
      <EditTaskModal 
        isOpen={showEditTaskModal}
        onClose={handleCloseEditModal}
        taskData={currentTask}
        teamMembers={teamData.members}
        onTaskUpdated={handleTaskUpdated} 
      />
    </>
  );
};

export default ViewTeamModal;
