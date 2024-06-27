package com.ou.pojo;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "profile")
public class Profile {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "fullname", length = 45)
    @NotEmpty(message = "Vui Lòng nhập họ và tên")
    private String fullname;

    @Email(message = "Địa chỉ Email không hợp lệ")
    @NotEmpty(message = "Vui Lòng nhập email")
    @Column(name = "email", nullable = false, length = 45)
    private String email;

    @Column(name = "avatar", length = 100)
    private String avatar;

    @Column(name = "date_joined")
    private LocalDate dateJoined;

    @NotEmpty(message = "Vui long nhap số điện thoại")
    @Column(name = "phone", length = 15)
    @NotNull(message = "Vui long nhập số điện thoại")
    private String phone;

    @Column(name = "gender")
    private Boolean gender;


    @Transient
    private MultipartFile file;


}