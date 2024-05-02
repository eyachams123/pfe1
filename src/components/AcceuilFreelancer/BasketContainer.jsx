import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete'; // Import DeleteIcon from Material UI
import { Link } from 'react-router-dom';

const BasketContainer = () => {
    return (
        <div className="basket-container">
            <br/>
            <h3>My Basket</h3>
            <table>
                <thead>
                    <tr>
                        <th>Training Name</th>
                        <th>Start Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example data */}
                    <tr>
                        <td>Web developement</td>
                        <td>2024-04-27</td>
                        <td>
                            <Link to="/pay"><button>Payer</button></Link>
                            <DeleteIcon /> {/* Replace Delete button with DeleteIcon */}
                        </td>
                    </tr>
                    <tr>
                        <td>UI/UX Design</td>
                        <td>2024-04-28</td>
                        <td>
                        <Link to="/pay"><button>Payer</button></Link>
                            <DeleteIcon /> {/* Replace Delete button with DeleteIcon */}
                        </td>
                    </tr>
                    {/* Add more rows if needed */}
                </tbody>
            </table>
        </div>
    );
}

export default BasketContainer;
