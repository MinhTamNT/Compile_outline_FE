package com.ou.repositories.impl;

import com.ou.pojo.Lecturer;
import com.ou.pojo.Profile;
import com.ou.pojo.User;
import com.ou.repositories.UserRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.List;

@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Autowired
    private BCryptPasswordEncoder passEncoder;


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public User getUserById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(User.class, id);
    }

    @Override
    public User getUserByUsername(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("User.findByUsername");
        q.setParameter("username", username);
        return (User) q.getSingleResult();
    }


    @Override
    public void addOrUpdateUser(User user) {
        Session s = this.factory.getObject().getCurrentSession();
        if (user.getId() == null) {
            s.save(user);
        } else {
            s.update(user);
        }
    }

    @Override
    public boolean authUser(String username, String password) {
        User user = this.getUserByUsername(username);
        return this.passEncoder.matches(password, user.getPassword());
    }

    @Override
    public boolean userExistByName(String username) {
        try {
            Session s = this.factory.getObject().getCurrentSession();
            Query q = s.createQuery("FROM User WHERE username = :username");
            q.setParameter("username", username);
            return !q.getResultList().isEmpty();
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public void updateRequired(User user) throws Exception {
        try {
            Session session = this.factory.getObject().getCurrentSession();
            Instant currentTime = Instant.now();
            user.getProfile().setDateJoined(LocalDate.ofInstant(currentTime, ZoneOffset.UTC));
            session.update(user);
        } catch (Exception exception) {
            throw new Exception(exception);
        }
    }

    @Override
    public boolean isCheckPhone(String phone) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("SELECT s from User s where s.profile.phone =: phoneNumber");
        query.setParameter("phoneNumber", phone);
        List<User> result = query.getResultList();

        return !result.isEmpty();
    }


}
