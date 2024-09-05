import { useState, useEffect } from 'react';
import axiosClient from '@/configs/axiosClient';
import Loading from '@/components/Loading';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true); // Set to true initially

    useEffect(() => {
        setLoading(true);
        axiosClient.get('/notifications')
            .then(response => {
                setNotifications(response.data);
            })
            .catch(error => console.error('Erreur lors du chargement des notifications', error))
            .finally(() => setLoading(false)); // Set loading to false after request completes
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
        axiosClient.delete(`/notifications/${id}`)
            .then(() => {
                setNotifications(notifications.filter(notification => notification.id !== id));
            })
            .catch(error => console.error('Erreur lors de la suppression de la notification', error));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loading /> 
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Notifications</h2>
            <ul className="space-y-4">
                {notifications.map(notification => (
                    <li 
                        key={notification.id} 
                        className={`p-4 rounded-lg shadow-lg ${notification.read_at ? 'bg-gray-200' : 'bg-white'} flex justify-between items-center`}
                    >
                        <div className="flex-1">
                            <p className="text-gray-700">{notification.data.body}</p>
                            <span className="text-sm text-gray-500">
                                {notification.read_at ? 'Lu' : 'Non lu'}
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <button 
                                onClick={() => markAsRead(notification.id)} 
                                disabled={!!notification.read_at}
                                className={`px-4 py-2 text-sm font-medium text-white rounded-md ${notification.read_at ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
                            >
                                Marquer comme lu
                            </button>
                            <button 
                                onClick={() => deleteNotification(notification.id)} 
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500"
                            >
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
