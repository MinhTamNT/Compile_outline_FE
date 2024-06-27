package com.ou.repositories;

import com.ou.pojo.User;

public interface UserRepository {
    User getUserById(int id);

    User getUserByUsername(String username);

    void addOrUpdateUser(User user);

    boolean authUser(String username, String password);

    boolean userExistByName(String username);

    void updateRequired(User user) throws Exception;

    boolean isCheckPhone (String phone);

}
