package com.shuai.service.impl;

import com.shuai.repository.PermissionMapper;
import com.shuai.repository.RoleMapper;
import com.shuai.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {
	@Autowired
	private RoleMapper roleMapper;
	@Autowired
	private PermissionMapper permissionMapper;

	@Override
	public List<String> getPermissions(String account) {
		
		return permissionMapper.getPermissions(account);
	}

	@Override
	public List<String> getRoles(String account) {
		
		return roleMapper.getRoles(account);
	}

}
