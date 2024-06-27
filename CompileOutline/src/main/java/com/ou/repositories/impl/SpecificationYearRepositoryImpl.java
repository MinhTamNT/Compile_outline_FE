package com.ou.repositories.impl;

import com.ou.pojo.SpecificationYear;
import com.ou.pojo.Year;
import com.ou.repositories.SpecificationYearRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public class SpecificationYearRepositoryImpl implements SpecificationYearRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public Year getYearById(int id) {
        Session s = this.factory.getObject().getCurrentSession();
        return s.get(Year.class, id);
    }

    @Override
    public void addSpecificationYear(SpecificationYear specificationYear) {
        Session s = this.factory.getObject().getCurrentSession();
        try{
            s.saveOrUpdate(specificationYear);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
