const ehandler = (err, res) => {
    console.log(err);
    res.status(500).json({
      status: 500,
      description: "Internal Server Error",
      solution: "Sorry but the server has an error, please try again later",
    });
}

module.exports = { ehandler }