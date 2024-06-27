package com.ou.repositories.impl;

import com.ou.pojo.Objective;
import com.ou.repositories.ObjectiveRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class ObjectiveRepositoryImpl implements ObjectiveRepository {
    @Autowired
    public LocalSessionFactoryBean factory;
    @Override
    public void addOrUpdateObjective(Objective objective) {
        Session s = this.factory.getObject().getCurrentSession();
        if(objective.getId() != null){
            s.update(objective);
        }
        else {
            s.save(objective);
        }
    }

    @Override
    public Objective getObjectiveById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Objective.class, id);
    }

    @Override
    public void deleteObjectiveById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(this.getObjectiveById(id));
    }
}