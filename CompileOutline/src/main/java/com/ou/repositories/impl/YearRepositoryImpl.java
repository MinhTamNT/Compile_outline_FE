package com.ou.repositories.impl;

import com.ou.pojo.Year;
import com.ou.repositories.YearRepository;
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
import java.util.List;

@Repository
@Transactional
public class YearRepositoryImpl implements YearRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public List<Year> getYears() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Year.findAll");
        return q.getResultList();
    }

    @Override
    public void addOrUpdateYear(Year year) {
        Session s = this.factory.getObject().getCurrentSession();
        if(year.getId() == null) {
            s.save(year);
        }
        else{
            s.update(year);
        }
    }

    @Override
    public Year getYearById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Year.class, id);
    }

    @Override
    public Year getYearByYearmame(int yearName) {
        Session s = this.factory.getObject().getCurrentSession();
//        CriteriaBuilder builder = s.getCriteriaBuilder();
//        CriteriaQuery<Year> query = builder.createQuery(Year.class);
//        Root<Year> root = query.from(Year.class);
//        Predicate predicate = builder.equal(root.get("year"), yearName);
//        query.select(root).where(predicate);
//        List<Year> rs = s.createQuery(query).getResultList();
//        return rs.isEmpty() ? null : (Year) rs.get(0);
        Query q = s.createNamedQuery("Year.findByYear");
        q.setParameter("year", yearName);
        List<Year> years = q.getResultList();
        return years.isEmpty() ? null : (Year) years.get(0);
    }


    @Override
    public void deleteYear(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        s.delete(s.get(Year.class, id));
    }
}
