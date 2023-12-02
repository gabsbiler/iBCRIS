<script setup lang="ts">
import Papa from 'papaparse';
import { VDataTable } from 'vuetify/labs/VDataTable';

const headers = [
  {
    title: 'Last Name',
    sortable: true,
    key: 'lastname'
  },
  {
    title: 'First Name',
    key: 'firstname'
  },
  {
    title: 'Middle Name',
    key: 'middlename'
  },
  {
    title: '(3) Relationship',
    key: '_3'
  },
  {
    title: '(4) Family Nucleus',
    key: '_4'
  },
  {
    title: '(5) Gender',
    key: '_5'
  },
  {
    title: '(6) Birth Date',
    key: '_6'
  },
  {
    title: '(7) Age Last Birthday',
    key: '_7'
  },
  {
    title: '(8) Citizenship' ,
    key: '_8'
  },
  {
    title: '(9) Religious Affiliation',
    key: '_9'
  },
  {
    title: '(10) Ethnicity',
    key: '_10'
  },
  {
    title: '(11) Highest Educational Attainment',
    key: '_11'
  },
  {
    title: '(12a) Currently Enrolled',
    key: '_12a'
  },
  {
    title: '(12b) Type of School',
    key: '_12b'
  },
  {
    title: '(12c) Barangay and Municipality of School',
    key: '_12c'
  }
]

// const uploaded = [
//   {
//     lastname: "biler",
//     firstname: "gabriel",
//     middlename: "abel",
//     _3: null,
//     _4: null,
//     _5: null,
//     _6: null,
//     _7: null,
//     _8: null,
//     _9: null,
//     _10: null,
//     _11: null,
//     _12a: null,
//     _12b: null,
//     _12c: null
//   },
//   {
//     lastname: "Doe",
//     firstname: "John",
//     middlename: "Sirius",
//     _3: null,
//     _4: null,
//     _5: null,
//     _6: null,
//     _7: null,
//     _8: null,
//     _9: null,
//     _10: null,
//     _11: null,
//     _12a: null,
//     _12b: null,
//     _12c: null
//   }
// ]
const uploaded = ref([]);

const readCSVFile = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseCSV(content);
    };
    reader.readAsText(file);
  }
  console.log(uploaded)
};

const parseCSV = (content: string | ArrayBuffer | null) => {
  Papa.parse(content, {
    header: true, // Assumes your CSV has headers
    complete: (results) => {
      uploaded.value = results.data.map((row: { [x: string]: any; }) => ({
        lastname: row['Last Name'],
        firstname: row['First Name'],
        middlename: row['Middle Name'],
        _3: row['(3) Relationship'] || null,
        _4: row['(4) SomeOtherColumn'] || null, // Replace with actual column names
        _5: row['(5) Gender'] || null,
        _6: row['(6) Birth Date'] || null,
        _7: row['(7) Age Last Birthday'] || null,
        _8: row['(8) Citizenship'] || null,
        _9: row['(9) Religious Affiliation'] || null,
        _10: row['(10) Ethnicity'] || null,
        _11: row['(11) Highest Educational Attainment'] || null,
        _12a: row['(12a) Currently Enrolled'] || null,
        _12b: row['(12b) Type of School'] || null,
        _12c: row['(12c) Barangay and Municipality of School'] || null,
      }));
    }
  });
};
</script>


<template>
  <section>
    <VCard class="pa-5">
      <VRow>
        <VCol class="d-flex align-middle text-center">
          <h1 class="text-h5 my-auto">
            Mass Upload
          </h1>
          <a href="/iBCRIS_massupload.csv" class="ms-3 my-auto">Mass Upload Template File</a>
          <VSpacer />
          <div style="width: 20rem;">
            <VFileInput
              accept=".csv"
              label="File input"
              @change="readCSVFile"
            />
          </div>
          
        </VCol>
      </VRow>

      <VRow>
        <VCol>
          <VDataTable
            :headers="headers"
            :items="uploaded"
          >
            
          </VDataTable>
        </VCol>
      </VRow>
      
    </VCard>
  </section>
</template>
