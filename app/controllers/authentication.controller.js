
var session;

exports.login = async (req, res) => {

    session = req.session;
    let user = req.body.username;
    let pass = req.body.password;

    if (user == 'admin' && pass == '123456') {
        session.User = {
            name : 'admin'
        };
        return res.status(200).json({status: 'success', session: session.User})
    }

    return res.status(200).json({status: 'error', session: 'No session'})

}
