<template>
  <div>
    <!--
      <HelloWorld></HelloWorld>
    -->
    <v-btn class="ma-2" outlined color="deep-orange" to="/ajax-test">
      Ajax test
    </v-btn> 
    <v-btn class="ma-2" outlined color="deep-orange" to="/signup">
      Sign Up
    </v-btn> 
    <v-btn class="ma-2" outlined color="deep-orange" to="/signin">
      Sign In
    </v-btn> 
    <v-btn class="ma-2" outlined color="deep-orange" to="/login-user">
      Login Test User
    </v-btn> 
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";

export default {
  components: {
    HelloWorld
  }
};
</script>
