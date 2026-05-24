export let login = async () => {
    try {
        let { login, password } = req.body

        if (!login || !password) {
            return res.status(404).json({
                message: "Missing parameter (login and password)"
            })
        }

        //Validation

        // Get Users Role, id
        // Generate JWT

        return res.status(200).json({
            message: "Logged in!"
        })
    }
    catch (err) {
        console.log(err)
    }
} 