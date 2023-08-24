import { useState } from "react";
import axios from "axios";
import styles from '../styles/Auth.module.css';

function Auth() {
    const [query, setQuery] = useState("");
    const [film, setFilm] = useState("");

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        const query = event.target.value;
        setQuery(query);
        const response = await axios.get(`http://localhost:5000/films/${query}`);
        console.log(response.data)
        setFilm(response.data);
    }

    return (
        <div className={styles.container}>
            <h1>Auth</h1>
            <input onChange={handleChange} className={styles.input} type="text" value={query} />
            {film &&
                <video controls width="640" height="360">
                    <source src={film} type="video/mp4" />
                </video>
            }
            <a href="/home">Home</a>
        </div>
    )
}

export default Auth