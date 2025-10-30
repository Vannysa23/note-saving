<script setup>
import axios from "axios";
import { ref } from "vue";
import router from "../../router/web";
import { useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';
import DOMPurify from 'dompurify';
import { onBeforeUnmount } from "vue";

const toast = useToast();
let timeoutId = null;
let loadingMss = ref('Login');

const { meta, errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .required('Please enter your name!')
      .matches(/^[a-zA-Z0-9]+$/, 'Name is invalid!'),
    email: yup
      .string()
      .email('Please enter a valid email address!')
      .required('Please enter your email!')
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email is invalid!'
      ),
    password: yup
      .string()
      .required('Password is required!'),
  }),
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');

async function submitForm() {
  try {
    loadingMss.value = 'Login ... ';
    const userInfo = {
      username: DOMPurify.sanitize(name.value.trim()),
      email: DOMPurify.sanitize(email.value.trim()),
      password: password.value.trim(),
    };

    const res = await axios.post('/api/users/login', userInfo, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // required for CSRF-safe requests
    });
    if (res.data.success) {
      toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful!', life: 4000 });
      timeoutId = setTimeout(() => {
        name.value = '';
        email.value = '';
        password.value = '';

        router.push('/');
      }, 2000);

    } else {
      toast.add({ severity: 'error', summary: 'Attempt failed', detail: 'Login failed!', life: 3000 });
    }

  } catch (error) {
    console.log(error);
    toast.add({ severity: 'error', summary: 'Attempt failed', detail: 'Invalid credentials. Please try again!', life: 3000 });
  }
  loadingMss.value = 'Login ';
  onBeforeUnmount(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}
</script>

<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center py-5 mt-5">
      <div class="col-6">
        <div class="card p-3 rounded-4 position-relative">
          <div class="card-header border-0 bg-transparent">
            <div class="d-flex align-items-end justify-content-center">
              <h4 class="card-title mb-0 me-2">Welcome Saver</h4>
              <div class="card-welcome-icon">
                <img src="/welcome-sticker.png" alt="Welcome Sticker" />
              </div>
            </div>
            <p class="text-center mt-4 ps-2">Knock knock! Who’s there 🤖❓</p>
          </div>
          <div class="card-content p-3">
            <form @submit.prevent="submitForm">
              <p class="mb-5">Hi <i>Smartiee</i>, I'm ...</p>
              <div class="form-floating mb-3">
                <input
                  v-model="name"
                  v-bind="nameAttrs"
                  type="text"
                  class="form-control"
                  id="floatingName"
                  placeholder="name@example.com"
                />
                <p class="fs-6 text-danger d-flex justify-content-end err-mss">{{ errors.name }}</p>
                <label for="floatingInput">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  class="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                />
                <p class="fs-6 text-danger d-flex justify-content-end err-mss">{{ errors.email }}</p>
                <label for="floatingInput">Email </label>
              </div>
              <div class="form-floating">
                <input
                  v-model="password"
                  v-bind="passwordAttrs"
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <p class="fs-6 text-danger d-flex justify-content-end err-mss">{{ errors.password }}</p>
                <label for="floatingInput">Password </label>
              </div>
              <div class="card-footer d-flex border-0 bg-transparent p-0">
                <button
                  class="btn w-100 border-color text-color mt-5"
                  type="submit"
                  :disabled="!meta.touched || meta.valid === false || loadingMss.includes('...')">
                  {{ loadingMss }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-welcome-icon img {
  width: 35px;
}
.card {
  background-color: white;
  border: 1px solid #f9f1d7;
  box-shadow:
    #f9f1d7 0px 2px 4px,
    #f9f1d7 0px 7px 13px -3px,
    #f9f1d7 0px -3px 0px inset;
}
.card-header .card-title {
  color: #6f95fd;
}
.card-content i {
  color: var(--primary-color);
  font-weight: 500;
}
.card form .form-control {
  padding-inline: 40px;
  transition: all 0.3s linear;
  box-shadow: none;
  border-color: #cddafd !important;
}
.card form .form-control:focus {
  /* scale: 1.08; */
  height: 80px !important;
  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px; */
}
.card form .form-control:focus + label {
  transition: all 0.3s ease-in-out;
}
/* .card form .form-control:focus + label {
    left: -18px;
} */

.card-footer {
  width: 100%;
  left: 0px;
  bottom: 10px;
}
.card-footer .btn {
  transition: all linear 0.3s;
}

.card-footer .btn:hover {
  /* background-color: var(--primary-color); */
  color: #a0b8f9 !important;
}

.err-mss{
  font-size: 13px !important;
}

.p-toast-message-text .p-toast-detail {
    color: #ef4444 !important;
}

</style>
