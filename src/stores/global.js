import { defineStore } from "pinia";
import apiRequester from '@/services/requester';


export const useGlobalStore = defineStore("global", {
  state: () => {
    
    let token = localStorage.getItem('token')
    let validToken = token ? true : false
    return {
      headerLabel: 'Projects',
      isLoggedIn: validToken,
      isSelfHosted: import.meta.env.VITE_RESSONANCE_SELF_HOSTED === 'true',
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
    setCurrentOrganizationId(organizationId) {
      this.__currentOrganizationId = organizationId
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

      this.__user.getCurrentOrganization = function () {
        if(this.__currentOrganizationId) {
          return this.organizations.find(
            organization => organization.id === this.__currentOrganizationId
          )
        }

        return this.organizations[0]
      }

      return this.__user
    }
  },
});
