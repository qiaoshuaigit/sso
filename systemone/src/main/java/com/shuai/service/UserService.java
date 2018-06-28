package com.shuai.service;


import com.shuai.entity.User;

import java.util.List;
import java.util.Map;

public interface UserService {
	
	User getUser(int userId);
	
	void addUser(User user);
	
	void deleteUser(int userId);
	
	void updateUser(User user);
	
	/**
	 * @description 获取用户信息
	 * @author wchuang
	 * @time 2016年8月22日 下午12:01:15
	 */
	User getUserByAccount(String account);

	List<User> getUserList();

	List<Map<String,Object>> getMenuByUser(String userName);


}
