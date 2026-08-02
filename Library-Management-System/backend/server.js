const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Connect to SQLite Database
const db = new sqlite3.Database(
  path.join(__dirname, "../database/library.sqlite3"),
  (err) => {
    if (err) {
      console.log("❌ Database Connection Failed:", err.message);
    } else {
      console.log("✅ Connected to SQLite Database");
    }
  }
);

// ======================
// CREATE TABLES
// ======================

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      category TEXT,
      quantity INTEGER,
      available INTEGER
    )
  `);

  db.run(`
CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      course TEXT,
      semester TEXT
)
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS issued_books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      book_id INTEGER,
      issue_date TEXT,
      return_date TEXT,
      status TEXT DEFAULT 'Issued'
    )
  `);
});


db.run(`
CREATE TABLE IF NOT EXISTS contacts(

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT,

    email TEXT,

    subject TEXT,

    message TEXT,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP

)
`);

db.run(`

CREATE TABLE IF NOT EXISTS admin (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    username TEXT UNIQUE NOT NULL,

    password TEXT NOT NULL

)

`);

db.get("SELECT * FROM admin", (err, row) => {

    if(!row){

        db.run(

            `INSERT INTO admin(username,password)

             VALUES(?,?)`,

            ["admin","admin123"]

        );

    }

});


// ======================
// HOME
// ======================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ======================
// BOOK APIs
// ======================

// Get all books
app.get("/books", (req, res) => {
  db.all("SELECT * FROM books", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Add book
app.post("/books", (req, res) => {
  const { title, author, category, quantity } = req.body;

  db.run(
    `INSERT INTO books(title,author,category,quantity,available)
     VALUES(?,?,?,?,?)`,
    [title, author, category, quantity, quantity],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Book Added Successfully",
        id: this.lastID,
      });
    }
  );
});

// ======================
// UPDATE BOOK
// ======================

app.put("/books/:id", (req, res) => {

    const { title, author, category, quantity } = req.body;

    db.run(
        `
        UPDATE books
        SET
            title = ?,
            author = ?,
            category = ?,
            quantity = ?,
            available = ?
        WHERE id = ?
        `,
        [
            title,
            author,
            category,
            quantity,
            quantity,
            req.params.id
        ],
        function (err) {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                message: "Book Updated Successfully"
            });

        }
    );

});

// Delete book
app.delete("/books/:id", (req, res) => {
  db.run(
    "DELETE FROM books WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Book Deleted Successfully",
      });
    }
  );
});

// ======================
// STUDENT APIs
// ======================

// Get students
app.get("/students",(req,res)=>{

    db.all(

        "SELECT * FROM students",

        [],

        (err,rows)=>{

            if(err){

                return res.status(500).json(err);

            }

            res.json(rows);

        }

    );

});

// Add student
app.post("/students", (req, res) => {

    const {
        name,
        email,
        phone,
        address,
        course,
        semester
    } = req.body;

    db.run(

        `INSERT INTO students
        (name,email,phone,address,course,semester)
        VALUES(?,?,?,?,?,?)`,

        [
            name,
            email,
            phone,
            address,
            course,
            semester
        ],

        function(err){

            if(err){

                return res.status(500).json(err);

            }

            res.json({

                success:true,

                message:"Student Added Successfully"

            });

        }

    );

});

// Delete student
app.delete("/students/:id", (req, res) => {
  db.run(
    "DELETE FROM students WHERE id=?",
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        message: "Student Deleted Successfully",
      });
    }
  );
});

// ======================
// ISSUE BOOK
// ======================

app.post("/issue", (req, res) => {
  const { student_id, book_id, issue_date } = req.body;

  db.run(
    `INSERT INTO issued_books(student_id,book_id,issue_date)
     VALUES(?,?,?)`,
    [student_id, book_id, issue_date],
    function (err) {
      if (err) return res.status(500).json(err);

      db.run(
        "UPDATE books SET available = available - 1 WHERE id=?",
        [book_id]
      );

      res.json({
        success: true,
        message: "Book Issued Successfully",
      });
    }
  );
});

// Return book
app.put("/return/:id", (req, res) => {
  const { return_date } = req.body;

  db.get(
    "SELECT * FROM issued_books WHERE id=?",
    [req.params.id],
    (err, issue) => {
      if (err || !issue)
        return res.status(404).json({ message: "Record not found" });

      db.run(
        `UPDATE issued_books
         SET return_date=?, status='Returned'
         WHERE id=?`,
        [return_date, req.params.id]
      );

      db.run(
        "UPDATE books SET available = available + 1 WHERE id=?",
        [issue.book_id]
      );

      res.json({
        success: true,
        message: "Book Returned Successfully",
      });
    }
  );
});

// View Issued Books
app.get("/issued", (req, res) => {
  db.all(
    `
    SELECT
      issued_books.id,
      students.name AS student,
      books.title AS book,
      issued_books.issue_date,
      issued_books.return_date,
      issued_books.status
    FROM issued_books
    JOIN students ON issued_books.student_id = students.id
    JOIN books ON issued_books.book_id = books.id
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

// ======================
// DASHBOARD
// ======================

app.get("/dashboard", (req, res) => {
  db.get("SELECT COUNT(*) AS totalBooks FROM books", (err, books) => {
    db.get("SELECT COUNT(*) AS totalStudents FROM students", (err, students) => {
      db.get("SELECT COUNT(*) AS totalIssued FROM issued_books WHERE status='Issued'", (err, issued) => {
        res.json({
          totalBooks: books.totalBooks,
          totalStudents: students.totalStudents,
          totalIssued: issued.totalIssued,
        });
      });
    });
  });
});

// ======================


// ==============================
// CONTACT API
// ==============================

app.post("/contact", (req, res) => {

    const {

        name,

        email,

        subject,

        message

    } = req.body;

    db.run(

        `

        INSERT INTO contacts

        (name,email,subject,message)

        VALUES(?,?,?,?)

        `,

        [

            name,

            email,

            subject,

            message

        ],

        function(err){

            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }

            res.json({

                success:true,

                message:"Message Sent Successfully."

            });

        }

    );

});

// ======================================
// ADMIN LOGIN
// ======================================

app.post("/login", (req, res) => {

    const { username, password } = req.body;

    db.get(

        "SELECT * FROM admin WHERE username=? AND password=?",

        [username, password],

        (err, user) => {

            if(err){

                return res.status(500).json({

                    success:false,

                    message:err.message

                });

            }

            if(!user){

                return res.json({

                    success:false,

                    message:"Invalid Username or Password"

                });

            }

            res.json({

                success:true,

                message:"Login Successful"

            });

        }

    );

});


app.listen(PORT, () => {
  console.log(`🚀 Server Running at http://localhost:${PORT}`);
});