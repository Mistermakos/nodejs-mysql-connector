describe("loginUser tests", () => {

    test("should return user data when credentials are valid", async () => {
        // TODO: mock DB + bcrypt
    });

    test("should throw 400 when user is not found", async () => {
        // TODO
    });

    test("should throw 400 when password doesn't match", async () => {
        // TODO
    });
});

describe("login controller", () => {

    test("should return 400 if login is missing", async () => {
        // TODO
    });

    test("should return 400 if password is missing", async () => {
        // TODO
    });

    test("should login user successfully", async () => {
        // TODO: mock loginUser
    });

});