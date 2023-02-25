import "./courses.css";
import CourseCard from "./components/courseCard/CourseCard";
import SearchBar from "./components/seachBar/SeachBar";
import Button from "../../common/button/Button";
import useCoursesService from "../../services/coursesService";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const filterItems = (items, term) => {
  if (term === "") {
    return items;
  }
  return items.filter(
    (item) => item.title.toLowerCase().indexOf(term.toLowerCase()) > -1
  );
};

const Courses = () => {
  const [findValue, setFindValue] = useState("");
  const [visibleElements, setVisibleElements] = useState([]);
  const { getCourses } = useCoursesService();

  const elements = useMemo(
    () =>
      visibleElements.map((item) => <CourseCard key={item.id} data={item} />),
    [visibleElements]
  );

  const onSearch = () => {
    setVisibleElements(filterItems(visibleElements, findValue));
  };

  useEffect(() => {
    if (findValue === "") {
      const elements = getCourses();
      setVisibleElements(elements);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findValue]);

  const onChange = (e) => {
    const value = e.target.value;
    setFindValue(value);
  };

  return (
    <>
      <div className="courses__panel">
        <SearchBar
          findValue={findValue}
          onChange={onChange}
          onSearch={onSearch}
        />
        <Link to={"create"}>
          <Button text={"Add course"} />
        </Link>
      </div>
      <div className="courses-block">{elements}</div>
    </>
  );
};

export default Courses;
