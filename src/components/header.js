import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
    <h5 className="my-0 font-weight-normal">
      <Link to="/">Департамент мобільності студентів</Link>
    </h5>
    <img
      src="https://kpi.ua/files/images/kpi.png"
      className="ml-3 img-fluid my-0 font-weight-normal"
      width="50px"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Lesser_Coat_of_Arms_of_Ukraine.svg/1200px-Lesser_Coat_of_Arms_of_Ukraine.svg.png"
      className="ml-3 img-fluid my-0 mr-auto font-weight-normal"
      width="50px"
    />
    <nav className="my-2 my-md-0 mr-md-3">
      <Link to="/about" className="p-2 text-dark">
        Про нас
      </Link>
      <Link to="/list" className="p-2 text-dark">
        Список
      </Link>
    </nav>
    <Link to="/apply" className="btn btn-outline-primary">
      Подати заявку
    </Link>
  </div>
);
