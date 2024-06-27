package com.ou.repositories.impl;

import com.ou.pojo.Rating;
import com.ou.repositories.RatingRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class RatingRepositoryImpl implements RatingRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Rating> getRatings() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Rating.findAll");
        return q.getResultList();
    }
}
