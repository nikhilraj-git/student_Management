CREATE TABLE Instructors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);


CREATE TABLE Courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  instructor_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  max_seats INT,
  start_date DATE,
  FOREIGN KEY (instructor_id) REFERENCES Instructors(id)
);


CREATE TABLE Students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  linkedin_profile VARCHAR(255),
  status ENUM('applied', 'accepted', 'rejected', 'waitlisted') DEFAULT 'applied',
  FOREIGN KEY (course_id) REFERENCES Courses(id)
);


CREATE TABLE Comment (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  instructor_id INT NOT NULL,
  content TEXT,
  FOREIGN KEY (student_id) REFERENCES Students(id),
  FOREIGN KEY (instructor_id) REFERENCES Instructors(id)
);


