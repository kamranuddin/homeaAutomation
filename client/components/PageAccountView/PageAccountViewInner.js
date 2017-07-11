// libs
import React from "react";
import DocumentTitle from "react-document-title";
import styles from "./PageAccountViewInner.scss";
import { Link } from "react-router-dom";

const PageAccountViewInner = props => {
  return (
    <div className={`${styles.root}`}>
      <DocumentTitle title="Account - Cryptax" />
      {/*<div className="row">
        <div className="col-lg-12">
          Home Page
        </div>
      </div>*/}
      <div className="container-fluid">
        <nav class="navbar navbar-inverse bg-primary">
          <h2>Account</h2>
        </nav>
      </div>
    </div>
  )
}

export default PageAccountViewInner