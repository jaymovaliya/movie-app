import React, { memo } from 'react';
import { Button, Modal } from "../../Core-UI";

function DeleteCard(props) {
    const  { isDelete, onClose, onDelete } = props;
    return (
        <div>
            <Modal isOpen={isDelete} onClose={onClose}>
                <div>Are you sure want to delete?</div>
                <div className="delete-btns">
                    <Button text={"Yes"} onClick={onDelete}/>
                    <Button text={"No"} onClick={onClose}/>
                </div>
            </Modal>
        </div>
    );
};

export default memo(DeleteCard);