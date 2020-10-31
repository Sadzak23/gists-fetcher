import React from "react";
import classnames from "classnames";

interface Props {
  avatarUrl: string;
  fileName: string;
  onGistClick: () => void;
  isActive: boolean
}

const getGistClass = (isActive: boolean) => {
  return classnames("gist-container", {
    "gist-active": isActive,
  });
};

export const Gist: React.FC<Props> = ({ avatarUrl, fileName, isActive, onGistClick }) => {
  return (
    <div onClick={onGistClick} className={getGistClass(isActive)}>
      <img className="gist-avatar" src={avatarUrl} alt="Gist avatar" />
      <p>{fileName}</p>
    </div>
  );
};
