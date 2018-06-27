package com.shuai.service.impl;

import com.shuai.entity.User;
import com.shuai.repository.UserMapper;
import com.shuai.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
	
	@Resource
	private UserMapper userMapper;

	@Override
	public User getUser(int userId) {
		
		return userMapper.selectByPrimaryKey(userId);
	}

	@Override
	public void addUser(User user) {
		
		userMapper.insert(user);
	}

	@Override
	public void deleteUser(int userId) {
		
		userMapper.deleteByPrimaryKey(userId);
	}

	@Override
	public void updateUser(User user) {
		
		userMapper.updateByPrimaryKeySelective(user);
	}

	@Override
	public User getUserByAccount(String account) {
		
		return userMapper.getUserByAccount(account);
	}

	@Override
	public List<User> getUserList() {

		return userMapper.getUserList();
	}

}
