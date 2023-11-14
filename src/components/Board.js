import React, { useState, useEffect } from 'react';
import Card from './Card'; 
import './Board.css'; 
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
import { MoreHorizontal, Plus} from 'react-feather';

const priorityNames = {
  '0': 'No Priority',
  '1': 'Low',
  '2': 'Medium',
  '3': 'High',
  '4': 'Urgent'
};


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


const Board = ({ groupingBy, orderBy }) => {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        setCards(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error("Could not fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const getGroupName = (card, groupingBy) => {
    if (groupingBy === 'priority') {
      return priorityNames[card.priority.toString()] || 'Unknown Priority';
    } else if (groupingBy === 'user') {
      const user = users.find(u => u.id === card.userId);
      return user ? user.name : 'Unknown User';
    } else {
      return card[groupingBy] || 'None';
    }
  };

  const groupCards = () => {
    let groupMap = {};

    if (groupingBy === 'status') {
      groupMap = {
        'Backlog': [],
        'Todo': [],
        'In progress': [],
        'Done': [],
        'Canceled': [],
      };
    } else {
      groupMap = {};
    }

    cards.forEach(card => {
      const groupName = getGroupName(card, groupingBy);
      if (!groupMap[groupName]) {
        groupMap[groupName] = [];
      }
      groupMap[groupName].push(card);
    });

    return groupMap;
  };

  const sortGroupedCards = (groupedCards) => {
    for (let group in groupedCards) {
      groupedCards[group].sort((a, b) => {
        if (orderBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return b.priority - a.priority; 
      });
    }
  };

  const groupedCards = groupCards();
  sortGroupedCards(groupedCards);

  const sortedGroupNames = Object.keys(groupedCards).sort((a, b) => {
    if (a === 'No Priority') return -1;
    if (b === 'No Priority') return 1;
    return 0;
  });
  
  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="board">
      {sortedGroupNames.map(groupName => (
        <div key={groupName} className="column">
          <div className='group-header-priority'>
            {groupingBy === 'user' && <img  src={userIcons[groupName]} alt={`${groupName} icon`} />}
            {groupingBy === 'priority' && <img  src={priorityIcons[groupName]} alt={`${groupName} icon`} />}
            {groupingBy === 'status' && <img  src={statusIcons[groupName]} alt={`${groupName} icon` }/>}
            <h4><span>{groupName} </span><span className='group-length'>{groupedCards[groupName].length}</span></h4>
            <div className='group-header-priority-logos'>
              <Plus/>
              <MoreHorizontal/>
            </div>
          </div>
          {groupedCards[groupName].map(card => (
            <Card key={card.id} data={card} user={getUserById(card.userId)} groupingBy={groupingBy} userIcons={userIcons} priorityIcons={priorityIcons} statusIcons={statusIcons} groupName={groupName}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
