import React, { useState, useEffect } from 'react';
import '../styles/CreateTeamModal.css';

const CreateTeamModal = ({ isOpen, onClose, onTeamCreated, creatorName }) => { // Accept creatorName prop
  const [teamName, setTeamName] = useState('');
  const [teamDescription, setTeamDescription] = useState('');
  
  const [membersList, setMembersList] = useState([]); 
  
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Member');

  const [currentTaskName, setCurrentTaskName] = useState('');
  const [currentTaskDescription, setCurrentTaskDescription] = useState('');
  const [currentAssignedTo, setCurrentAssignedTo] = useState('');
  const [currentPriority, setCurrentPriority] = useState('High');
  const [currentDeadline, setCurrentDeadline] = useState('');

  const [tasksList, setTasksList] = useState([]);

  // Reset form fields and auto-add creator when modal opens
  useEffect(() => {
    if (isOpen) {
      setTeamName('');
      setTeamDescription('');
      setMembersList([]); 
      setNewMemberEmail('');
      setNewMemberRole('Member');
      setCurrentTaskName('');
      setCurrentTaskDescription('');
      setCurrentAssignedTo('');
      setCurrentPriority('High');
      setCurrentDeadline('');
      setTasksList([]);

      // Auto-add creator as admin if creatorName is provided
      if (creatorName) {
        setMembersList([{
          email: `${creatorName.replace(/\s/g, '').toLowerCase()}@example.com`, // Generate email from name
          role: 'Admin',
          name: creatorName,
          avatar: creatorName.charAt(0).toUpperCase(),
          color: generateRandomColor() // Assign a random color
        }]);
      }
    }
  }, [isOpen, creatorName]); // Depend on isOpen and creatorName

  const generateRandomColor = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleAddMemberClick = () => {
    if (newMemberEmail.trim()) {
      setMembersList(prevMembers => [...prevMembers, {
        email: newMemberEmail.trim(),
        role: newMemberRole,
        name: newMemberEmail.trim().split('@')[0],
        avatar: newMemberEmail.trim().charAt(0).toUpperCase(),
        color: generateRandomColor()
      }]);
      setNewMemberEmail('');
      setNewMemberRole('Member');
    } else {
      alert('Please enter an email address for the new team member.');
    }
  };

  const handleRemoveMember = (indexToRemove) => {
    setMembersList(prevMembers => prevMembers.filter((_, index) => index !== indexToRemove));
  };

  const handleAddCurrentTask = () => {
    if (currentTaskName.trim()) {
      setTasksList(prevTasks => [...prevTasks, {
        id: Date.now() + Math.random(),
        name: currentTaskName.trim(),
        description: currentTaskDescription.trim(),
        assignedTo: currentAssignedTo.trim(),
        priority: currentPriority,
        deadline: currentDeadline.trim(),
        status: 'pending',
        createdAt: new Date().toISOString()
      }]);
      setCurrentTaskName('');
      setCurrentTaskDescription('');
      setCurrentAssignedTo('');
      setCurrentPriority('High');
      setCurrentDeadline('');
    } else {
      alert('Please enter a task name.');
    }
  };

  const handleRemoveTask = (idToRemove) => {
    setTasksList(prevTasks => prevTasks.filter(task => task.id !== idToRemove));
  };

  const handleSubmit = () => {
    if (!teamName.trim()) {
      alert('Please enter a team name');
      return;
    }

    let finalMembers = [...membersList];
    if (newMemberEmail.trim()) {
      finalMembers.push({
        email: newMemberEmail.trim(),
        role: newMemberRole,
        name: newMemberEmail.trim().split('@')[0],
        avatar: newMemberEmail.trim().charAt(0).toUpperCase(),
        color: generateRandomColor()
      });
    }

    let finalTasks = [...tasksList];
    if (currentTaskName.trim()) {
        finalTasks.push({
            id: Date.now() + Math.random(),
            name: currentTaskName.trim(),
            description: currentTaskDescription.trim(),
            assignedTo: currentAssignedTo.trim(),
            priority: currentPriority,
            deadline: currentDeadline.trim(),
            status: 'pending',
            createdAt: new Date().toISOString()
        });
    }

    const newTeam = {
      id: Date.now(),
      name: teamName,
      description: teamDescription,
      members: finalMembers,
      tasks: finalTasks,
      createdAt: new Date().toISOString()
    };

    if (onTeamCreated) {
      onTeamCreated(newTeam);
    }

    onClose();
  };

  if (!isOpen) return null;

  const availableAssignees = membersList.map(member => member.name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-team-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Create Team</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-content">
          <div className="form-group">
            <label>Team Name</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="project 1" 
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Team Description</label>
            <textarea 
              className="form-textarea" 
              placeholder="Enter team description"
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Team Member</label>
            {/* Input row for adding a new member */}
            <div className="member-input-row">
              <input 
                type="email" 
                placeholder="E-mail Address"
                className="member-email-input"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
              <select 
                className="member-role-select"
                value={newMemberRole}
                onChange={(e) => setNewMemberRole(e.target.value)}
              >
                <option value="Member">Member</option>
                <option value="Admin">Admin</option>
              </select>
              <button className="add-member-btn" onClick={handleAddMemberClick}>Add</button>
            </div>

            {/* Display already added members */}
            {membersList.map((member, index) => (
              <div key={index} className="added-member-row">
                <span className="added-member-name">{member.name} ({member.email})</span> {/* Display name and email */}
                <span className="added-member-role">{member.role}</span>
                <button className="remove-member-btn" onClick={() => handleRemoveMember(index)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="task-section">
            <div className="task-header">
              <span>Task</span>
              <button className="add-task-to-list-btn" onClick={handleAddCurrentTask}>Add Task</button>
            </div>
            
            {/* Current Task Input Form */}
            <div className="task-form">
              <div className="task-row">
                <label>Task Name</label>
                <input 
                  type="text" 
                  placeholder="" 
                  className="task-input"
                  value={currentTaskName}
                  onChange={(e) => setCurrentTaskName(e.target.value)}
                />
              </div>
              <div className="task-row">
                <label>Task Description</label>
                <textarea 
                  placeholder="" 
                  className="task-textarea"
                  value={currentTaskDescription}
                  onChange={(e) => setCurrentTaskDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="task-row-inline">
                <div className="task-field">
                  <label>Assigned To</label>
                  <select 
                    className="task-select"
                    value={currentAssignedTo}
                    onChange={(e) => setCurrentAssignedTo(e.target.value)}
                  >
                    <option value="">Select Assignee</option>
                    {availableAssignees.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                <div className="task-field">
                  <label>Priority</label>
                  <select 
                    className="task-select"
                    value={currentPriority}
                    onChange={(e) => setCurrentPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="task-row-inline">
                <div className="task-field">
                  <label>Deadline</label>
                  <input 
                    type="date" 
                    className="task-input-small"
                    value={currentDeadline}
                    onChange={(e) => setCurrentDeadline(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Display list of added tasks */}
            {tasksList.length > 0 && (
              <div className="added-tasks-list">
                {tasksList.map(task => (
                  <div key={task.id} className="added-task-item">
                    <span className="added-task-name">{task.name}</span>
                    <span className="added-task-assignee">{task.assignedTo || 'Unassigned'}</span>
                    <button className="remove-task-btn" onClick={() => handleRemoveTask(task.id)}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button className="create-btn" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeamModal;
