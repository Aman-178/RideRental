import { FaUserAlt } from 'react-icons/fa';
import './Option.css'
import { Link } from 'react-router-dom';


export const Option = () => {
   
    return (
        <div id='option'>
            <div id="optionList">
                <ul>
                    <li><Link to="/myprofile">
                        
                            
                        <FaUserAlt />  MY Profile!
                        
                    </Link>
                        </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            
        </div>
        
    )
}
