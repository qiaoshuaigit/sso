package com.shuai.service;

import java.util.List;

public interface RoleService {
	
	/**
	 * @description 获取权限
	 */
	List<String> getPermissions(String account);
	
	/**
	 * @description 获取角色
	 */
	List<String> getRoles(String account);
}
