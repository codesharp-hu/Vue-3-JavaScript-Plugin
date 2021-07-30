<template>
  <div class="container-fluid">
    <form>
      <div class="mb-3">
        <label for="email" class="form-label">Name</label>
        <input
          v-model="userName"
          id="userName"
          type="text"
          class="form-control"
        />
        <span>{{ userNameError }}</span>
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="email"
            id="email"
            type="email"
            class="form-control"
          />
          <span>{{ emailError }}</span>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            id="password"
            type="password"
            class="form-control"
          />
          <span>{{ passwordError }}</span>
        </div>
        <div class="mb-3">
          <label for="password2" class="form-label">Confirm Password</label>
          <input
            v-model="password2"
            id="password2"
            type="password"
            class="form-control"
          />
          <span>{{ passwordError2 }}</span>
        </div>
        <div class="alert alert-danger" role="alert" v-if="errorMsg">
          {{ errorMsg }}
        </div>
        <input
          class="btn btn-primary"
          type="button"
          value="Sign up"
          @click="onSubmit"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "../api";

export default defineComponent({
  setup() {
    const simpleSchema = {
      password(value) {
        if (value && value.trim()) {
          return true;
        }

        return "This is required";
      },
      userName(value) {
        if (value && value.trim()) {
          return true;
        }

        return "This is required";
      },
      email(value) {
        if (value && value.trim()) {
          return true;
        }

        return "This is required";
      },
      password2(value) {
        if (value === password.value) {
          return true;
        }

        return "The given passwords do not match!";
      },
    };

    const { handleSubmit } = useForm({
      validationSchema: simpleSchema,
    });
    const { value: userName, errorMessage: userNameError } =
      useField("userName");
    const { value: email, errorMessage: emailError } =
      useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { value: password2, errorMessage: passwordError2 } =
      useField("password2");
    let store = useStore();
    let errorMsg = ref("");
    const router = useRouter();

    const onSubmit = handleSubmit(async () => {
      try {
        await api.register({
          userName: userName.value,
          email: email.value,
          password: password.value,
        });
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        router.push("/profile");
      } catch (reason) {
        errorMsg.value = "incorrect email or password";
      }
    });

    return {
      onSubmit,
      userName,
      userNameError,
      email,
      emailError,
      password,
      passwordError,
      password2,
      passwordError2,
      errorMsg,
    };
  },
});
</script>