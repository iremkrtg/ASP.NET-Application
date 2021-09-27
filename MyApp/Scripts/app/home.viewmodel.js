function UsernameViewModel(app, dataModel) {
    var self = this;

    self.myUsername = ko.observable("");

    Sammy(function () {
        this.get('#username', function () {
            // Make a call to the protected Web API by passing in a Bearer Authorization Header
            $.ajax({
                method: 'get',
                url: app.dataModel.userInfoUrl,
                contentType: "application/json; charset=utf-8",
                headers: {
                    'Authorization': 'Bearer ' + app.dataModel.getAccessToken()
                },
                success: function (data) {
                    self.myUsername('Your username is : ' + data.username);
                }
            });
        });
        this.get('/', function () { this.app.runRoute('get', '#username'); });
    });

    return self;
}

app.addViewModel({
    name: "Username",
    bindingMemberName: "username",
    factory: UsernameViewModel
});
