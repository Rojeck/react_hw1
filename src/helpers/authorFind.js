import mockedAuthorsList from "../mockedData/mockedAuthorsList";

const authorFind = (authorsArray) => {
    const authorsNames = [];
    authorsArray.forEach(authorId => {
        const author = mockedAuthorsList.find(author => author.id === authorId);
        if (author) {
            authorsNames.push(author.name);
        }
    });
    return authorsNames;
}

export default authorFind;