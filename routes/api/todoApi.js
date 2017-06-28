const route = require('express').Route();

route.get('/todos',(req,res)=>{
	var UserTodos = req.user.username;
	UserTodos.findAll()
        .then((userTodos) => {
            res.status(200).send(userTodos)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).send("Error retrieving events")
        })
});

//route.get('/add',())