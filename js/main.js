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
        return Object.values(user).some((word) => String(word).toLowerCase().includes(query));
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
      const response = await fetch("https://gorest.co.in/public/v2/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      this.form.title = "";
      this.form.body = "";
    },*/
  },
});

app.mount("#app");
