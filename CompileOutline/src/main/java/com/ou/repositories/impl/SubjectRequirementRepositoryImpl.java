package com.ou.repositories.impl;

import com.ou.pojo.SubjectRequirement;
import com.ou.pojo.SubjectRequirementId;
import com.ou.repositories.SubjectRequirementRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Query;

@Repository
@Transactional
public class SubjectRequirementRepositoryImpl implements SubjectRequirementRepository {
    @Autowired
    private LocalSessionFactoryBean factory;
    @Override
    public void addOrUpdateSubjectRequirement(SubjectRequirement subjectRequirement) {
        Session s = this.factory.getObject().getCurrentSession();
        s.saveOrUpdate(subjectRequirement);
    }

    @Override
    public SubjectRequirement getSubjectRequirementById(int subjectId, int subjectRequirementId) {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("SubjectRequirement.findBySubject_IdAndSubjectRequirements_Id");
        q.setParameter("subjectId", subjectId);
        q.setParameter("subjectRequirementsId", subjectRequirementId);
        return (SubjectRequirement) q.getSingleResult();
    }

    @Override
    public void deleteSubjectRequirementById(int subjectId, int subjectRequirementId) {
        Session s = this.factory.getObject().getCurrentSession();
        try{
            SubjectRequirement sr = this.getSubjectRequirementById(subjectId, subjectRequirementId);
            s.delete(sr);
        }
        catch(Exception e){
            e.printStackTrace();
        }
    }
}
