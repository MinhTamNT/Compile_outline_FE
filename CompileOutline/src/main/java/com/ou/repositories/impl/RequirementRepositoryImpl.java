package com.ou.repositories.impl;

import com.ou.pojo.Requirement;
import com.ou.repositories.RequirementRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class RequirementRepositoryImpl implements RequirementRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Requirement> getAllRequirements() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Requirement.findAll");
        return q.getResultList();
    }
}