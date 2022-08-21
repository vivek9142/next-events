import { createContext,useState } from "react";

const NotificationContext = createContext({
    notification: null,
    showNotification: function(notificationData){},
    hideNotification:function(){}
});


export function NotificationContextProvider(props){
    const [activeNotification,setActiveShowNotification] = useState();

    function showNotificationHandler(notificationData){
        setActiveShowNotification(notificationData)
    }

    function hideNotificationHandler(){
        setActiveShowNotification(null)
    }

    const context = { 
        notification: activeNotification,
        showNotification:showNotificationHandler,
        hideNotification:hideNotificationHandler
    }

    return (
        <NotificationContext.Provider value={context}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext;