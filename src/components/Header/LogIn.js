import React, { memo, useCallback, useState } from 'react';
import { Button, Modal } from "../../Core-UI";
import "./styles.scss";

function LogIn(props){
    const { login, onClose, doLogIn } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogIn = useCallback(()=>{
        doLogIn(username, password);
    },[username, password, doLogIn])

    return (
        <div>
            <Modal isOpen={login} onClose={onClose}>
                    <div className="login-modal">
                        <div className="login-header">Welcome User</div>
                        <div className="form-label">
                            Username
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-label">
                            Password
                        </div>
                        <div className="header-search">
                            <input
                                className="header-search-input"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-button">
                            <Button text={"LogIn"} onClick={handleLogIn}/>
                        </div>
                    </div>
            </Modal>
        </div>
    );
};

export default LogIn;