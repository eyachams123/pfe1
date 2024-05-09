import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';


const ShowList = ({ onClose, isOpen }) => {
    return (
        <div className={`show-container ${isOpen ? 'open' : ''}`}>
         <CloseIcon style={{ marginLeft: '450px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} /> {/* Close icon */}

<table style={{marginLeft: '50px'}}>
        <thead>
          <tr>
          <th></th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>1</td>
            <td>John Doe</td>
            <td>john@example.com</td>
          </tr>
          <tr>
          <td>2</td>
            <td>Jane Smith</td>
            <td>jane@example.com</td>
          </tr>
          <tr>
          <td>3</td>
            <td>Alice Johnson</td>
            <td>alice@example.com</td>
          </tr>
          <tr>
          <td>4</td>
            <td>Yasmine Douik</td>
            <td>yasminedouik@example.com</td>
          </tr>
          <tr>
          <td>5</td>
            <td>Eya Yaacoub</td>
            <td>eyayaacoub@example.com</td>
          </tr>
          {/* Add more rows for additional participants */}
        </tbody>
      </table>
           
        </div>
    );
}

export default ShowList;
