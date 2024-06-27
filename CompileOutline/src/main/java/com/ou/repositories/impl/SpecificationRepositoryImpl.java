package com.ou.repositories.impl;


import com.ou.pojo.*;
import com.ou.repositories.SpecificationRepository;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;

import javax.persistence.Query;
import javax.persistence.criteria.*;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
@Transactional
public class SpecificationRepositoryImpl implements SpecificationRepository {
    @Autowired
    private LocalSessionFactoryBean factory;

    @Override
    public List<Specification> getAllSpecification() {
        Session s = factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Specification.findAll");
        return q.getResultList();
    }

    @Override
    public List<Subject> getAllSubjectNoAssignment() {
        Session session = factory.getObject().getCurrentSession();
        Query query = session.createNamedQuery("Subject.findAllUnassigned");
        return query.getResultList();
    }


    @Override
    public List<Specification> getListSpecificationOfLecturerId(int lecturerId) {
        Session s = factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Specification.findByLecturerUser_Id");
        q.setParameter("id", lecturerId);
        return q.getResultList();
    }
//    @Override
//    public List<Specification> getSpecificationByLecturer(int lecturerId) {
//        Session s = factory.getObject().getCurrentSession();
//        Query q = s.createNamedQuery("Specification.findByAssignments_LecturerUser_Id");
//        q.setParameter("id", lecturerId);
//        return q.getResultList();
//    }

    @Override
    public Specification getSpecificationById(int specificationId) {
        Session s = factory.getObject().getCurrentSession();
        return s.get(Specification.class, specificationId);
    }

    @Override
    public void createOrUpdateSpecification(Specification specification) {
        Session s = factory.getObject().getCurrentSession();
        if (specification.getId() != null && specification.getId() > 0) {
            s.update(specification);
        } else {
            s.save(specification);
        }
    }

    @Override
    public List<Subject> findAllUnassignedSubjectsIncludingCurrent(int currentAssignmentId) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createNamedQuery("Subject.findAllUnassignedIncludingCurrent");
        query.setParameter("currentSubjectId", currentAssignmentId);
        return query.getResultList();
    }

    @Override
    public List<Specification> findBySubjectAndYear(Subject subject, int year) {
        Session session = this.factory.getObject().getCurrentSession();
        Query query = session.createQuery("select s from Specification s join s.years y where s.subject = :subject and y.id = :year");
        query.setParameter("subject", subject);
        query.setParameter("year", year);
        System.out.println(subject);
        System.out.println(year);
        System.out.println(query.getResultList());
        return query.getResultList();
    }

    @Override
    public List<Specification> findSpecSubmitted() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createNamedQuery("Specification.findByIsSubmittedTrue");
        return q.getResultList();
    }

    public List<Map<String, Object>> getSpecifications(Map<String, String> params, Boolean isAdmin) {
        Session session = this.factory.getObject().getCurrentSession();
        CriteriaBuilder b = session.getCriteriaBuilder();
        CriteriaQuery<Object[]> q = b.createQuery(Object[].class);
        List<Predicate> predicates = new ArrayList<>();

        Root<Specification> rS = q.from(Specification.class);

        Join<Specification, Subject> specSubjectJoin = rS.join("subject", JoinType.INNER);
        Join<Specification, Year> specYearJoin = rS.join("years", JoinType.INNER);
        Join<Specification, Lecturer> specLecture = rS.join("lecturerUser", JoinType.INNER);
        Join<Lecturer, User> lecturerUserJoin = specLecture.join("user", JoinType.INNER);
        Join<User, Profile> lecturerProfileJoin = lecturerUserJoin.join("profile", JoinType.INNER);

        q.multiselect(
                rS.get("id"),
                rS.get("credits"),
                specSubjectJoin.get("subjectName"),
                specYearJoin.get("id"),
                specYearJoin.get("year"),
                lecturerProfileJoin.get("fullname")
        ).distinct(true);

        if (!isAdmin) {
            predicates.add(b.equal(rS.get("isSubmitted"), true));
        }

        String subjectName = params.get("subjectName");
        if (subjectName != null && !subjectName.isEmpty()) {
            predicates.add(b.like(specSubjectJoin.get("subjectName"), String.format("%%%s%%", subjectName)));
        }

        String year = params.get("year");
        if (year != null && !year.isEmpty()) {
            predicates.add(b.equal(specYearJoin.get("year"), Integer.parseInt(year)));
        }

        String credits = params.get("credits");
        if (credits != null && !credits.isEmpty()) {
            predicates.add(b.equal(rS.get("credits"), Integer.parseInt(credits)));
        }

        String lecturerName = params.get("lectureName");
        if (lecturerName != null && !lecturerName.isEmpty()) {
            predicates.add(b.like(lecturerProfileJoin.get("fullname"), String.format("%%%s%%", lecturerName)));
        }

        q.where(predicates.toArray(new Predicate[0]));

        List<Object[]> resultList = session.createQuery(q).getResultList();

        List<Map<String, Object>> specifications = new ArrayList<>();
        Map<Integer, Map<String, Object>> specMap = new HashMap<>();

        for (Object[] result : resultList) {
            Integer specId = (Integer) result[0];

            if (!specMap.containsKey(specId)) {
                Map<String, Object> specDetails = new HashMap<>();
                specDetails.put("id", result[0]);
                specDetails.put("credits", result[1]);
                specDetails.put("subject", result[2]);
                specDetails.put("years", new ArrayList<>());
                specDetails.put("lecturerName", result[5]);

                specifications.add(specDetails);
                specMap.put(specId, specDetails);
            }

            Map<String, Object> specDetails = specMap.get(specId);
            List<Map<String, Object>> years = (List<Map<String, Object>>) specDetails.get("years");

            Map<String, Object> yearInfo = new HashMap<>();
            yearInfo.put("id", result[3]);
            yearInfo.put("year", result[4]);

            years.add(yearInfo);
        }

        return specifications;


    }


}
