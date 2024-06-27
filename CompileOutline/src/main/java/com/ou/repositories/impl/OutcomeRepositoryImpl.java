package com.ou.repositories.impl;

import com.ou.pojo.Outcome;
import com.ou.repositories.OutcomeRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class OutcomeRepositoryImpl implements OutcomeRepository {
    @Autowired
    public LocalSessionFactoryBean factory;
    @Override
    public void addOrUpdateOutcome(Outcome outcome) {
        Session s = this.factory.getObject().getCurrentSession();
        if(outcome.getId() != null){
            s.update(outcome);
        }
        else {
            s.save(outcome);
        }
    }

    @Override
    public Outcome getOutcomeById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Outcome.class, id);
    }

    @Override
    public void deleteOutcomeById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(this.getOutcomeById(id));
    }
}