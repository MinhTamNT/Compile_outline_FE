package com.ou.repositories;

import com.ou.pojo.Admin;
import com.ou.pojo.User;

import java.util.List;

public interface AdminRepository {
    List<Admin> getAllAdmins();
    void addAdmin(User u);
}
