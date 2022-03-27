
// application routes
module.exports.routes = {
    "GET /api/ping": "status/ping",
    "GET /api": "main",
    'POST /api/user/register': 'user/register',
    'POST /api/user/login': 'user/login',
    'POST /api/survey': 'survey/survey',
    'get /api/surveys': 'survey/listsurvey',
    'POST /api/answer': 'answer/answer',
    'GET /api/answers': 'answer/myanswers',
};
