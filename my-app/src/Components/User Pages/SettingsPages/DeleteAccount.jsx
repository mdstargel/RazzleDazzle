import React from "react";
import '../styles.css'
import PageTitle from "../PageTitle";
import CancelButton from "../../Buttons/CancelButton";
import ConfirmButton from "../../Buttons/ConfirmButton";

const DeleteAccount = ({ setwpage, setSignedIn }) => {
    const handleDeleteAccount = () => {
        /**
         * Send information to Backend to delete account information
         */
        setwpage('About Us')
        setSignedIn(false)
        
    }
    return (
        <>
        <PageTitle name="Delete Account" />
        <div className="form">
                <div>This action cannot be undone!
                    If you press the delete button your account will be permanently
                    deleted. Please only delete your account if you are sure that you
                    will not need it in the future.
                </div>
                <ConfirmButton buttonText='Delete' onClick={handleDeleteAccount}/>
                <CancelButton onClick={() => setwpage('Calendar')}/>
        </div>
        </>
    );
}

export default DeleteAccount;