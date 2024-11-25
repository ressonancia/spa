import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    
    let token = localStorage.getItem('token')
    let validToken = token ? true : false

    return {
      headerLabel: 'Projects',
      isLoggedIn: validToken,
      token: token
    };
  },
  actions: {
    setHeaderLabel(headerLabel = 'Projects') {
    	this.headerLabel = headerLabel;
    },
    login(token) {
      localStorage.setItem('token', token)
    	this.isLoggedIn = true
      this.token = token
    },
    logout() {
      localStorage.removeItem('token')
    	this.isLoggedIn = false;
      this.token = null
    },
  },
});