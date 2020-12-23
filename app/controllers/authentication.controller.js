var session;

exports.login = (req, res) => {

    session = req.session;
    let user = req.body.username;
    let pass = req.body.password;

    if (user == 'admin' && pass == '123456') {
        session.User = {
            name: 'admin'
        };
        return res.status(200).json({code: 1, status: 'success', session: session.User});
    }
    return res.status(200).json({code: 0, status: 'error', session: 'No session'});
}

exports.logout = (req, res) => {

    req.session.destroy(function (err) {
        return res.status(200).json({code: 1, status: 'success', session: 'cannot access session here'});
    })
}
