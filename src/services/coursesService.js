import mockedCoursesList from "../mockedData/mockedCoursesList";

const useCoursesService = () => {
  const getCourses = () => {
    return mockedCoursesList;
  };
  const addCourse = (title, description, authors, duration) => {
    const creationDate = new Date();
    const parsedAuthors = authors.map((item) => item.id);
    const course = {
      title,
      description,
      authors: parsedAuthors,
      duration,
      creationDate,
    };
    mockedCoursesList.push(course);
  };
  return { getCourses, addCourse };
};

export default useCoursesService;
