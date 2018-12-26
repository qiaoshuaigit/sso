package com.shuai.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * 首页控制器
 *
 * @author shuaion 2018/6/25
 **/
@Controller
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/welcome")
    public String index(Model model, HttpServletRequest request){
        Session session = SecurityUtils.getSubject().getSession();
        model.addAttribute("sessionId",session.getId());
        model.addAttribute("sessionstartTime",session.getStartTimestamp());

        Cookie cookies[] = request.getCookies();
        model.addAttribute("cookies",cookies);
        return "index";
    }

    @RequestMapping("/loginSuccess")
    public String loginSuccess(Model model){
        Subject user = SecurityUtils.getSubject();
        model.addAttribute("user",user.getPrincipal());
        return "success";
    }

    @RequestMapping("/failureUrl")
    public String failureUrl(){

        return "fail";
    }
}
