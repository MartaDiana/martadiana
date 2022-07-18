const app = Vue.createApp({
  data() {
    return {
      cari: "",
      users: [],
      post: [],
      comments: [],
      form: {
        title: "",
        body: "",
      },
    };
  },

  computed: {
    filterUser() {
      const query = this.cari.toLowerCase();
      if (this.cari === "") {
        return this.users;
      }
      return this.users.filter((user) => {
        return Object.values(user).some((word) =>
          String(word).toLowerCase().includes(query)
        );
      });
    },
  },

  mounted() {
    console.log("nempel vue");
    fetch("https://gorest.co.in/public/v2/users")
      .then((res) => res.json())
      .then((json) => {
        this.users = json;
        console.log(json);
      });
    this.PostLoad();
    this.CommentLaod();
  },

  methods: {
    async PostLoad() {
      const response = await fetch("https://gorest.co.in/public/v2/posts");
      const data = await response.json();
      this.post = data;
      console.log(data);
    },

    async CommentLaod() {
      const response = await fetch("https://gorest.co.in/public/v2/comments");
      const data = await response.json();
      this.comments = data;
      console.log(data);
    },

    async save() {
      console.log(1);
      const response = await axios.post(
        "https://gorest.co.in/public/v2/posts",
        {
          title: "test title",
        },
        {
          headers: {
            Authorization:
              "Bearer d7666eb7b6d38314bb70a670b27047a3d80c9d8dac93bce2ee1a9bad2c608b14",
          },
        }
      );
      const data = response.data;

      this.form.title = "";
      this.form.body = "";
    },
  },
});

app.mount("#app");
