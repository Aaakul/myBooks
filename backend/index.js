import  express from "express";
import  mysql from "mysql";
import cors from "cors";

const app = express();
const db  = mysql.createConnection({    // In Node.js's default password authentication scheme is 'mysql_native_password'.                                 
    host: "localhost",                  // However for MySQL 8.0, it's 'caching_sha2_password'. Modification is neccesary.    
    user: "root",                       // Try "Mysql>alter user 'root'@'localhost' identified with mysql_native_password by 'YOURPASSWORD';"
    password: "root",
    database: "mybooks"
});

app.use(express.json());    // Allow post json.
app.use(cors());            // Allow API access.

app.get("/", (req, res) => {
    res.json("Welcome to the backend!");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM mybooks.test;";
    db.query(q, (err, data) =>{
        return (err) ?  res.json(err) : res.json(data); 
    })
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO mybooks.test (`title`, `desc`, `price`, `cover`) VALUES (?, ?, ?, ?);";
    const values = [req.body.title,
                    req.body.desc,
                    req.body.price,
                    req.body.cover
                    ];
    db.query(q, values, (err, data) =>{
        return (err) ?  res.json(err) : res.json("Book has been created sucessfully!"); 
    });
});

app.delete(`/books/:id`, (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM mybooks.test WHERE id = ?";
    db.query(q, [bookId], (err, data) => {
        return (err) ?  res.json(err) : res.json("Book has been updated sucessfully!"); 
    });
});

app.put(`/books/:id`, (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE mybooks.test SET `title`= ?, `desc`=?, `price`=?, `cover`=? WHERE id = ?";
    const values = [req.body.title,
                    req.body.desc,
                    req.body.price,
                    req.body.cover
                    ];
    db.query(q, [ ...values, bookId], (err, data) =>{
        return (err) ?  res.json(err) : res.json("Book has been created sucessfully!"); 
    });
});

app.listen(8800, () => {
    console.log("Connected to backend!");
});