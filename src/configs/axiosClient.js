import axios from 'axios';

// Crée une instance d'axios avec une URL de base
const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    // baseURL: 'http://192.168.3.32:8000/api',

    
});

// Intercepteur de requête pour ajouter le token d'accès aux en-têtes de chaque requête
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Intercepteur de réponse pour gérer les erreurs de réponse
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try {
            const { response } = error;

            if (response) {
                // Gère les erreurs 401 (non autorisé)
                if (response.status === 401) {
                    localStorage.removeItem('ACCESS_TOKEN');
                    // Redirige l'utilisateur vers la page de login
                    // window.location.href = '/login';
                }

                // Gère les erreurs 403 (interdit)
                if (response.status === 403) {
                    console.error('Access denied');
                    // Redirige l'utilisateur vers une page d'accès refusé
                    // window.location.href = '/access-denied';
                }

                // Gère les erreurs 404 (non trouvé)
                if (response.status === 404) {
                    console.error('Resource not found');
                    // Optionnel : Redirige l'utilisateur vers une page 404
                    // window.location.href = '/not-found';
                }

                // Gère les erreurs 500 (erreur interne du serveur)
                if (response.status === 500) {
                    console.error('Server error');
                    // Optionnel : Affiche un message d'erreur
                    // alert('An internal server error occurred. Please try again later.');
                }

                // Gère d'autres erreurs HTTP
                if (response.status >= 400 && response.status < 600) {
                    console.error(`HTTP error ${response.status}: ${response.statusText}`);
                    // Optionnel : Affiche un message d'erreur générique
                    // alert('An error occurred. Please try again.');
                }
            }
        } catch (e) {
            console.error(e);
        }
        throw error;
    }
);

export default axiosClient;
