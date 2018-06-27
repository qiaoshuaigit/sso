package com.shuai.controller;

import com.shuai.entity.User;
import com.shuai.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * @author shuaion 2018/6/26
 **/
@Controller
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("getUsers")
    public Object getUser(Model model, HttpServletRequest request){

        List<User> users = userService.getUserList();

        System.out.println(users.get(0).getUsername());

        //request.setAttribute("userList",users);
        model.addAttribute("userList",users);

        return "user/list";
    }

}
