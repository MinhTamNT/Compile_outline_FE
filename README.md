# University Specifications App

This application allows students to read all university specifications, comment on them, and rate them based on their school-provided accounts. It aims to enhance student engagement and provide a platform for feedback on university policies, course details, event schedules, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup and Installation](#setup-and-installation)
- [References](#references)

## Features

- **User Authentication and Authorization**:

  - Students can log in using their university-provided accounts.
  - Lecture account will be registered and after the admin active account the lecturer can log in
  - Role-based access control to ensure only authenticated users can comment and rate.

- **Specifications Management**:

  - View detailed university specifications, including course details, policies, and event schedules.

- **Commenting System**:

  - Add and delete comments on specifications.
  - View comments from other students to facilitate discussion and feedback.
  - Classify all the comments such as : positive,negative,neutral

- **Rating System**:
  - Rate specifications based on personal experiences and opinions.
  - View average ratings for each specification.
- **Admin site**:

  - Will be the stats all the specification was submitted the following month and quarter
  - And stats all the comments depending on the classify

## Tech Stack

**Frontend**:

- **HTML, CSS, JavaScript**
- **Libarary : React JS**
- **JSP (JavaServer Pages)**
- **Spring MVC for handling views and requests**

**Backend**:

- **Java**
- **Spring MVC**
- **Spring Security for authentication and authorization**
- **Hibernate for ORM (Object-Relational Mapping)**
- **MySQL for the database**

## Setup and Installation

**Frontend**:

**Clone the repository**:

```sh
git clone https://github.com/MinhTamNT/Compile_outline_FE.git
cd Fe
```

```sh
npm install
```

**Backend**:

```sh
cd CompileOutline
and build project
```

## references

- Tailwind css : [Libarary Tailwind css](https://tailwindcss.com/)
- Mui core : [Libarary Mui Core](https://mui.com/material-ui/getting-started/)
