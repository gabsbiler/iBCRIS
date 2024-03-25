<script setup lang="ts">
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import tree from '@images/pages/tree.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/auth-v2-mask-dark.png'
import authV2MaskLight from '@images/pages/auth-v2-mask-light.png'

import axiosIns from '@/plugins/axios'

const form = ref({
  email: '',
  password: '',
  remember: false,
})

// Router
const route = useRoute()
const router = useRouter()

const isPromptShow = ref(false);

const isPasswordVisible = ref(false)

const authThemeImg = useGenerateImageVariant(
  authV2LoginIllustrationLight,
  authV2LoginIllustrationDark,
  authV2LoginIllustrationBorderedLight,
  authV2LoginIllustrationBorderedDark,
  true)

const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const onSubmit = async () => {
  try {
    await axiosIns.get('/sanctum/csrf-cookie');

    const response = await axiosIns.post('/api/auth/login', {
      login: form.value.email,
      password: form.value.password,
    });

    localStorage.setItem('userData', JSON.stringify(response.data.userData));
    localStorage.setItem('accessToken', response.data.accessToken);

    // Assume that the user role is part of the response data
    const userRole = response.data.userData.role;


    updateCASLAbilities(userRole)
    window.location.replace("/");
    // router.replace(route.query.to ? String(route.query.to) : '/');
  } catch (error) {
    console.error(error);
    isPromptShow.value = true;
  }
};



const updateCASLAbilities = (userRole) => {
    const abilities = [];
    if (userRole === 'admin') {
      abilities.push(
          { action: 'Access', subject: 'Dashboard' },
          { action: 'Access', subject: 'Users' },
          { action: 'Access', subject: 'Records' },
          { action: 'Access', subject: 'Reports' },
          { action: 'Access', subject: 'Lookups' },
          { action: 'Access', subject: 'MassUpload' },
          { action: 'Access', subject: 'RecordBatch' },
      );
    } else if (userRole === 'brgyAdmin' ){
      abilities.push(
          { action: 'Access', subject: 'Dashboard' },
          { action: 'Access', subject: 'Records' },
          { action: 'Access', subject: 'Reports' },
      );
    }else if (userRole === 'brgyEncoder') {
      abilities.push(
          { action: 'Access', subject: 'Records' },
      );
    }
    localStorage.setItem('userAbilities', JSON.stringify(abilities))
};

</script>

<template>
  <div>
    <!-- Title and Logo -->
    <div class="auth-logo d-flex align-start gap-x-3">
      <VNodeRenderer :nodes="themeConfig.app.logo" />

      <h1 class="font-weight-medium leading-normal text-2xl text-uppercase">
        {{ themeConfig.app.title }}
      </h1>
    </div>

    <VRow
      no-gutters
      class="auth-wrapper"
    >
      <VCol
        md="8"
        class="d-none d-md-flex align-center justify-center position-relative"
      >
        <div class="d-flex align-center justify-center w-100 pa-10 pe-0">
          <VImg
            max-width="768px"
            :src="authThemeImg"
            class="auth-illustration"
          />
        </div>

        <VImg
          :width="276"
          :src="tree"
          class="auth-footer-start-tree"
        />
        <VImg
          class="auth-footer-mask"
          :src="authThemeMask"
        />
      </VCol>

      <VCol
        cols="12"
        md="4"
        class="auth-card-v2 d-flex align-center justify-center"
      >
        <VCard
          flat
          :max-width="500"
          class="mt-12 mt-sm-0 pa-4"
        >
          <VCardText>
            <h5 class="text-h5 font-weight-medium mb-1">
              Welcome to iBCRIS! 👋🏻
            </h5>
            <p class="mb-0">
              Please sign-in to your account
            </p>
          </VCardText>
          <VCardText>
            <VForm @submit.prevent="onSubmit">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.email"
                    label="Email"
                    type="email"
                  />
                </VCol>

                <!-- password -->
                <VCol cols="12">
                  <VTextField
                    v-model="form.password"
                    label="Password"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                  />
                </VCol>


                <VCol>
                  <VBtn
                    block
                    type="submit"
                  >
                    Login
                  </VBtn>
                  <p class="text-error mt-1" v-show="isPromptShow">Please check your email and password.</p>
                </VCol>

              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
</route>
