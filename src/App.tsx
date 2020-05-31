import React from 'react';
import './App.css';
const App: React.FC = () => {
    React.useEffect(() => {
        fetch('/drones', {
            method: 'GET',
        }).then((res) => {
            if (res.ok) {
                res.json();
                console.log('Server is online');
            } else {
                console.error('Server drop with error');
            }
        });
    }, []);
    return <div className="App">App</div>;
};

export default App;
