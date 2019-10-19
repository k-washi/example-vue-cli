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

export default {
  name: "AjaxTest",
  data:()=>({
      health_path: '/api/ex-golang/health',
      get_health_result: 'health checkの結果',

      rest_path: '/api/ex-golang/rest-api',
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

        this.$axios.get(this.$store.getters.getGoHealthUrl)
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
        const params = new URLSearchParams();
        params.append('name', "name")
    
        this.$axios.get(this.$store.getters.getGoRestUrl, params)
            .then((res) => {
                
                this.get_rest_result  = res.data;
                
            })
            .catch((res) => {
                this.get_rest_result = "golang rest 失敗";
            })
    },
    postRest() {
        this.post_rest_result = 'golang post 中';
        this.counter += 1;

        let params = new URLSearchParams();
        params.append("name", "name")
        params.append("description", "test")
        params.append("data", {"id": 1, "name": this.textfield })

        this.$axios.post(this.$store.getters.getGoRestUrl, params)
            .then((res) => {
                this.post_rest_result  = res.data;
            })
            .catch((res) => {
                this.post_rest_result = "golang rest 失敗";
            })
    },
  }
}
</script>