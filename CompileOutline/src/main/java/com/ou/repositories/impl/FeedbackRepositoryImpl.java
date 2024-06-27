package com.ou.repositories.impl;

import com.ou.pojo.Feedback;
import com.ou.repositories.FeedbackRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class FeedbackRepositoryImpl implements FeedbackRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Feedback> getFeedbacksBySpecId(int spectId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Feedback.findBySpecification_Id");
        q.setParameter("id", spectId);
        return q.getResultList();
    }

    @Override
    public Feedback getFeedbackById(int feedbackId) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Feedback.class, feedbackId);
    }

    @Override
    public void saveFeedback(Feedback feedback) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(feedback);
    }

    @Override
    public void deleteFeedback(int feedbackId) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(s.get(Feedback.class, feedbackId));
    }
}
