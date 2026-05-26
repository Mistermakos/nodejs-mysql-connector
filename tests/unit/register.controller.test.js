describe("registerUser tests", () => {

    test("should register user successfully", async () => {
        // TODO: mock DB + bcrypt
    });

    test("should throw error if user already exists", async () => {
        // TODO
    });

    test("should throw error when SELECT fails", async () => {
        // TODO
    });

    test("should throw error when INSERT fails", async () => {
        // TODO
    });

});

describe("register controller", () => {

    test("should return 400 if login is missing", async () => {
        // TODO
    });

    test("should return 400 if password is missing", async () => {
        // TODO
    });

    test("should register user successfully", async () => {
        // TODO: mock registerUser
    });

});