<template>
  <div>
  <v-btn class="ma-2" outlined color="deep-orange" to="/">
    Home
  </v-btn>
  <br>
  <v-btn class="ma-2" outlined color="deep-orange" @click="getHealth">Health Cheeck</v-btn>
  <p>{{get_health_result}}</p>
  <v-btn class="ma-2" outlined color="deep-orange" @click="getRest">Get Golang REST API</v-btn>
  <p>{{get_rest_result}}</p>

  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
    <v-text-field v-model="textfield" :counter="10" label="text field" required></v-text-field>
    <v-btn class="ma-2" outlined color="deep-orange" @click="postRest">POST Golang REST API</v-btn>
  </v-form>
    
  <p>{{post_rest_result}}</p>
  </div>
</template>

<script>
const base_url = "/api/ex-golang"
export default {
  name: "AjaxTest",
  data:()=>({
      get_health_result: 'health checkの結果',
      get_rest_result: 'get golang serverの結果',
      post_rest_result: 'post golang serverの結果',
      textfield: '',
      valid: true,
      lazy: false,
      counter: 0,
    }
  ),
  //computed: mapGetters(['getGoHealthUrl', 'getGoRestUrl']),
  methods: {
    getHealth() {
      this.get_health_result = 'Healt check中';
      this.$axios.get(base_url + '/health')
        .then((res) => {
          this.get_health_result = res.data;
        })
        .catch((res) => {
          console.log(res);
          this.get_health_result = "health check 失敗";
        });
    },
    getRest() {
      this.get_rest_result = 'golang data 取得中';

      /*
      const params = new URLSearchParams();
      params.append('name', "name")
      */
       
      const data = {
        name: "name",
      };
      /*url?name=name
      {params: data}
      */
        
    
      this.$axios.get(base_url + '/rest-api', {params: data})
        .then((res) => {
          console.log(res);
          this.get_rest_result  = res.data;
                
        })
        .catch((res) => {
          console.log(res);
          this.get_rest_result = "golang rest 失敗";
        })
    },
    postRest() {
      this.post_rest_result = 'golang post 中';
      this.counter += 1;

      let params = new URLSearchParams();
      params.append("name", "name")
      params.append("description", "test")
      params.append("data", this.textfield)
      params.append("id", this.counter)
       
      this.$axios.post(base_url + '/rest-api', params)
        .then((res) => {
          console.log(res);
          this.post_rest_result  = res.data;
          this.textfield = "";
        })
        .catch((res) => {
          console.log(res);
          this.post_rest_result = "golang rest 失敗";
        })
    },
  }
}
</script>