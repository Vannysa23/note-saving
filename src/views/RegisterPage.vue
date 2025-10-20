<script setup>
import axios from "axios";
import router from "../../router/web";
import { useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import * as yup from 'yup';
import DOMPurify from 'dompurify';

const toast = useToast();

const { meta, errors, defineField } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .required('Please enter your name!')
      .min(3, 'Name must be at least 3 characters!')
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
      .min(6, 'Password must be at least 6 characters!')
      .required('Password is required!'),
  }),
});

const [email, emailAttrs] = defineField('email');
const [password, passwordAttrs] = defineField('password');
const [name, nameAttrs] = defineField('name');


async function submitForm() {
  try {

    const userInfo = {
      username: DOMPurify.sanitize(name.value.trim()),
      email: DOMPurify.sanitize(email.value.trim()),
      password: password.value.trim(),
    };

    //=================================
    // example of using DOMPurify
    // const userInput = '<img src=x onerror=alert("XSS") />Hello';
    // const sanitized = DOMPurify.sanitize(userInput);

    // console.log('Original:', userInput);
    // console.log('Sanitized:', sanitized);
    //=================================

    const res = await axios.post('/api/users/register', userInfo, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true, // required for CSRF-safe requests
    });

    if (res.data.success) {
      router.push('/login');
      name.value = '';
      email.value = '';
      password.value = '';
    } else {
      toast.add({ severity: 'error', summary: 'Attempt failed', detail: 'Registration failed!', life: 3000 });
    }

  } catch (error) {
    if (error.response) {
      if (error.response && error.response.data?.message?.includes('User already exists')) {
        toast.add({ severity: 'error', summary: 'Attempt failed', detail: 'Registration failed!', life: 3000 });
      }
    } else {
      console.error('Registration failed:');

    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row d-flex justify-content-center align-items-center py-5 mt-5">
      <div class="col-6">
        <div class="card p-3 rounded-4 position-relative">
          <div class="card-header border-0 bg-transparent">
            <div class="d-flex align-items-end justify-content-center">
              <h4 class="card-title mb-0 me-2">Create Your Space</h4>
              <div class="card-welcome-icon">
                <img src="/welcome-sticker.png" alt="Welcome Sticker" />
              </div>
            </div>
            <p class="text-center mt-4 ps-2">Make yourself at home! Just share a few details, and you’ll have a cozy space for your notes 📒</p>
          </div>
          <div class="card-content p-3">
            <form @submit.prevent="submitForm" autocomplete="off">
              <p class="mb-5"><i>I'm in</i></p>
              <div class="form-floating mb-3">
                <input
                  v-model="name"
                  v-bind="nameAttrs"
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label for="floatingInput">Username</label>
                <p class="fs-6 text-danger d-flex justify-content-end err-mss">{{ errors.name }}</p>
              </div>
              <div class="form-floating mb-3">
                <input
                  v-model="email"
                  v-bind="emailAttrs"
                  type="email"
                  class="form-control"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  autocomplete="off"
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
                  autocomplete="off"
                />
                <p class="fs-6 text-danger d-flex justify-content-end err-mss">{{ errors.password }}</p>
                <label for="floatingPassword">Password</label>
              </div>
              <div
                class="card-footer d-flex border-0 bg-transparent mt-5 p-0"
              >
                <button
                  class="btn w-100 border-color text-color mt-5"
                  type="submit"
                  :disabled="!meta.touched || meta.valid === false">
                  Ready!
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
  /* height: 480px; */
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
