import { defineStore } from "pinia";
import api from "../components/composables/api";

interface User {
  pin: number;
  name: string;
  phone: string;
  last_login_at: string;
  image_url: string;
  
}

export const userStore = defineStore("user", {
  state: () => ({
    token: null as string | null,
    name: null as string | null,
    phone: null as string | null,
    user: null as object | User | null,
    departments: null as any,
  }),
  getters: {
    getToken: (state) => state.token,
    getUser: (state) => state.user,
  },
  actions: {
    updateUser(
      token: string | null,
      name: string | null,
      phone: string | null
    ): void {
      this.token = token;
      this.name = name;
      this.phone = phone;

    },
    async fetchUserData() {
      try {
        const response = await api.get("/auth/profile", {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log(response.data.data);
        this.user = response.data.data;
      
      } catch (error) {}
    },
    async departments() {
      try {
        const response = await api.get("/departments");
        console.log(response.data.data);
      } catch (error) {}
    },
    $reset() {
      this.token = null;
      this.name = null;
      this.phone = null;
      this.user = null;
      this.departments = null;
    },
  },
  persist: true,
});
