<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">
          Socio-Civic Information
        </h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="3">
        <VCard title="Continous Medical Care">
          <VCardText class="card">
            <VTable>
              <thead>
                <tr>
                  <th>
                    Continous Medical Care 
                  </th>
                  <th>
                    Count
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Depression
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Anxiety Disorder
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Personality Disorder
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Bipolar Disorder
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    PostTraumatic Stress Disorder (PTSD)
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Schizophrenia
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Psychotic Disorder
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Obsessive-Compulsive Disorder (OCD)
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Epilepsy
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
                <tr>
                  <td>
                    Other
                  </td>
                  <td>
                    {{Math.floor(Math.random() * 100)}}
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="3">
        <VCard title="Nutritional Issue ">
          <VCardText class="card">
            <VTable>
              <thead>
                <tr>
                  <th>Continous Medical Care</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Normal</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Underweight</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Severly Underweight</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Overweight</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Obese</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Stunned</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Wasted</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
                <tr>
                  <td>Others</td>
                  <td>{{Math.floor(Math.random() * 100)}}</td>
                </tr>
              </tbody>
            </VTable> 
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="3">
        <VCard title="Solo Parent">
          <VCardText class="card">
            <SoloParent/>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="3">
        <VCard title="LGBTQ++">
          <VCardText class="card">
            <LGBTQ/>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
<style scoped>
.card {
  block-size: 36rem;
}
</style>
