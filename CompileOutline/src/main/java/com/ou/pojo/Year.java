package com.ou.pojo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "year")
@NamedQueries({
        @NamedQuery(name = "Year.findAll", query = "select y from Year y"),
        @NamedQuery(name = "Year.findByYear", query = "select y from Year y where y.year = :year")
})
public class Year {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "year")
    private Integer year;

}