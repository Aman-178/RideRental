import { FaBiking, FaEye, FaUserAlt } from 'react-icons/fa';
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
                    <li>
                        <Link to="/bike">
                            <FaBiking />  ADD BIKE!
                        </Link>

                    </li>
                    <li>
                        <Link to="/Showbike">
                            <FaEye />  ShowBike!
                        </Link>
                    </li>
                    <li>
                        <Link to="/Orderpage">
                            <FaEye />  OrderPage!
                        </Link>
                    </li>

                </ul>
            </div>

        </div>

    )
}
