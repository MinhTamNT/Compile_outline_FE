package com.ou.repositories.impl;

import com.ou.pojo.Profile;
import com.ou.repositories.ProfileRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;

@Repository
@Transactional
public class ProfileRepositoryImpl implements ProfileRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public void updateProfile(Profile profile) {
        Session s = this.factory.getObject().getCurrentSession();
        s.update(profile);
    }

    @Override
    public void addProfile(Profile profile) {
        Session s = this.factory.getObject().getCurrentSession();
        s.save(profile);
    }

    @Override
    public Profile getProfileById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Profile.class, id);
    }
}
