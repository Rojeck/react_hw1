import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import Button from "../../common/button/Button";
import CustomInput from "../../common/input/Input";

import pipeDuration from "../../helpers/pipeDuration";
import useValidate from "../../hooks/useValidate";
import useAuthorsService from "../../services/authorsService";
import useCoursesService from "../../services/coursesService";

import "./createCourse.css";

function generateId() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 20; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

function removeDuplicatesById(arr1, arr2) {
  // створюємо Set з id елементів другого масиву
  const ids = new Set(arr2.map((element) => element.id));

  // фільтруємо елементи першого масиву, залишаючи тільки ті, чиї id не містяться в множині ids
  const filteredArr = arr1.filter((element) => !ids.has(element.id));
  return filteredArr;
}

const CreateCourse = () => {
  const { getAuthors, addAuthor } = useAuthorsService();
  const { addCourse } = useCoursesService();
  const [duration, setDuration] = useState(0);
  const [authorsList, setAuthorsList] = useState([]);
  const [confirmedAuthorsList, setConfirmedAuthorsList] = useState([]);

  const description = useValidate("", 10);
  const title = useValidate("", 2);
  const authorName = useValidate("", 2);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthorsList(getAuthors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = () => {
    let errors = [];
    if (duration <= 0) {
      errors.push("Duration must be more than 0");
    }
    if (title.validate) {
      errors.push("Title should be at least 2 symbols");
    }
    if (confirmedAuthorsList.length <= 0) {
      errors.push("You must add authors for the course");
    }
    return errors;
  };

  const addNewAuthor = (name) => {
    if (name === "") {
      alert("Fill author name");
    } else {
      const id = generateId();
      const author = {
        id,
        name,
      };
      addAuthor(author);
      authorName.setValue("");
      const elements = removeDuplicatesById(getAuthors(), confirmedAuthorsList);
      setAuthorsList(elements);
    }
  };

  const authors = useMemo(
    () =>
      authorsList.map((item) => (
        <AuthorItem
          author={item}
          key={item.id}
          buttonText={"Add author"}
          onButton={() => confirmAuthor(item.id)}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authorsList, confirmedAuthorsList]
  );

  const confirmedAuthors = useMemo(
    () =>
      confirmedAuthorsList.map((item) => (
        <AuthorItem
          author={item}
          key={item.id}
          buttonText={"Remove author"}
          onButton={() => unconfirmAuthor(item.id)}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authorsList, confirmedAuthorsList]
  );

  const confirmAuthor = (authorId) => {
    const author = authorsList.filter((author) => author.id === authorId);
    const newAuthorList = authorsList.filter(
      (author) => author.id !== authorId
    );
    setAuthorsList(newAuthorList);
    setConfirmedAuthorsList((authorsArr) => [...authorsArr, ...author]);
  };

  const unconfirmAuthor = (authorId) => {
    const author = confirmedAuthorsList.filter(
      (author) => author.id === authorId
    );
    const newAuthorList = confirmedAuthorsList.filter(
      (author) => author.id !== authorId
    );
    setConfirmedAuthorsList(newAuthorList);
    setAuthorsList((authorsArr) => [...authorsArr, ...author]);
  };

  const onAddCourse = (e) => {
    e.preventDefault();
    const errors = validate();
    if (errors.length > 0) {
      alert(errors[0]);
    } else {
      addCourse(title.value, description.value, confirmedAuthorsList, duration);
      navigate("/");
    }
  };

  return (
    <>
      <form>
        <div className="row">
          <CustomInput
            placeholder={"Title"}
            label={"Title"}
            value={title.value}
            onChange={(e) => title.setValue(e.target.value)}
          />
          <Button text={"Add course"} onClick={onAddCourse} />
        </div>
        <label htmlFor="description">Description</label>
        <textarea
          placeholder="description text"
          className="textarea"
          name=""
          id="description"
          cols="20"
          rows="5"
          value={description.value}
          onChange={(e) => description.setValue(e.target.value)}
        ></textarea>
      </form>
      <div className="course__meta-block">
        <div className="row">
          <div className="col">
            <div className="creation-block">
              <h3>Author Name</h3>
              <CustomInput
                label={"Author"}
                placeholder={"Enter author name.."}
                value={authorName.value}
                onChange={(e) => authorName.setValue(e.target.value)}
              />
              <Button
                text={"Create author"}
                onClick={() => addNewAuthor(authorName.value)}
              />
            </div>
            <div className="creation-block">
              <h3>Duration</h3>
              <CustomInput
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
                label={"Duration"}
                placeholder={"Enter duration minutes"}
              />
              <p>Duration: {pipeDuration(duration)}</p>
            </div>
          </div>
          <div className="col">
            <h3>Authors</h3>
            <ul className="authors-list">{authors}</ul>
            <h3>Confirmed Authors</h3>
            <ul className="authors-list">{confirmedAuthors}</ul>
          </div>
        </div>
      </div>
    </>
  );
};

const AuthorItem = ({ author, buttonText, onButton }) => {
  return (
    <li className="author-item">
      <div className="author-name">{author.name}</div>
      <Button text={buttonText} onClick={onButton} />
    </li>
  );
};

export default CreateCourse;
