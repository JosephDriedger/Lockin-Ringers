
const StatusCodes = require("../constants/statusCodes");
const pagePaths = require("../constants/pagePaths");

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).render(pagePaths.notFoundPage, {
        title: '404 Not Found',
        pageStylesheet: null,
        pageScript: null
    });
};

module.exports = notFound;
