import Button from "../../../../common/button/Button";
import "./courseCard.css";
import authorFind from "../../../../helpers/authorFind";
import pipeDuration from "../../../../helpers/pipeDuration";
import dateGenerator from "../../../../helpers/dateGenerator";
import { useMemo } from "react";

const CourseCard = ({ data }) => {
  const {description, title, authors, duration, creationDate} = data;
  const authorsNames = useMemo(() => authorFind(authors).join(', '), [authors]);
  const dateOfCreation = useMemo(() => dateGenerator(creationDate), [creationDate]);

  return (
    <div className="card">
      <div className="card__curse-text">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="card__curse-info">
        <p>
          <strong>Authors: </strong> {authorsNames}
        </p>
        <p>
          <strong>Duration: </strong> {pipeDuration(duration)}
        </p>
        <p>
          <strong>Created: </strong> {dateOfCreation}
        </p>
        <Button text={"Show course"} />
      </div>
    </div>
  );
};

export default CourseCard;
