var jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(401).send({ auth: false, erro: 'Nenhum token fornecido.' })
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, erro: 'Falha ao autenticar o token.' })
    const {usuario, cnpj, cpf} = decoded;
    req.user = {usuario, cnpj, cpf};
    next();
  });
}
exports.verifyJWT = verifyJWT
