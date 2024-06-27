package com.ou.repositories.impl;

import com.ou.pojo.Feedback;
import com.ou.pojo.Specification;
import com.ou.repositories.StatsRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class StatsRepositoryImpl implements StatsRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public Long countStudent() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Student.count");
        return (Long) q.getSingleResult();
    }

    @Override
    public Long countSubject() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Subject.count");
        return (Long) q.getSingleResult();
    }

    @Override
    public Long countSubmitSpecification() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Specification.countByIsSubmittedTrue");
        return (Long) q.getSingleResult();
    }

    @Override
    public List<Object[]> statsSpecSubmit(int year, String period) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root<Specification> root = q.from(Specification.class);

        q.multiselect(b.function(period, Integer.class, root.get("createdAt")), b.count(root));

        List<Predicate> predicates = new ArrayList<Predicate>();
        predicates.add(b.equal(b.function("YEAR", Integer.class, root.get("createdAt")), year));

        q.where(predicates.toArray(Predicate[]::new));
        q.groupBy(b.function(period, Integer.class, root.get("createdAt")));
        q.orderBy(b.asc(b.function(period, Integer.class, root.get("createdAt"))));
        List<Object[]> results = s.createQuery(q).getResultList();
        return results;
    }

    @Override
    public List<Object[]> statsFeedback(int specId) {
        Session s = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = s.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);

        Root<Feedback> root = q.from(Feedback.class);
        q.multiselect(root.get("classify"), b.count(root.get("id")));
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(b.equal(root.get("specification"), specId));
        q.where(predicates.toArray(Predicate[]::new));
        q.groupBy(root.get("classify"));
        List<Object[]> results = s.createQuery(q).getResultList();
        return results;
    }
}
