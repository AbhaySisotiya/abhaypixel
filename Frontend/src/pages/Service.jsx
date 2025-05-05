import React from "react";
import ServiceCard from "../components/ServiceCard";
import services from "../service/service.json";

function Service() {
  return (
    <section className="container service-card">
      <div className="card-heading">
        <h2>Services</h2>
        <div className="line"></div>
      </div>

      {services.length > 0 ? (
        <div className="services">
          {services.map((s) => {
            return (
              <ServiceCard key={s.id} type={s.type} title={s.title} desc={s.desc} bedge={s.bedge} />
            );
          })}
        </div>
      ) : (
        "Loading...."
      )}
    </section>
  );
}

export default Service;
