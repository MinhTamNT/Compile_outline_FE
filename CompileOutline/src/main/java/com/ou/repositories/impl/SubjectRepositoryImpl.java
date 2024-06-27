package com.ou.repositories.impl;

import com.ou.pojo.Subject;
import com.ou.repositories.SubjectRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class SubjectRepositoryImpl implements SubjectRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Subject> getSubjects() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Subject.findAll");
        return q.getResultList();
    }

    @Override
    public void addOrUpdate(Subject subject) {
        Session s = this.factory.getObject().getCurrentSession();
        if (subject.getId() != null && subject.getId() > 0) {
            s.update(subject);
        } else {
            s.save(subject);
        }
    }

    @Override
    public Subject getSubjectById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Subject.class, id);
    }

    @Override
    public void deleteSubject(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(this.getSubjectById(id));
    }
}
