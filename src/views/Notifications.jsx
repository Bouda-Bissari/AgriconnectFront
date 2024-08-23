import  { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '@/configs/axiosClient';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axiosClient.get('/notifications')
            .then(response => setNotifications(response.data))
            .catch(error => console.error('Erreur lors du chargement des notifications', error));
    }, []);

    const markAsRead = (id) => {
        axiosClient.post(`/notifications/${id}/markAsRead`)
            .then(() => {
                setNotifications(notifications.map(notification =>
                    notification.id === id ? { ...notification, read_at: new Date() } : notification
                ));
            })
            .catch(error => console.error('Erreur lors de la mise à jour de la notification', error));
    };

    const deleteNotification = (id) => {
        axios.delete(`/api/notifications/${id}`)
            .then(() => {
                setNotifications(notifications.filter(notification => notification.id !== id));
            })
            .catch(error => console.error('Erreur lors de la suppression de la notification', error));
    };

    return (
        <div>
            <h2>Notifications</h2>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id} style={{ backgroundColor: notification.read_at ? '#f4f4f4' : '#ffffff' }}>
                        <p>{notification.data.body}</p>
                        <button onClick={() => markAsRead(notification.id)} disabled={!!notification.read_at}>
                            Marquer comme lu
                        </button>
                        <button onClick={() => deleteNotification(notification.id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
