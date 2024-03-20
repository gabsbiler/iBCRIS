<template>
  <section>
    <VRow>
      <VCol>
        <h5 class="text-h5">Skills Dev and Economic Activities</h5>
      </VCol>
    </VRow>
    <VRow>
      <VCol cols="12" md="6">
        <SkillsDevelopment/>
      </VCol>
      <VCol cols="12" md="3">
        <WorkingStatus/>
      </VCol>
      <VCol cols="12" md="3">
        <VCard title="Income Bracket (Column 14d)">
          <VCardText>
            <VTable style="margin-top: -3px;">
              <thead>
                <tr>
                  <th>Income Range</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    [01] 5,000.00 and below
                  </td>
                  <td>
                    23
                  </td>
                </tr>
                <tr>
                  <td>
                    [02] 5,001.00 - 20,000.00
                  </td>
                  <td>
                    43
                  </td>
                </tr>
                <tr>
                  <td>
                    [03] 20,001.00 - 35,000.00
                  </td>
                  <td>
                    62
                  </td>
                </tr>
                <tr>
                  <td>
                    [04] 35,001.00 - 50,000.00
                  </td>
                  <td>
                    84
                  </td>
                </tr>
                <tr>
                  <td>
                    [05] 50,001.00 - 60,000.00
                  </td>
                  <td>
                    12
                  </td>
                </tr>
                <tr>
                  <td>
                    [06] 60,001.00 - 75,000.00
                  </td>
                  <td>
                    86
                  </td>
                </tr>
                <tr>
                  <td>
                    [07]75,001.00 and above
                  </td>
                  <td>
                    45
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
