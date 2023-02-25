import mockedAuthorsList from "../mockedData/mockedAuthorsList";

const useAuthorsService = () => {
    const getAuthors = () => {
        return mockedAuthorsList;
    }
    const addAuthor = (course) => {
        mockedAuthorsList.push(course);
    }
    return {getAuthors, addAuthor}
}

export default useAuthorsService;