import React, { useEffect, useState, useCallback } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadRepositories() {
      const response = await api.get("/repositories");

      setRepositories(response.data);
    }

    loadRepositories();
  }, []);

  const handleAddRepository = useCallback(async () => {
    const newRepository = {
      title: `Novo projeto ${Date.now()}`,
      url: "http//www.google.com",
      techs: ["Node.js", "React JS", "React Native"],
    };

    const response = await api.post("/repositories", newRepository);

    setRepositories((state) => [...state, response.data]);
  }, [setRepositories]);

  const handleRemoveRepository = useCallback(
    (id) => {
      api.delete(`/repositories/${id}`);

      setRepositories((state) =>
        state.filter((repository) => repository.id !== id)
      );
    },
    [setRepositories]
  );

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
