<script setup lang="ts">
import axiosIns from '@/plugins/axios';
import avatar1 from '@images/avatars/avatar-1.png';
const route = useRoute()
const router = useRouter()

const logout = async () => {
  try {
    // Make a request to the logout endpoint
    await axiosIns.get('/auth/logout');

    // Clear local storage or state management data
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userAbilities');

    // Redirect to login or home page
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle any errors here
  }
}

const userData = JSON.parse(localStorage.getItem('userData'))

console.log(userData)
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <VImg :src="avatar1" />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{userData.name}}
            </VListItemTitle>
            <VListItemSubtitle>
              {{userData.role == 'admin' ? 'Administrator' : ''}}
              {{userData.role == 'brgyAdmin' ? 'Brgy. Administrator' : ''}}
              {{userData.role == 'brgyEncoder' ? 'Brgy. Encoder' : ''}}
            </VListItemSubtitle>
          </VListItem>

          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="mdi-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
