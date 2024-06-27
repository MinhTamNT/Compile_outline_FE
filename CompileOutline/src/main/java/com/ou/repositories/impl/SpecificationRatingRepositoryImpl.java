package com.ou.repositories.impl;

import com.ou.pojo.SpecificationRating;
import com.ou.repositories.SpecificationRatingRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;

@Repository
@Transactional
public class SpecificationRatingRepositoryImpl implements SpecificationRatingRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public void addSpecificationRating(SpecificationRating specificationRating) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(specificationRating);
    }

    @Override
    public void deleteSpecificationRating(int ratingId) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(s.get(SpecificationRating.class, ratingId));
    }
}
