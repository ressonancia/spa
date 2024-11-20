import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => {
    return { headerLabel: 'Projects' };
  },
  actions: {
    setHeaderLabel(headerLabel = 'Projects') {
    	this.headerLabel = headerLabel;
    },
  },
});