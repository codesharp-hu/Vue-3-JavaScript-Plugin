<template>
  <div class="container-fluid">
    <div class="mb-3" v-if="store.state.auth.user">
        <p>
            <strong> user name </strong>
            {{ store.state.auth.user.userName }}
        </p>
    </div>
    <div class="mb-3" v-if="store.state.auth.user">
        <p>
            <strong> email </strong>
            {{ store.state.auth.user.email }}
        </p>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent } from 'vue';
export default defineComponent({
    setup() {
        const store = useStore();
        return { store }
    },
})
</script>