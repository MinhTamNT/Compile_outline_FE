package com.ou.repositories.impl;

import com.ou.pojo.Student;
import com.ou.repositories.StudentRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class StudentRepositoryImpl implements StudentRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Student> getAllStudent() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Student.findAll");
        return q.getResultList();
    }

    @Override
    public Student getStudentById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Student.class, id);
    }

    @Override
    public void updateStudent(Student student) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(student);
    }

    @Override
    public void addStudent(Student student) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(student);
    }
}
