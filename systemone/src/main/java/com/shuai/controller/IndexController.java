package com.shuai.controller;

import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 首页控制器
 *
 * @author shuaion 2018/6/25
 **/
@Controller
@RequestMapping("/index")
public class IndexController {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @RequestMapping("/welcome")
    public String index(){
        return "index";
    }

    @RequestMapping("/loginSuccess")
    public String loginSuccess(Model model){
        String user = (String) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("user", user);
        logger.info(user+" 登录成功,获取用户菜单");

       return "success";
    }

    @RequestMapping("/failureUrl")
    public String failureUrl(){

        return "fail";
    }
}
