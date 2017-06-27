import React from 'react';
import { Link } from 'react-router'

export default ({ children, title, breadcrumbList }) => (
  <div>
    <div className="row wrapper border-bottom white-bg page-heading">
        <div className="col-sm-4">
            <h2>{title}</h2>
            <ol className="breadcrumb">
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                  breadcrumbList.map((node, index) => {
                    if (breadcrumbList.length - 1 === index) {
                      return (
                        <li className="active" key={index}>
                            <strong>{node.label}</strong>
                        </li>
                      )
                    } else {
                      return (
                        <li key={index}>
                            <Link to={node.to}>{node.label}</Link>
                        </li>
                      )
                    }
                  })
                }

            </ol>
        </div>
    </div>
    <div className="wrapper wrapper-content animated fadeInRight">
      {children}
    </div>
  </div>
);
