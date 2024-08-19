import React, { useEffect, useState } from 'react';
import './App.css'; // Импортируем стили

function App() {
    const [greetings, setGreetings] = useState([]);
    const baseUrl = 'http://localhost:8080/sasha/birthday/social/network'; // базовый URL для статических файлов

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.greeting-card');

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0) {
                    section.classList.add('visible');
                }
            });
        };

        const fetchGreetings = async () => {
            const response = await fetch('http://localhost:8080/sasha/birthday/social/network/get');
            const data = await response.json();
            setGreetings(data);
        };

        window.addEventListener('scroll', handleScroll);
        fetchGreetings();

        // Убедитесь, что классы применяются при первой загрузке страницы
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app-container">
            <h1>С днем рождения!</h1>
            <div className="greetings-container">
                {greetings.map((greeting) => (
                    <div className="greeting-card" key={greeting.id}>
                        <h2 className="greeting-name">{greeting.name}</h2>
                        <p className="greeting-message">{greeting.message}</p>
                        <div className="media-container">
                            {greeting.imageUrl && (
                                <img src={`${baseUrl}${greeting.imageUrl}`} alt="Greeting Image" className="greeting-image" />
                            )}
                            {greeting.videoUrl && (
                                <video src={`${baseUrl}${greeting.videoUrl}`} controls className="greeting-video" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
