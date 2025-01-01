import { defineStore } from "pinia";
import apiRequester from '@/services/requester';

export const useGlobalStore = defineStore("global", {
  state: () => {
    
    let token = localStorage.getItem('token')
    let validToken = token ? true : false
    let __user = null

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
    async getUser() {
      if (!this.isLoggedIn) {
        return null
      }

      if (this.__user) {
        return this.__user
      }

      let response = await apiRequester.get('/api/user')
      this.__user = response.data
      return this.__user
    }
  },
});