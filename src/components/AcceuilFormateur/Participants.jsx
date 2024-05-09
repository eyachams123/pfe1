import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ShowList from './ShowList';
const Participants = ({ onClose }) => {
    const [isShowListOpen, setIsShowListOpen] = useState(false);

    const toggleShowList = () => {
        setIsShowListOpen(!isShowListOpen);
    };
    const handleCloseShowList = () => {
        setIsShowListOpen(false);
    };
    return (
        <div className="participants-container">

            <CloseIcon style={{ marginLeft: '550px', marginTop: '10px', color: 'red' }} className="close-button" onClick={onClose} /> {/* Close icon */}

            <table>
                <thead>
                    <tr>
                        <th>Training ID</th>
                        <th>Domain of the Training</th>
                        <th>List Of Participants</th>

                    </tr>
                </thead>
                <tbody>
                    {/* Example data */}
                    <tr>
                        <td>Web development</td>
                        <td>Yasmine</td>
                        <td>
                            <button onClick={toggleShowList}>Show List</button>
                            <ShowList isOpen={isShowListOpen} onClose={handleCloseShowList} />
                        </td>
                    </tr>
                    <tr>
                        <td>UI/UX Design</td>
                        <td>Yasmine</td>
                        <td>
                            <button onClick={toggleShowList}>Show List</button>
                        </td>
                    </tr>
                    
                    {/* Add more rows if needed */}
                </tbody>
            </table>

        </div>
    );
}

export default Participants;
