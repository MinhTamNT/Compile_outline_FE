package com.ou.pojo;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@Entity
@Table(name = "rating")
@NamedQueries({
        @NamedQuery(name = "Rating.findAll", query = "select r from Rating r")
})
public class Rating {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "method", length = 45)
    @NotEmpty(message = "Vui lòng chọn")
    private String method;

}