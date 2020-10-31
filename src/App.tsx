import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Gist } from "./components/Gist";
import { Loading } from "./components/Loading";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    const url = `https://api.github.com/gists/public?per_page=30&page=${pageNo}`;
    const getGists = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        await setGists(response.data);
      } catch (error) {
        setError(error.message);
      } finally {        
        window.scrollTo(0, 0);    // Scroll to top
        setIsLoading(false);
      }
    };
    getGists();   // Fetch Gists
  }, [pageNo]);

  const onGistClick = (id: string) => {
    setActiveGistId(id);
  };

  const Content = () => {
    if (error) {
      return <p className="error-msg">Error: {error}</p>
    }
    else if (isLoading) {
      return <Loading />
    } else {
      return gists.map((gist) => (
        <Gist
          key={gist.id}
          avatarUrl={gist.owner.avatar_url}
          fileName={Object.keys(gist.files)[0]}
          onGistClick={() => onGistClick(gist.id)}
          isActive={gist.id === activeGistId}
        />
      ))
    }
  };

  return (
    <div>
      <header className="app-header">
        <h2>Gists</h2>
      </header>
      <div className="app-content">
        {Content()}
        {!error && <Pagination pageNo={pageNo} setPageNo={setPageNo} />}
      </div>
    </div>
  );
};

export default App;
