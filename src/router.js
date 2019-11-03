import Vue from "vue";
import Router from "vue-router";

import Home from "@/views/Home.vue";
import AjaxTest from "@/views/AjaxTest.vue";
import Signup from "@/components/FBSignup.vue";
import Signin from "@/components/FBSignin.vue"
import LoginUser from "@/views/LoginUser.vue";

import Firebase from "./firebase"
import store from "./store"


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    /*
    
    */
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/ajax-test",
      name: "ajax_test",
      component: AjaxTest,
      

    },
    {
      path: "/signup",
      name: "signUp",
      component: Signup,
      //meta: {requiresAuth: true},

    },
    {
      path: "/signin",
      name: "signIn",
      component: Signin,
     
    },
    {
      path: "/login-user",
      name: "loginUser",
      component: LoginUser,
      meta: {requiresAuth: true},
     
    },
    {
      path: "*",
      redirect: '/'
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    //戻るによる遷移は以前の位置を保持
    if(savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {selector: to.hast}
      } else {
        return {x: 0, y: 0}
      }
    }
  }
});

router.beforeEach((to, from, next) => {
  /*
  let currentUserStatus = store.getters["isSignedIn"];
  if (!currentUserStatus) {
    Firebase.onAuth();
    currentUserStatus = store.getters["isSignedIn"];
  }
  */

  Firebase.onAuth();
  let currentUserStatus = store.getters["isSignedIn"];
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (!requiresAuth ) {
    next()
  } else if (requiresAuth && !currentUserStatus) {
    next('/signin');
  } else {
    next();
  }
  
})


export default router