package com.ou.repositories.impl;

import com.ou.pojo.Admin;
import com.ou.pojo.User;
import com.ou.repositories.AdminRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import java.util.List;

@Repository
@Transactional
public class AdminRepositoryImpl implements AdminRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Admin> getAllAdmins() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Admin.findAll");
        return q.getResultList();
    }

    @Override
    public void addAdmin(User u) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("User.findByUsername");
        q.setParameter("username", u.getUsername());
        User user = (User) q.getSingleResult();
        Admin admin = new Admin();
        admin.setId(user.getId());
        admin.setUser(user);
        s.save(admin);
    }
}
