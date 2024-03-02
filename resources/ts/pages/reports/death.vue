<script setup lang="ts">
const isShow = ref(true)
const baranggayList = [
'Alitao',
'Alupay',
'Angeles Zone I (Pob.)',
'Angeles Zone II',
'Angeles Zone III',
'Angeles Zone IV',
'Angustias Zone I (Pob.)',
'Angustias Zone II',
'Angustias Zone III,',
'Angustias Zone IV',
'Anos',
'Ayaas',
'Baguio',
'Banilad',
'Calantas',
'Camaysa',
'Dapdap',
'Gibanga',
'Alsam Ibaba',
'Bukal Ibaba',
'Ilasan Ibaba',
'Nangka Ibaba',
'Palale Ibaba',
'Ibas',
'Alsam Ilaya',
'Bukal Ilaya',
'Ilasan Ilaya',
'Nangka Ilaya',
'Palale Ilaya',
'Ipilan',
'Isabang',
'Calumpang',
'Domoit Kanluran',
'Katigan Kanluran',
'Palale Kanluran',
'Lakawan',
'Lalo',
'Lawigue',
'Lita (Pob.)',
'Malaoa',
'Masin',
'Mate',
'Mateuna',
'Mayowe',
'Opias',
'Pandakaki',
'Pook',
'Potol',
'San Diego Zone I (Pob.)',
'San Diego Zone II',
'San Diego Zone III',
'San Diego Zone IV',
'San Isidro Zone I (Pob.)',
'San Isidro Zone II',
'San Isidro Zone III',
'San Isidro Zone IV',
'San Roque Zone I (Pob.)',
'San Roque Zone II',
'Domoit Silangan',
'Katigan Silangan',
'Palale Silangan',
'Talolong',
'Tamlong',
'Tongko',
'Valencia',
'Wakas'
]

const ageFrom = ref()
const ageTo = ref()

const settings = ref({
  barangay: [],
  dateFrom: new Date(),
  dateTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
  ageRange: [
    {
      from: 0,
      to: 5
    },
    {
      from: 6,
      to: 10
    },
    {
      from: 11,
      to: 15
    },
    {
      from: 16,
      to: 20
    },
    {
      from: 21,
      to: 25
    },
    {
      from: 26,
      to: 30
    },
    {
      from: 31,
      to: 35
    },
    {
      from: 36,
      to: 40
    },
  ]
})

</script>

<template>
  <div class="d-flex gap-y-5 flex-column">
    <!-- Filter -->
    <VCard>
      <VCardTitle class="d-flex justify-space-between align-center" @click="isShow = !isShow">
        <h6 class="text-h6">
          Filter
        </h6>
        <VBtn
          variant="text" 
          :icon="isShow ? 'mdi-chevron-up': 'mdi-chevron-down'"
        />
      </VCardTitle>
      <VExpandTransition>
        <VCardText v-if="isShow" class="d-flex flex-column gap-y-3">

          <!-- Baranggay -->
          <div>
            <VLabel class="mb-3">
              Select Barangay
            </VLabel>
            <VRow>
              <VCol>
                <VCombobox 
                v-model="settings.barangay"
                :items="baranggayList"
                multiple
                chips
                clearable
                />
              </VCol>
            </VRow>
          </div>


          <!-- Date Range -->
          <div>
            <VLabel class="mb-3">
              Date Range:
            </VLabel>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  label="Date From"
                  v-model="settings.dateFrom"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="settings.dateTo"
                  label="Date To"
                />
              </VCol>
            </VRow>
          </div>

          <!-- Age Picker -->
          <div class="mb-3">
            <VLabel class="mb-3">
              Select Age:
            </VLabel>
            <VRow>
              <VCol>
                <VTextField label="From" v-model="ageFrom" type="number"/>
              </VCol>
              <VCol class="d-flex flex-row align-center gap-x-4">
                <VTextField label="To" v-model="ageTo" type="number"/>
                <VBtn 
                  icon="mdi-plus" 
                  @click="addAndSortByFrom(ageFrom, ageTo)" 
                  :disabled="!(ageFrom > 0 && ageTo > 0)"
                />
                
              </VCol>
            </VRow>
            <div class="gap-x-2 mt-2" >
              <VChip color="primary" v-for="(value, key) in settings.ageRange" class="mx-1 mt-2">
                <VText>
                  {{ value.from }} - {{ value.to }}
                </VText> 
                <Button class="d-flex align-center ms-1" @click="removeElementArray(key)">
                  <VIcon icon="mdi-close" style="font-size: 0.9rem !important;"/>
                </Button>
              </VChip>
            </div>
          </div>
          <div class="d-flex justify-end">
            <VBtn :disabled="!(settings.barangay.length > 0)">
              Generate
            </VBtn>
          </div>
        </VCardText>
      </VExpandTransition>
    </VCard>

    <VCard>
      <VCardText>
        <h4 class="text-h4 text-center">
          Death Record in Development
        </h4>
      </VCardText>
    </VCard>
  </div>
</template>
