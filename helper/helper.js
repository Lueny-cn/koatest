module.exports = {
    auth: function(context) {
        let user = context.session.user;
        if(user && user.role) {
            if( user.role === "user") {
                context.body = {
                    code: 403,
                    msg: "权限不足"
                }
                return ;
            }
        }
    }
}