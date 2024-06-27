package com.ou.repositories.impl;

import com.ou.pojo.Lecturer;
import com.ou.repositories.LecturerRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class LecturerRepositoryImpl implements LecturerRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Lecturer> getAllLecturer() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Lecturer.findAll");
        return q.getResultList();
    }

    @Override
    public List<Lecturer> getLecturerByFacultyId(int facultyId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Lecturer.findByFaculty");
        q.setParameter("facultyId", facultyId);
        return q.getResultList();
    }

    @Override
    public void updateLecturer(Lecturer lecturer) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(lecturer);
    }

    @Override
    public Lecturer getLecturerById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Lecturer.class, id);
    }

    @Override
    public void addLecturer(Lecturer lecturer) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(lecturer);
    }
}
