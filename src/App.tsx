import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Gist } from "./components/Gist";
import { Pagination } from "./components/Pagination";

interface GistType {
  owner: {
    avatar_url: string;
  };
  id: string;
  files: {
    [key: string]: {
      filename: string;
    };
  };
}

const App = () => {
  const [pageNo, setPageNo] = useState(1);
  const [gists, setGists] = useState<GistType[]>([]);
  const [activeGistId, setActiveGistId] = useState<string>();

  useEffect(() => {
    const getGists = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/gists/public?per_page=30&page=${pageNo}`
        );
        await setGists(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getGists();
  }, [pageNo]);

  const onGistClick = (id: string) => {
    setActiveGistId(id);
  };

  return (
    <div>
      <header className="app-header">
        <h2>Gists</h2>
      </header>
      <div className="app-content">
        {gists.map((gist) => (
          <Gist
            key={gist.id}
            avatarUrl={gist.owner.avatar_url}
            fileName={Object.keys(gist.files)[0]}
            onGistClick={() => onGistClick(gist.id)}
            isActive={gist.id === activeGistId}
          />
        ))}
        <Pagination pageNo={pageNo} setPageNo={setPageNo} />
      </div>
    </div>
  );
};

export default App;
