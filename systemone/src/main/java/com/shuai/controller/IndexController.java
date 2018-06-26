package com.shuai.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 首页控制器
 *
 * @author shuaion 2018/6/25
 **/
@Controller
@RequestMapping("/index")
public class IndexController {

    @RequestMapping("/welcome")
    public String index(){
        return "index";
    }

    @RequestMapping("/loginSuccess")
    public String loginSuccess(){

       return "success";
    }

    @RequestMapping("/failureUrl")
    public String failureUrl(){

        return "fail";
    }
}
