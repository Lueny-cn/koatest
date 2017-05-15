module.exports = {
    auth: function(context) {
        let user = context.session.user;
        if(user && user.role) {
            if( user.role === "asker") {
                context.body = {
                    code: 403,
                    msg: "权限不足"
                }
                return ;
            }
        }
    }
}