<template>
  <div>
    <!--
      <HelloWorld></HelloWorld>
    -->
    <v-btn class="ma-2" outlined color="deep-orange" to="/ajax_test">
      Ajax test
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
