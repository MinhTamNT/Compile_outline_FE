package com.ou.services.impl;

import com.ou.pojo.Profile;
import com.ou.repositories.ProfileRepository;
import com.ou.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {
    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public void updateProfile(Profile profile) {
        this.profileRepository.updateProfile(profile);
    }

    @Override
    public Profile getProfile(int id) {
        return this.profileRepository.getProfileById(id);
    }
}
