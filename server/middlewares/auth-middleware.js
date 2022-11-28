const ApiError = require('../exceptions/app-error');
// валидируем токен
const tokenService = require('../service/token-service')

module.exports = function (req, res, next){
    try{
        // получаем токен из заголовка запроса 
        const authorizationHeader = req.headers.authorization;
        console.log(authorizationHeader)

        //  проверим есть ли токен.
        if(!authorizationHeader){
            return next (ApiError.UnauthorizeError());
        }
        // если есть то рабираем текст заголовка Bearer eyJhbGciOiJIU... на две части и берем вторую часть
        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken){
            return next(ApiError.UnauthorizeError());
        }
        //  поскольку ожидаем AccessToken то вызываем функцию валидации
        const userData = tokenService.validateAccessToken(accessToken);
        //  если при валидации произошла ошибка, то функция вернет нам null поэтому нужно проверить
        if(!userData){
            return next(ApiError.UnauthorizeError());
        }
        req.user = userData;
        next();
    } catch(e){
        return next (ApiError.UnauthorizeError());
    }
};