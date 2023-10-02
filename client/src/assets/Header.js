import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuestionCircle,
    faExclamationCircle,
    faCog,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

import { DataContext } from "../routes/CreateRoom";
import { useContext } from "react";


function Header(){

    
    const prof= useContext(DataContext);

    return (
       
        <div className="header">
            <div className="logo">
                <img className="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Google_Meet_text_logo_%282020%29.svg/1024px-Google_Meet_text_logo_%282020%29.svg.png" alt="" />
                <span className="text"> Clone</span>
            </div>
            <div className="act-btn">
                
                {(prof)?(
                    <div>
                    {/* <img className="user-img" src={prof.picture}  /> */}
                    <p>{prof.name}</p>
                    </div>
                ):(<div>
                    
                </div>)}
                <FontAwesomeIcon className="icons" icon={faQuestionCircle} />
                <FontAwesomeIcon className="icons" icon={faExclamationCircle} />
                <FontAwesomeIcon className="icons" icon={faCog} />
                <FontAwesomeIcon className="icons" icon={faUser} />

                
            </div></div>

    )
}
export default Header;