<template>
  <div>
    <v-btn class="ma-2" outlined color="deep-orange" to="/">
      Home
    </v-btn>
    <p>アカウントを持っていない場合</p>
    <v-btn class="ma-2" outlined color="deep-orange" to="/signup">
      Sign Up
    </v-btn>
  <div v-if="userStatus" key="login">
    <h2>{{username}} がログイン済みです</h2>
  </div>
  <div v-else key="login_process">
    <h2>Sign In</h2>
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
    <v-btn class="ma-2" outlined color="deep-orange" @click="signIn">Sign In</v-btn>
    
    </v-form>
  </div>
  </div>
</template>

<script>
import Firebase from "../firebase"
export default {
  name: 'Signin',
  data: () => ({
      email: '',
      password: '',
      rules: {
          required: v => !!v||'Required.',
          min: v => v.length >= 8||'Min 8 characters',
      },
      valid: true,
      lazy: false,
  }),
  computed: {
    username() {
      return this.$store.getters.name
    },
    userStatus() {
      //return true in login state
      return this.$store.getters.isSignedIn
    },
  },
  methods: {
    signIn() {
      Firebase.signInWithEmailAndPassword(this.email, this.password);
    },
  },
  /*更新時に処理したい場合
  watch: {
    username() {
      this.$nextTick(() => {
        console.log("更新されました")
      })
    }
  }
  */
    
}
</script>