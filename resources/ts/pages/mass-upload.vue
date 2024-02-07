<script setup lang="ts">
import SnackBar from '@/components/SnackBar.vue';
import axios from 'axios';
import Papa from 'papaparse';
import { VDataTable } from 'vuetify/labs/VDataTable';

const SnackBarRef=ref(null)
const headers = [
  {
    title: "Household UUID",
    key: 'household_id'
  },
  {
    title: 'BSN',
    key: 'bsn'
  },
  {
    title: 'HUSN',
    key: 'husn'
  },
  {
    title: 'HSN',
    key: 'hsn'
  },
  {
    title: 'Barangay',
    key: 'barangay'
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
  },
  {
    title: '(13a) What type of skills do you have?',
    key: '_13a'
  },
  {
    title: '(13b) What type of skills development training is __ interested to join?',
    key: '_13b'
  },
  {
    title: '(14a) Indicator for OFW/OCW and Not Working?',
    key: '_14a'
  },
  {
    title: '(14a_1) Indicate Reason (for NOT WORKING)',
    key: '_14a_1'
  },
  {
    title: '(14a_2) How many years working as OFW',
    key: '_14a_2'
  },
  {
    title: '(14b) What is __\'s usual activity/ occupation during the past 12 months?',
    key: '_14b'
  },
  {
    title: '(14c) What is the major source of __\'s income?',
    key: '_14c'
  },
  {
    title: '(14d) Monthly Income',
    key: '_14d'
  },
  {
    title: '(14e) What is the status of __\'s work/ business?',
    key: '_14e'
  },
  {
    title: '(14f) In what barangay and city/ municipality is __\'s work/business located?',
    key: '_14f'
  },
  {
    title: '(15a) In what year did __ started residing in this housing unit?',
    key: '_15a'
  },
  {
    title: '(15b) Before moving in this housing unit, where did __ reside?',
    key: '_15b'
  },
  {
    title: '(15c) In what barangay/ city/ municipality did __ resides before?',
    key: '_15c'
  },
  {
    title: '(16a) Type of Resident',
    key: '_16a'
  },
  {
    title: '(16b) What are the reason why __ left his/her previous residence?',
    key: '_16b'
  },
  {
    title: '(16b) What are the reason why __ left his/her previous residence?',
    key: '_16c'
  },
  {
    title: '(16c) WHEN to return',
    key: '_16c_1'
  },
  {
    title: '(16d) What are the reasons why __ transferred in this barangay?',
    key: '_16d'
  },
  {
    title: '(16e) Is Migration permanent?',
    key: '_16e'
  },
  {
    title: '(16f) How long do they intend to stay in the community?',
    key: '_16f'
  },
  {
    title: '(17) In what City/ Municipality/ and province was born?',
    key: '_17'
  },
  {
    title: '(18) Is ____\'s birth registered with the LRCO?',
    key: '_18'
  },
  {
    title: '(19) Why was ___\'s birth not registered?',
    key: '_19'
  },
  {
    title: '(20a) Where was __ delivered?',
    key: '_20a'
  },
  {
    title: '(20b) Who attended in the delivery of __?',
    key: '_20b'
  },
  {
    title: '(20c) What is the last vaccine received by ____?',
    key: '_20c'
  },
  {
    title: '(21) What is ______\'s marital status?',
    key: '_21'
  },
  {
    title: '(22) When did ___\'s marriage occur?',
    key: '_22'
  },
  {
    title: '(23) In what City/ Municipality/ and province did ___\'s marriage occur?',
    key: '_23'
  },
  {
    title: '(24) Type of Marriage ceremony?',
    key: '_24'
  },
  {
    title: '(25) Is __\'s marriage registered with the LCRO?',
    key: '_25'
  },
  {
    title: '(26)Why was ___\'s marriage not registered?',
    key: '_26'
  },
  {
    title: '(39a) Any pregnant female members in this household?',
    key: '_39a'
  },
  {
    title: '(39b) Number of Pregnancies',
    key: '_39b'
  },
  {
    title: '(39bb) Number of Pregnancies',
    key: '_39bb'
  },
  {
    title: '(39c.1) Is female age 10-54 using Family Planning Method?',
    key: '_39c_1'
  },
  {
    title: '(39c.2) Family Planning Method?',
    key: '_39c_2'
  },
  {
    title: '(39d) Where did they obtain the FP method?',
    key: '_39d'
  },
  {
    title: '(39e.1) Is there any intension to use Modern FP method?',
    key: '_39e_1'
  },
  {
    title: '(39e.2) Modern FP method?',
    key: '_39e_2'
  },
  {
    title: '(40) What is the primary health insurance __ have?',
    key: '_40'
  },
  {
    title: '(41a) What facility did __ visited in the past 12 months?',
    key: '_41a'
  },
  {
    title: '(41b) What is the reason for the visit in health facility?',
    key: '_41b'
  },
  {
    title: '(42.1) Is there a member of the HH that undergo Continuous Medical Care',
    key: '_42_1'
  },
  {
    title: '(42.2) Continuous Medical Care',
    key: '_42_2'
  },
  {
    title: '(43.1) Is there a member of the HH that has Mental Health Issues',
    key: '_43_1'
  },
  {
    title: '(43.2) Mental Health Issue',
    key: '_43'
  },
  {
    title: '(44.1) Is there a member of HH that has Nutritional Issues?',
    key: '_44_1'
  },
  {
    title: '(44.2) Nutritional Issue?',
    key: '_44_2'
  },
  {
    title: '(45) Is there a member of HH that has any disabilities?',
    key: '_45'
  },
  {
    title: '(45) Disability/ies',
    key: '_45_1_'
  },
  {
    title: '(46) Is there a member of the HH that is a solo parent?',
    key: '_46'
  },
  {
    title: 'Is he/ she registered?',
    key: '_46_1'
  },
  {
    title: '(47) Is there a member of Indegenous People(IPs)',
    key: '_47'
  },
  {
    title: '(47) Specify the ethnic group belongs to',
    key: '_47_1'
  },
  {
    title: '(48) Is __ a registered senior citizen?',
    key: '_48'
  },
  {
    title: '(49.1) Is there a member of LGBTQ++ in the House Hold?',
    key: '_49_1'
  },
  {
    title: '(49.2) Select gender',
    key: '_49_2'
  },
  {
    title: '(50) Is __ a registered voter?',
    key: '_50'
  },
  {
    title: '(50) To what brgy is ___ a registered voter?',
    key: '_50_1'
  },
]

const uploaded = ref([]);

const readCSVFile = (event:any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      parseCSV(content);
    };
    reader.readAsText(file);
    SnackBarRef.value.show('success', "Data Loaded")
  }
  
};

const parseCSV = (content: string | ArrayBuffer | null) => {
  Papa.parse(content, {
    header: true, // Assumes your CSV has headers
    complete: (results:any) => {
      uploaded.value = results.data.map((row: { [x: string]: any; }) => {
        let formattedDate = row['(6) When was ____ born? (mm-dd-yyyy)'];
        if (row['(6) When was ____ born? (mm-dd-yyyy)']) {
          const [month, day, year] = row['(6) When was ____ born? (mm-dd-yyyy)'].split('/');
          const formattedYear = parseInt(year, 10) < 100 ? '20' + year : year;
          formattedDate = `${formattedYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        }else{
          formattedDate = null
        }

        return {
          household_id: row['household_id'],
          bsn: row['BSN'],
          husn: row['HUSN'],
          hsn: row['HSN'],
          barangay: row['Barangay'],
          sitio: row['sitio'],
          address: row['address'],
          head: row['isHead'],
          lastname: row['Last Name'],
          firstname: row['First Name'],
          middlename: row['Middle Name'],
          _3: row['(3) How is __ related to household head?'] || null,
          _4: row['(4) Family Nucleus'] || null, 
          _5: row['(5) is __ Male or Female'] || null,
          _6: formattedDate,
          _7: row['(7) How old is ___ as of his/her last birthday?'] || null,
          _8: row['(8) What __\'s citizenship?'] || null,
          _9: row['(9) What is ____\'s religion/ religious affiliation?'] || null,
          _10: row['(10) What is ____\'s ethnicity?'] || null,
          _11: row['(11) What is __\'s highest educational attainment?'] || null,
          _12a: row['(12a) Is __ currently enrolled?'] || null,
          _12b: row['(12b) What type of school is __ on?'] || null,
          _12c: row['(12c) In what barangay and city/ municipality is __ currently attending school?'] || null,
          _13a: row['(13a) What type of skills do you have?'] || null, 
          _13b: row['(13b) What type of skills development training is __ interested to join?'] || null, 
          _14a: row['(14a) Indicator for OFW/OCW and Not Working?'] || null, 
          _14a_1: row['(14a_1) Indicate Reason (for NOT WORKING)'] || null, 
          _14a_2: row['//(14a_2) How many years working as OFW'] || null, 
          _14b: row['(14b) What is __\'s usual activity/ occupation during the past 12 months?'] || null, 
          _14c: row['(14c) What is the major source of __\'s income?'] || null, 
          _14d: row['(14d) Monthly Income'] || null, 
          _14e: row['(14e) What is the status of __\'s work/ business?'] || null, 
          _14f: row['(14f) In what barangay and city/ municipality is __\'s work/business located?'] || null, 
          _15a: row['(15a) In what year did __ started residing in this housing unit?'] || null, 
          _15b: row['(15b) Before moving in this housing unit, where did __ reside?'] || null, 
          _15c: row['(15c) In what barangay/ city/ municipality did __ resides before?'] || null, 
          _16a: row['(16a) Type of Resident'] || null, 
          _16b: row['(16b) What are the reason why __ left his/her previous residence?'] || null, 
          _16c: row['(16c) Does __ plan to return to previous residence?'] || null, 
          _16c_1: row['(16c) WHEN to return'] || null, 
          _16d: row['(16d) What are the reasons why __ transferred in this barangay?'] || null, 
          _16e: row['(16e) Is Migration permanent?'] || null, 
          _16f: row['(16f) How long do they intend to stay in the community?'] || null, 
          _17: row['(17) In what City/ Municipality/ and province was born?'] || null, 
          _18: row['(18) Is ____\'s birth registered with the LRCO?'] || null, 
          _19: row['(19) Why was ___\'s birth not registered?'] || null, 
          _20a: row['(20a) Where was __ delivered?'] || null, 
          _20b: row['(20b) Who attended in the delivery of __?'] || null, 
          _20c: row['(20c) What is the last vaccine received by ____?'] || null, 
          _21: row['(21) What is ______\'s marital status?'] || null, 
          _22: row['(22) When did ___\'s marriage occur?'] || null, 
          _23: row['(23) In what City/ Municipality/ and province did ___\'s marriage occur?'] || null, 
          _24: row['(24) Type of Marriage ceremony?'] || null, 
          _25: row['(25) Is __\'s marriage registered with the LCRO?'] || null,
          _26: row['(26)Why was ___\'s marriage not registered?'] || null, 
          _39a: row['(39a) Any pregnant female members in this household?'] || null, 
          _39b: row['(39b) Number of Pregnancies'] || null, 
          _39bb: row['(39bb) Number of Pregnancies'] || null, 
          _39c_1: row['(39c.1) Is female age 10-54 using Family Planning Method?'] || null,
          _39c_2: row['(39c.2) Family Planning Method?'] || null, 
          _39d: row['(39d) Where did they obtain the FP method?'] || null, 
          _39e_1: row['(39e.1) Is there any intension to use Modern FP method?'] || null, 
          _39e_2: row['(39e.2) Modern FP method?'] || null, 
          _40: row['(40) What is the primary health insurance __ have?'] || null, 
          _41a: row['(41a) What facility did __ visited in the past 12 months?'] || null, 
          _41b: row['(41b) What is the reason for the visit in health facility?'] || null, 
          _42_1: row['(42.1) Is there a member of the HH that undergo Continuous Medical Care'] || null, 
          _42_2: row['(42.2) Continuous Medical Care'] || null, 
          _43_1: row['(43.1) Is there a member of the HH that has Mental Health Issues'] || null, 
          _43: row['(43.2) Mental Health Issue'] || null, 
          _44_1: row['(44.1) Is there a member of HH that has Nutritional Issues?'] || null, 
          _44_2: row['(44.2) Nutritional Issue?'] || null, 
          _45: row['(45) Is there a member of HH that has any disabilities?'] || null, 
          _45_1_: row['(45) Disability/ies'] || null, 
          _46: row['(46) Is there a member of the HH that is a solo parent?'] || null, 
          _46_1: row['Is he/ she registered?'] || null, 
          _47: row['(47) Is there a member of Indegenous People(IPs)'] || null, 
          _47_1: row['(47) Specify the ethnic group belongs to'] || null, 
          _48: row['(48) Is __ a registered senior citizen?'] || null, 
          _49_1: row['(49.1) Is there a member of LGBTQ++ in the House Hold?'] || null, 
          _49_2: row['(49.2) Select gender'] || null, 
          _50: row['(50) Is __ a registered voter?'] || null, 
          _50_1: row['(50) To what brgy is ___ a registered voter?'] || null, 
        }

      });
    }
  });
};

const processUpload = async () => {
  console.log(uploaded.value)
  try {
    const response = await axios.post('/api/households/multiple/upload', { data: uploaded.value });

    SnackBarRef.value.show('success', response.data)
    // Handle successful upload response
  } catch (error) {
    console.log(error)
    SnackBarRef.value.show('error', error)
    // Handle error response
  }
};


</script>


<template>
  <section>
    <SnackBar ref="SnackBarRef"/>
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
          />
        </VCol>
      </VRow>

      <VRow>
        <VCol class="d-flex flex-row-reverse">
          <VBtn color="primary" @click="processUpload" :disabled=" uploaded.length > 1 ? false : true">Upload</VBtn>
        </VCol>
      </VRow>
      
    </VCard>
    
  </section>
</template>
