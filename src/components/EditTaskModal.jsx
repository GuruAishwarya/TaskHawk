import React, { useState, useEffect } from 'react';
import '../styles/EditTaskModal.css';

const EditTaskModal = ({ isOpen, onClose, taskData, teamMembers, onTaskUpdated }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [status, setStatus] = useState('Pending');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (taskData) {
        setTaskTitle(taskData.name || '');
        setPriority(taskData.priority || 'High');
        setStatus(taskData.status ? taskData.status.charAt(0).toUpperCase() + taskData.status.slice(1) : 'Pending');
        setAssignedTo(taskData.assignedTo || '');
        setDueDate(taskData.deadline || '');
      } else {
        // Reset to empty values for new task or if no taskData
        setTaskTitle('');
        setPriority('High');
        setStatus('Pending');
        setAssignedTo('');
        setDueDate('');
      }
    }
  }, [isOpen, taskData]);

  const handleSave = () => {
    const updatedTask = {
      ...(taskData || {}),
      id: taskData?.id || Date.now(),
      name: taskTitle,
      priority: priority,
      status: status.toLowerCase(),
      assignedTo: assignedTo,
      deadline: dueDate,
      updatedAt: new Date().toISOString()
    };

    if (onTaskUpdated) {
      onTaskUpdated(updatedTask);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>
        <div className="edit-modal-header">
          <h3>Edit Task</h3>
          <button className="edit-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="edit-modal-content">
          <div className="edit-form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              className="edit-task-input"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder=""
            />
          </div>

          <div className="edit-form-row">
            <div className="edit-form-group half">
              <label>Priority</label>
              <div className="edit-select-wrapper">
                <select 
                  className={`edit-select priority ${priority.toLowerCase()}`}
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <div className="edit-select-arrow">▼</div>
              </div>
            </div>
            
            <div className="edit-form-group half">
              <label>Status</label>
              <div className="edit-select-wrapper">
                <select 
                  className="edit-select status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
                <div className="edit-select-arrow">▼</div>
              </div>
            </div>
          </div>

          <div className="edit-form-group">
            <label>Assigned to</label>
            <div className="edit-select-wrapper">
              <select 
                className="edit-select assigned"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              >
                <option value="">Select assignee</option>
                {/* Dynamically populate from teamMembers prop */}
                {teamMembers && teamMembers.map((member, index) => (
                  <option key={index} value={member.name}>
                    {member.name}
                  </option>
                ))}
              </select>
              <div className="edit-select-arrow">▼</div>
            </div>
          </div>

          <div className="edit-form-group">
            <label>Due Date</label>
            <div className="edit-date-wrapper">
              <input 
                type="date" 
                className="edit-date-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <div className="edit-date-icon">📅</div>
            </div>
          </div>

          <div className="edit-modal-actions">
            <button className="edit-cancel-btn" onClick={handleCancel}>Cancel</button>
            <button className="edit-save-btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
