<template>
  <section>
    <VRow>
      <VCol>
        <h6 class="text-h6">Residency and Migration</h6>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <VCard title="Residency">
          <VCardText>
            <TypeResidency/>
          </VCardText>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard title="Reason for Transferring">
          <VCardText>
            <VTable style="height: 25rem;">
              <thead>
                <tr>
                  <th>Reason</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Availability of Jobs
                  </td>
                  <td>
                    321
                  </td>
                </tr>
                <tr>
                  <td>
                    Higher wage
                  </td>
                  <td>
                    253
                  </td>
                </tr>
                <tr>
                  <td>
                    Presence of School or University
                  </td>
                  <td>
                    223
                  </td>
                </tr>
                <tr>
                  <td>
                    Presence of Relatives and Friends in the Barangay
                  </td>
                  <td>
                    180
                  </td>
                </tr>
                <tr>
                  <td>
                    Housing
                  </td>
                  <td>
                    140
                  </td>
                </tr>
                <tr>
                  <td>
                    Other
                  </td>
                  <td>
                    123
                  </td>
                </tr>
              </tbody>
            </VTable>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </section>
</template>
