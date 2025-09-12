import React from 'react';
import '../styles/TaskListView.css'; // New CSS file

const TaskCard = ({ task, teamMembers, activeFilter }) => {
  // Helper to get member avatar and color
  const getMemberInfo = (assigneeName) => {
    const member = teamMembers?.find(m => m.name === assigneeName);
    return {
      avatar: member?.avatar || assigneeName?.charAt(0).toUpperCase() || '?',
      color: member?.color || '#cccccc' // Default color
    };
  };

  const assigneeInfo = getMemberInfo(task.assignedTo);

  // Determine priority tag color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '#ef4444'; // Red
      case 'medium': return '#f59e0b'; // Orange
      case 'low': return '#10b981'; // Green
      default: return '#94a3b8'; // Gray
    }
  };

  const priorityColor = getPriorityColor(task.priority);
  const progress = task.progress || 0; // Assuming task has a progress field, default to 0

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return '#10b981'; // Green
      case 'in progress': return '#f59e0b'; // Orange
      case 'pending': return '#ef4444'; // Red
      default: return '#94a3b8'; // Gray
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className="task-priority-tag" style={{ backgroundColor: priorityColor }}>
          {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
        </span>
        <button className="task-options-btn">⋮</button>
      </div>
      <h4 className="task-title">{task.name}</h4>
      {activeFilter === 'All Task' && task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {(activeFilter === 'All Task' || activeFilter === 'In Progress' || activeFilter === 'Assigned to me') && (
        <>
          <div className="task-progress-bar-container">
            <div className="task-progress-bar" style={{ width: `${progress}%`, backgroundColor: '#3b82f6' }}></div>
          </div>
          <div className="task-progress-text">{progress}% completed</div>
        </>
      )}

      {activeFilter === 'Completed' && (
        <div className="task-completed-info">
          <span className="completed-tag" style={{ backgroundColor: getStatusColor('completed') }}>Completed</span>
          <span className="completed-date">Completed: {task.deadline || 'N/A'}</span>
        </div>
      )}

      <div className="task-footer">
        <div className="task-due-date">
          📅 due: {task.deadline || 'N/A'}
        </div>
        <div className="task-assignee">
          <div className="task-assignee-avatar" style={{ backgroundColor: assigneeInfo.color }}>
            {assigneeInfo.avatar}
          </div>
        </div>
      </div>
      
      {activeFilter === 'All Task' && (
        <div className="task-meta">
          <span className="task-comments">💬 Comment({task.comments || 0})</span>
          <span className="task-attachments">📎 Attachment({task.attachments || 0})</span>
        </div>
      )}

      {activeFilter === 'Assigned to me' && (
        <button className="complete-task-btn">Complete</button>
      )}
    </div>
  );
};

const TaskListView = ({ teams, activeFilter }) => {
  let filteredTasks = [];
  let allTeamMembers = []; // Collect all unique team members

  teams.forEach(team => {
    allTeamMembers = [...allTeamMembers, ...team.members];
    team.tasks?.forEach(task => {
      // Add a default progress if not present, and comments/attachments for demo
      filteredTasks.push({ 
        ...task, 
        teamName: team.name,
        progress: task.progress !== undefined ? task.progress : (task.status === 'completed' ? 100 : (task.status === 'in progress' ? 60 : 0)), // Demo progress
        comments: task.comments !== undefined ? task.comments : 2, // Demo comments
        attachments: task.attachments !== undefined ? task.attachments : 1 // Demo attachments
      });
    });
  });

  // Filter based on activeFilter
  switch (activeFilter) {
    case 'All Task':
      // No additional filtering needed, all tasks are included
      break;
    case 'In Progress':
      filteredTasks = filteredTasks.filter(task => task.status === 'in progress' || task.status === 'pending');
      break;
    case 'Completed':
      filteredTasks = filteredTasks.filter(task => task.status === 'completed');
      break;
    case 'Assigned to me':
      // Assuming 'Rubini' is the current user for demo purposes
      filteredTasks = filteredTasks.filter(task => task.assignedTo === 'Rubini');
      break;
    default:
      break;
  }

  // Sort tasks, e.g., by due date or priority
  filteredTasks.sort((a, b) => {
    if (a.deadline && b.deadline) {
      return new Date(a.deadline) - new Date(b.deadline);
    }
    return 0;
  });

  // Sprint Progress calculation
  const totalTasksInSprint = filteredTasks.length;
  const completedTasksInSprint = filteredTasks.filter(t => t.status === 'completed').length;
  const remainingTasksInSprint = totalTasksInSprint - completedTasksInSprint;
  const sprintProgressPercentage = totalTasksInSprint > 0 ? (completedTasksInSprint / totalTasksInSprint) * 100 : 0;

  return (
    <div className="task-list-view">
      {activeFilter === 'All Task' && teams.length > 0 && ( // Only show sprint progress if teams exist
        <div className="sprint-progress-section">
          <div className="sprint-header">
            <span className="sprint-title">📈 Sprint Progress</span>
            <div className="sprint-stats">
              <span className="stat-item"><strong>{totalTasksInSprint}</strong> Total Task</span>
              <span className="stat-item"><strong>{completedTasksInSprint}</strong> Completed</span>
              <span className="stat-item"><strong>{remainingTasksInSprint}</strong> Remaining</span>
            </div>
          </div>
          <div className="sprint-progress-bar-outer">
            <div className="sprint-progress-bar-inner" 
                 style={{ width: `${sprintProgressPercentage}%` }}>
            </div>
          </div>
          <div className="sprint-dates">
            <span>📅 Start: May 28, 2025</span>
            <span>📅 Deadline: July 9, 2025</span>
          </div>
        </div>
      )}

      {filteredTasks.length === 0 ? (
        <div className="empty-task-list">
          <h3>No tasks {activeFilter === 'All Task' ? '' : activeFilter.toLowerCase()} yet.</h3>
          <p>Start by creating a team and adding some tasks!</p>
        </div>
      ) : (
        <>
          <h3 className="list-view-title">List View</h3>
          <div className="task-cards-grid">
            {filteredTasks.map(task => (
              <TaskCard key={task.id} task={task} teamMembers={allTeamMembers} activeFilter={activeFilter} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskListView;
