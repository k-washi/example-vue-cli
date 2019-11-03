<template>
  <div>
    <v-btn class="ma-2" outlined color="deep-orange" to="/">ホーム</v-btn>

    <UserInfoUpdate />
    <hr>
    <h2>ユーザーに関する問い合わせ</h2>
    <p>result: {{queryResutlWithJWT}}</p>
    <v-btn class="ma-2" outlined color="deep-orange" @click="getUserInfo">情報取得</v-btn> 
    <hr>
    <v-btn class="ma-2" outlined color="deep-orange" @click="logOut">Logout</v-btn>
  </div>
</template>

<script>
const base_url = "/api/ex-jwt"

import UserInfoUpdate from "../components/UserInfoUpdate"
import Firebase from "../firebase"
export default {
  name: "LoginUser",
  data: () => ({
    queryResutlWithJWT: "jwt認可の結果",
  }),
  components: {
    UserInfoUpdate,
  },
  computed: {},
  methods: {
    getUserInfo(){
      //header Auth bearer set
      /* eslint-disable no-console */
      console.log("jwt", `${localStorage.getItem('jwt')}`);
      /* eslint-enable no-console */ 
      const headers = {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
      this.queryResutlWithJWT = "jwt認可によるユーザー情報取得中"
      this.$axios.get(base_url + '/jwt/ex-jwt-auth', {headers: headers, data: {}})
        .then(res => {
          /* eslint-disable no-console */
          console.log("Response", res.data);
          /* eslint-enable no-console */
          this.queryResutlWithJWT  = res.data;
                
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.log("Errpr: ", err);
          /* eslint-enable no-console */
          
          this.queryResutlWithJWT = "jwt認可によるユーザー情報取得 失敗";
        })
    },
    
    logOut() {
      Firebase.logOut()
      this.$router.push("/")
    }
  }
  
}
</script>