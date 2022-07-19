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

  created() {
    // POST request using fetch with error handling
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Vue POST Request Example" }),
    };
    fetch("https://gorest.co.in//public/v2/users/1/posts", requestOptions)
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.form.title = "";
        this.form.body = "";
      })
      .catch((error) => {
        this.errorMessage = error;
        console.error("There was an error!", error);
      });
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

    /*
    async save() {
<<<<<<< HEAD
      const response = await fetch("https://gorest.co.in/public/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
=======
      console.log(1);
      const response = await axios.post(
        "https://gorest.co.in/public/v2/posts",
        {
          title: "test title",
>>>>>>> ffd630e7dd80fd9ea07d720931967c67f15e2bf2
        },
        {
          headers: {
            Authorization:
              "Bearer d7666eb7b6d38314bb70a670b27047a3d80c9d8dac93bce2ee1a9bad2c608b14",
          },
        }
      );
      const data = response.data;

      console.log(data);
      this.form.title = "";
      this.form.body = "";
    },*/
  },
});

app.mount("#app");
