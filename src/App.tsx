import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Gist } from "./components/Gist";
import { Loading } from "./components/Loading";
import { Pagination } from "./components/Pagination";
import { Modal } from "./components/Modal";
import { ActiveGist, GistType } from "./models/Gist-models";

const App = () => {
  const [pageNo, setPageNo] = useState(1);
  const [gists, setGists] = useState<GistType[]>([]);
  const [activeGist, setActiveGist] = useState<ActiveGist>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const modalRef = React.createRef<HTMLDivElement>();

  // Fetch gists on page change
  useEffect(() => {
    const url = `https://api.github.com/gists/public?per_page=30&page=${pageNo}`;
    const getGists = async () => {
      setIsLoading(true);
      setActiveGist(undefined);
      try {
        const response = await axios.get(url);
        setGists(response.data);
        window.scrollTo(0, 0); // Scroll to top
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getGists();
  }, [pageNo]);

  // Show modal on gist click
  useEffect(() => {
    modalRef.current?.classList.add("modal-visible");
    setTimeout(() => modalRef.current?.classList.remove("modal-visible"), 1000); 
    // If it should stay visible for 1s than the value would be 1600 (1s + 0.3s for each transition)
  }, [activeGist, modalRef]);

  const onGistClick = (id: string, avatarUrl: string) => {
    setActiveGist({ id, avatarUrl });
  };

  const Content = () => {
    if (error) {
      return <p className="error-msg">Error: {error}</p>;
    }
    if (isLoading) {
      return (
        <React.Fragment>
          <Loading />
          <Pagination pageNo={pageNo} setPageNo={setPageNo} />
          {/* Remove the line above if no pagination is needed while loading */}
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {gists.map((gist) => (
          <Gist
            key={gist.id}
            avatarUrl={gist.owner.avatar_url}
            fileName={Object.keys(gist.files)[0]}
            onGistClick={() => onGistClick(gist.id, gist.owner.avatar_url)}
            isActive={gist.id === activeGist?.id}
          />
        ))}
        <Pagination pageNo={pageNo} setPageNo={setPageNo} />
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <header className="app-header">
        <h2>Gists</h2>
      </header>
      <div className="app-content">{Content()}</div>
      {!!activeGist && (
        <Modal modalRef={modalRef} avatarUrl={activeGist?.avatarUrl} />
      )}
    </React.Fragment>
  );
};

export default App;
