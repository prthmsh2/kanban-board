import React from 'react';
import './Card.css'; 
import highIcon from '../logos/highIcon.png'
import mediumIcon from '../logos/mediumIcon.png'
import noPriorityIcon from '../logos/noPriorityIcon.png'
import urgentIcon from '../logos/urgentIcon.png'
import lowIcon from '../logos/lowIcon.png'
import CancelledIcon from '../logos/CancelledIcon.png'
import BacklogIcon from '../logos/BacklogIcon.png'
import DoneIcon from '../logos/DoneIcon.png'
import InProgressIcon from '../logos/InProgressIcon.png'
import TodoIcon from '../logos/TodoIcon.png'
import RameshIcon from '../logos/RameshIcon.png'
import SureshIcon from '../logos/SureshIcon.png'
import ShankarIcon from '../logos/ShankarIcon.png'
import AnoopIcon from '../logos/AnoopIcon.png'
import YogeshIcon from '../logos/YogeshIcon.png'
import {MoreHorizontal } from 'react-feather';

const Card = ({ data, user, groupingBy, groupName }) => {
  const initials = user
  ? user.name
      .split(' ')
      .map((name) => name[0].toUpperCase())
      .join('')
  : 'NA';

  const priorityIcons = {
    'No Priority': noPriorityIcon,
    'Urgent': urgentIcon,
    'High': highIcon,
    'Medium': mediumIcon,
    'Low': lowIcon
  };
  
  const statusIcons={
    'Canceled' : CancelledIcon,
    'Done': DoneIcon,
    'Backlog': BacklogIcon,
    'In progress': InProgressIcon,
    'Todo': TodoIcon
  }
  
  const userIcons={
    'Anoop sharma':AnoopIcon,
    'Yogesh':YogeshIcon,
    'Shankar Kumar':ShankarIcon,
    'Ramesh':RameshIcon,
    'Suresh':SureshIcon,
  } 

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{data.id}</span>
        {groupingBy === 'priority' && <div className="card-user-initials">
          {initials}
        </div>}
        {groupingBy === 'status' && <div className="card-user-initials">
          {initials}
        </div>}
        
      </div>
      <div className='card-content'>
        <div className='one'>
          {groupingBy === 'user' && <img src={statusIcons[data.status]} alt={`${user.name} icon`} />}
          {groupingBy === 'priority' && <img src={statusIcons[data.status]} alt={`${user.name} icon`} />}
        </div>

        <span className="card-title">{data.title}</span>
      </div>
      <div className='card-footer'>
        {groupingBy === 'user' && <MoreHorizontal className='morehorizontal'/>}
          {groupingBy === 'status' && <MoreHorizontal className='morehorizontal'/>}
        
        <img src='https://upload.wikimedia.org/wikipedia/commons/9/98/Location_dot_lightgrey.svg' className='dot-icon'/>
        {/* {groupingBy === 'user' && <img  src={userIcons[groupName]} alt={`${groupName} icon`} />}
        {groupingBy === 'priority' && <img  src={priorityIcons[groupName]} alt={`${groupName} icon`} />}
        {groupingBy === 'status' && <img  src={statusIcons[groupName]} alt={`${groupName} icon` }/>} */}

        <div className="card-tag">{data.tag[0]}</div>
      </div>
    </div>
  );
};

export default Card;
