import React from "react";
import style from './progress.module.css'

interface IProps {}

const ProgressBar: React.FC<IProps> = (props) => {
  return (
    <div className={style.progress__wrapper}>
      <progress className="progress is-small is-primary" max="100">Loading</progress>
    </div>
  );
};

export default ProgressBar;
