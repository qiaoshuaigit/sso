package com.shuai.controller;

import com.shuai.service.UserService;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 首页控制器
 *
 * @author shuaion 2018/6/25
 **/
@Controller
@RequestMapping("/index")
public class IndexController {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private UserService userService;

    @RequestMapping("/welcome")
    public String index(){
        Session session = SecurityUtils.getSubject().getSession();
        return "index";
    }

    @RequestMapping("/loginSuccess")
    public String loginSuccess(Model model, HttpServletRequest request){


        String user = (String) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("user", user);
        logger.info(user+" 登录成功,获取用户菜单");

        //登录成功之后 获取菜单
        List<Map<String, Object>> menus = userService.getMenuByUser(user);
        List<Map<String, Object>> parents = new ArrayList<Map<String, Object>>();
        List<Map<String, Object>> childs = null;
        for (Map<String, Object> menu : menus) {
            if ("0".equals(String.valueOf(menu.get("parent_id")))) {
                childs = new ArrayList<Map<String, Object>>();
                for (int i = 0; i < menus.size(); i++) {
                    if (menu.get("id").toString().equals(menus.get(i).get("parent_id").toString())) {
                        childs.add(menus.get(i));
                    }
                }
                menu.put("childs", childs);
                parents.add(menu);
            }
        }
        request.setAttribute("menus", parents);
        request.getSession().setAttribute("menus", parents);

       return "home";
    }

    @RequestMapping("/failureUrl")
    public String failureUrl(){

        return "fail";
    }
}
