package com.ou.services.impl;

import com.ou.pojo.Admin;
import com.ou.repositories.AdminRepository;
import com.ou.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;
    @Override
    public List<Admin> getAllAdmins() {
        return this.adminRepository.getAllAdmins();
    }
}
