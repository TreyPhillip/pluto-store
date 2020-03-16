import React from 'react';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

const Notification = (props) => {
    return (
        <div>
            <Toast className="loginSuccess">
                <ToastHeader icon="success">
                    Login Successful!
                </ToastHeader>
                <ToastBody>
                    Welcome {this.state.email}!
                </ToastBody>
            </Toast>
            <Toast className="loginFailed">
                <ToastHeader  icon="danger">
                    Login Failed!
                </ToastHeader>
                <ToastBody>
                    Username or Password is incorrect!
                </ToastBody>
            </Toast>
        </div>
    )
}

export default Notification;