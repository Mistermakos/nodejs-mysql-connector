export let register = async (req, res) => {
    try {
        let { login, password } = req.body

        if (!login || !password) {
            return res.status(404).json({
                message: "Missing parameter (login and password)"
            })
        }

        return res.status(200).json({
            message: "Registration accepted!"
        })
    }
    catch (err) {
        console.log(err)
        return;
    }
} 