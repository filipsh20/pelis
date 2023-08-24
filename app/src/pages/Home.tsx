import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css'

function Home() {
  const [query, setQuery] = useState("");
  const [films, setFilms] = useState(() => [{ name: "", url: "", watch: false }]);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const query = event.target.value;
    setQuery(query);
    const response = await axios.post("http://localhost:5000/search", { query });
    setFilms(response.data);
  }

  const handleWatch = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    setFilms(prev => {
      const updated = [...prev]
      updated[index].watch = true;
      return updated;
    });
  }

  return (
    <div className={styles.container}>
      <input className={styles.input} type="text" onChange={handleChange} value={query} />
      {films.map((item, index) => (
        <div key={item.name}>
          <p>{item.name}</p>
          <button onClick={(e) => handleWatch(e, index)}>Watch</button>
          {item.watch &&
            <video controls width="640" height="360">
              <source src={item.url} type="video/mp4" />
            </video>
          }
        </div>
      ))}
      <a href="/">Auth</a>
    </div>
  )
}

export default Home;
