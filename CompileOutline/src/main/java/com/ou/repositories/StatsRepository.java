package com.ou.repositories;

import java.util.List;

public interface StatsRepository {
    Long countStudent();
    Long countSubject();
    Long countSubmitSpecification();
    List<Object[]> statsSpecSubmit(int year, String period);
    List<Object[]> statsFeedback(int specId);
}
