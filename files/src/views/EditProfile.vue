<template>
  <div class="container-fluid">
    <form>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input
          v-model="userName"
          type="text"
          class="form-control"
          id="name"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
        />
      </div>
      <div class="alert alert-danger" role="alert" v-if="errorMsg">
        {{ errorMsg }}
      </div>
      <div class="alert alert-success" role="alert" v-if="successMsg">
        {{ successMsg }}
      </div>
      <input
        class="btn btn-primary"
        type="button"
        value="Save"
        @click="onSubmit"
      />
    </form>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useForm, useField } from 'vee-validate';
import { useStore } from 'vuex';
import api from '../api';
export default defineComponent({
  setup() {
    const simpleSchema = {
      name(value) {
        if (value && value.trim()) {
          return true;
        }
        return 'This is required';
      },
      email(value) {
        if (value && value.trim()) {
          return true;
        }
        return 'This is required';
      },
    };
    const { handleSubmit } = useForm({
      validationSchema: simpleSchema,
    });
    const { value: userName, errorMessage: userNameError } = useField('name');
    const { value: email, errorMessage: emailError } = useField('email');
    let store = useStore();
    let errorMsg = ref('');
    let successMsg = ref('');
    const onSubmit = handleSubmit(async () => {
      try {
        await api.updateProfile({
          userName: userName.value,
          email: email.value
        }, store.state.auth.jwt);
      } catch (reason) {
        if (reason.isUserNameInUse) {
          errorMsg.value = 'This user name already exists!';
        } else if (reason.isEmailInUse) {
          errorMsg.value = 'This email already exists!';
        } else {
          errorMsg.value = '';
        }
        if (reason.success) {
          successMsg.value = 'Your profile is successfuly updated.'
        }
      }
    });
    return {
      onSubmit,
      userName,
      userNameError,
      email,
      emailError,
      errorMsg,
      successMsg
    };
  },
});
</script>