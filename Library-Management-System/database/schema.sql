-- ==========================================
-- Library Management System Database
-- SQLite3
-- ==========================================

DROP TABLE IF EXISTS issued_books;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS books;

-- ==========================================
-- Books Table
-- ==========================================

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    available INTEGER NOT NULL
);

-- ==========================================
-- Students Table
-- ==========================================

CREATE TABLE students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    phone TEXT,
    address TEXT,
    course TEXT,
    semester TEXT
);

-- ==========================================
-- Issued Books Table
-- ==========================================

CREATE TABLE issued_books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    issue_date TEXT NOT NULL,
    return_date TEXT,
    status TEXT DEFAULT 'Issued',

    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(book_id) REFERENCES books(id)
);



CREATE TABLE contacts (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL,

    subject TEXT NOT NULL,

    message TEXT NOT NULL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE admin (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO admin (username, email, password)
VALUES (
    'admin',
    'biseshghimire243@gmail.com',
    'admin123'
);
-- ==========================================
-- Sample Books
-- ==========================================

INSERT INTO books (title, author, category, quantity, available) VALUES
('The Alchemist', 'Paulo Coelho', 'Novel', 10, 10),
('Rich Dad Poor Dad', 'Robert Kiyosaki', 'Finance', 8, 8),
('Atomic Habits', 'James Clear', 'Self Help', 12, 12),
('Think and Grow Rich', 'Napoleon Hill', 'Motivation', 7, 7),
('Python Crash Course', 'Eric Matthes', 'Programming', 15, 15);

-- ==========================================
-- Sample Students
-- ==========================================

INSERT INTO students
(name, email, phone, address, course, semester)
VALUES

(
'John Doe',
'john@example.com',
'9800000001',
'Kathmandu',
'BSc CSIT',
'5th Semester'
),

(
'Emma Watson',
'emma@example.com',
'9800000002',
'Pokhara',
'BCA',
'3rd Semester'
),

(
'David Miller',
'david@example.com',
'9800000003',
'Lalitpur',
'BIM',
'7th Semester'
);

-- ==========================================
-- Sample Issue Record
-- ==========================================

INSERT INTO issued_books (student_id, book_id, issue_date, status)
VALUES
(1, 1, '2026-08-02', 'Issued');



CREATE TABLE book_reviews (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    book_title TEXT NOT NULL,

    reviewer_name TEXT NOT NULL,

    rating INTEGER NOT NULL,

    review TEXT NOT NULL,

    created_at TEXT DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO book_reviews
(book_title, reviewer_name, rating, review)

VALUES

(
'Atomic Habits',
'Bishesh Ghimire',
5,
'Excellent book. It completely changed my daily habits.'
),

(
'Atomic Habits',
'John Doe',
4,
'Very practical and easy to understand.'
),

(
'Rich Dad Poor Dad',
'Emma Watson',
5,
'One of the best finance books ever written.'
),

(
'Python Crash Course',
'David Miller',
5,
'Perfect for beginners learning Python.'
),

(
'The Alchemist',
'Sophia',
5,
'Beautiful story with an inspiring message.'
),

(
'Clean Code',
'Robert',
5,
'Every programmer should read this book.'
);

