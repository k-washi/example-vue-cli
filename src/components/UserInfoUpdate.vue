<template>
  <div id="UserInfoUpdate">
    <h2>ユーザー情報の更新 {{username}}</h2>
    <v-form ref="form" v-model="valid" :lazy-validation="lazy">
      <v-text-field v-model="usernamefield" label="ユーザネーム" required></v-text-field>
      <v-btn class="ma-2" outlined color="deep-orange" @click="dialogOpen">
            設定の更新
      </v-btn>
      <p>{{queryResutlWithAuth}}</p>
    </v-form>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          ユーザー名の変更
        </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="email" 
              label="email" 
              type="email" 
              required
              ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field 
              v-model="password" 
              label="password" 
              type="password" 
              hint="At least 8 characters"
              :rules="[rules.required, rules.min]" 
              required
            ></v-text-field>
          </v-col>
        </v-form> 
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
           <v-btn class="ma-2" outlined color="deep-orange" @click.stop="dialog = false">閉じる</v-btn>
          <v-btn class="ma-2" outlined color="deep-orange" @click="userConfig">設定の更新</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
const base_url = "/api/ex-jwt"
import Firebase from "../firebase"
import firebase from "firebase/app"
export default {
  name: "UserInfoUpdate",
  data: () => ({
    email: '',
    password: '',
    rules: {
        required: v => !!v||'Required.',
        min: v => v.length >= 8||'Min 8 characters',
    },
    valid: true,
    lazy: false,
    usernamefield: "",
    queryResutlWithAuth: "認証の結果",
    dialog: false,

  }),
  computed: {
    username() {
      return this.$store.getters.name
    },
  },
  methods: {
    dialogOpen() {
      if (this.usernamefield !== "") {
        this.dialog = true;
      }
    },
    userConfig() {
      //update user config
      const usernamefield = this.usernamefield;
      if (usernamefield !== "") {
        const email = this.email;
        const password = this.password;
        //header Auth bearer set
        const headers = {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
        this.queryResutlWithAuth = "認証によるユーザー情報取得中"
        this.$axios.get(base_url + '/auth/ex-authentication', {headers: headers, data: {}})
        .then(res => {
          /* eslint-disable no-console */
          console.log("Response", res.data);
          /* eslint-enable no-console */
          
          if (res.data.status === 200) {
            this.queryResutlWithAuth  = res.data;
            Firebase.updateUserConfig(usernamefield);
            
          } else if (res.data.status === 202) {
            let user = firebase.auth().currentUser;
            let cred = firebase.auth.EmailAuthProvider.credential(
              email, password
            )
            user.reauthenticateWithCredential(cred).then(res => {
              //新しいトークンが発行される
              res.user.getIdToken().then(idToken => {
                localStorage.setItem('jwt', idToken); 
                const headers = {'Authorization': `Bearer ${localStorage.getItem('jwt')}`}
                this.$axios.get(base_url + '/auth/ex-authentication', {headers: headers, data: {}})
                .then(authres => {
                  /* eslint-disable no-console */
                  console.log("Response2", authres.data);
                  /* eslint-enable no-console */
                  if (authres.data.status === 200) {
                    this.queryResutlWithAuth = authres.data;
                    Firebase.updateUserConfig(usernamefield);
                  } else {
                    this.queryResutlWithAuth = "認証によるユーザー情報取得 失敗"
                  }
              }).catch((e) => {
                /* eslint-disable no-console */
                console.log("Error: ", e);
                /* eslint-enable no-console */
                
                this.queryResutlWithAuth = "認証によるユーザー情報取得 失敗";
              })
              })
              
            }).catch(err => {
              /* eslint-disable no-console */
              console.log("Error: ", err);
              /* eslint-enable no-console */
              this.queryResutlWithAuth = "認証によるユーザー情報取得 失敗";
              
            })
          } else {
            this.queryResutlWithAuth = "ユーザー名とパスワードが異なる 失敗"
          } 
        })
        .catch((err) => {
          /* eslint-disable no-console */
          console.log("Errpr: ", err);
          /* eslint-enable no-console */
          
          this.queryResutlWithAUth = "認証によるユーザー情報取得 失敗";
        })
      }
      this.dialog = false;
      this.usernamefield = "";
      this.email = ""
      this.password = ""
      //get user config
      //Firebase.onAuth();
    },
  }
  
}
</script>