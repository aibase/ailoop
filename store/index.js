import Vuex from 'vuex';
import Cookie from 'js-cookie';
// import openSocket from "socket.io-client";

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null
    },
    mutations: {
      setPosts(state, posts) {
        state.loadedPosts = posts
      },
      addPost(state, post) { 
        state.loadedPosts.push(post)
      },
      editPost(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        );
        state.loadedPosts[postIndex] = editedPost
      },
      setToken(state, token) {
        state.token = token
      },
      clearToken(state) {
        state.token = null
      }
    },
    actions: {
      // initialize vuex store with values (matrices) from server mem, fs or db 
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postsArray = []
            for (const key in data) {
              postsArray.push({ ...data[key], id: key }) // spreading all json fields + id: key // as per FB RTDB
            }
            vuexContext.commit('setPosts', postsArray)
          })
          .catch(e => context.error(e));
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios
        .$post("https://ailoop.firebaseio.com/posts.json?auth=" + vuexContext.state.token, createdPost)
          .then(data => {
            vuexContext.commit('addPost', { ...createdPost, id: data.name })
        })
        .catch(e => console.log(e));
      },
      editPost(vuexContext, editedPost) {
        return this.$axios.$put("https://ailoop.firebaseio.com/posts/" +
            editedPost.id +
            ".json?auth=" + vuexContext.state.token,
          editedPost
        )
        .then(res => {
          vuexContext.commit('editPost', editedPost)
        })
        .catch(e => console.log(e));
      },
      setPosts(vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      authenticateUser(vuexContext, authData) {
        let authUrl =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authUrl =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken);
            localStorage.setItem('token', result.idToken);
            localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
            Cookie.set('jwt', result.idToken);
            Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000);
            // Dummy axios Post request to an API Middleware
            return this.$axios.$post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
          })
          .catch(e => console.log(e));
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='));
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];  // get second element - after the = sign / token
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]; // get second element - after the = sign / expirationDate
        } else if (process.client) {
          token = localStorage.getItem('token');
          expirationDate = localStorage.getItem('tokenExpiration');
        } 
        if (new Date().getTime() > +expirationDate || !token) {
          // vuexContext.commit('clearToken');
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('setToken', token);
      },
      logout(vuexContext) {
        vuexContext.commit('clearToken');
        Cookie.remove('jwt');   // Cookie with token is called 'jwt' - JSON Web Token
        Cookie.remove('expirationDate');
        if (process.client) {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        }
      }
    },
    getters: {
      loadedPosts(state) {
        // openSocket("http://localhost:8080");
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null 
      }
    }
  })
}

export default createStore