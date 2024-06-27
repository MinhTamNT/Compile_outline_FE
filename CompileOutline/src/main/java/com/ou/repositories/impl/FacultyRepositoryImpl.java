package com.ou.repositories.impl;

import com.ou.pojo.Faculty;
import com.ou.pojo.Lecturer;
import com.ou.pojo.Student;
import com.ou.repositories.FacultyRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class FacultyRepositoryImpl implements FacultyRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Faculty> getFaculties() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Faculty.findAll");
        return q.getResultList();
    }

    @Override
    public void addOrUpdate(Faculty faculty) {
        Session s = this.factory.getObject().getCurrentSession();
        if(faculty.getId() != null && faculty.getId() > 0){
            s.update(faculty);
        }
        else {
            s.save(faculty);
        }
    }

    @Override
    public Faculty getFacultyById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Faculty.class, id);
    }

    @Override
    public Faculty getFacultyOfLecturerId(int lecturerId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Lecturer.findById");
        q.setParameter("id", lecturerId);
        Lecturer l = (Lecturer) q.getSingleResult();
        return l.getFaculty();
    }

    @Override
    public Faculty getFacultyOfStudentId(int studentId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Student.findById");
        q.setParameter("id", studentId);
        Student student = (Student) q.getSingleResult();
        return student.getFaculty();
    }

    @Override
    public void deleteFaculty(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        Faculty f = this.getFacultyById(id);
        s.delete(f);
    }

}
