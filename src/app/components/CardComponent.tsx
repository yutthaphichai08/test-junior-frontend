import React from "react";
import styles from "@/style/Card.module.css";

interface ICard {
  id: number;
  name: string;
  description: string;
  image: string;
  onClick: (id: number) => void;
}

export default function Card({ id, name, description, image, onClick }: ICard) {
  return (
    <div
      className={`col-md-4 mb-3 d-flex`}
      onClick={() => onClick(id)}
      style={{ cursor: "pointer" }}
    >
      <div
        className={`${styles.card} card d-flex flex-column`}
        style={{ height: "100%" }}
      >
        <img
          src={
            image ??
            "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
          }
          className={`${styles.cardImage} card-img-top img-fluid`}
          alt={name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className={`${styles.cardTitle} card-title`}>{name}</h5>
          <p
            className={`${styles.cardText} card-text`}
            style={{
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
