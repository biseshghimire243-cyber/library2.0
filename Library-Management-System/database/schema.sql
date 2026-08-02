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