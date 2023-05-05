<template>
  <div>
    <members-display
      :partial-offices="state.partialOffices"
      :member-state="state.queriedState" />
  </div>
</template>
<script setup>
  const state = reactive({
    civicData: '',
    ipStackData: '',
    nameParams: '',
    partialOffices: [],
    promises: [],
    processDev: 'dev',
    processProd: 'production',
    responses: '',
    randomZipCode: '',
    queriedZipCode: '',
    queriedState: ''
  });

  const fetchIPData = async () => {
    // IPstack call - use for PROD only
    try {
      if (process.env.NODE_ENV === state.processProd) {
        const { data, error: ipStackError } = await useFetch('/api/ipstack');

        state.ipStackData = data;

        if (state.ipStackData & (state.ipStackData !== null)) {
          throw new Error('ip fetch failed', { details: ipStackError });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      const defaultStateZip = defaultRandomZipCode();
      const { stateOfZipCode, zipCode } = defaultStateZip;

      state.queriedZipCode = state.ipStackData.zip || zipCode;
      state.queriedState = state.ipStackData.region_name || stateOfZipCode;
    }
  };

  await fetchIPData();

  const fetchMemberCivicData = async () => {
    // Google Civic API call to fetch members of Zip Code
    try {
      const { data } = await useFetch(`/api/googlecivic/`, {
        params: { zip: state.queriedZipCode }
      });

      state.civicData = data;
    } catch (error) {
      console.error(error);
    }
  };

  await fetchMemberCivicData();

  const checkForMissingTitles = () => {
    const subsetOfOffices = [];

    [
      'President of the United States',
      'Vice President of the United States',
      'U.S. Representative',
      `Governor of ${state.queriedState}`
    ].forEach((title) => {
      const office = state.civicData.offices.find(office => office.name === title);

      if (!office) {
        subsetOfOffices.push({ title, hasMember: false });
      } else {
        const officialIndices = office.officialIndices;

        subsetOfOffices.push({
          title,
          hasMember: true,
          ...state.civicData.officials[officialIndices[0]]
        });
      }
    });
    const senators = state.civicData.offices.find(office => office.name === 'U.S. Senator');

    if (!senators) {
      const noSenator = { title: 'U.S. Senator', hasMember: false };
      const senatorArrIdx = 2;

      subsetOfOffices.splice(senatorArrIdx, 0, noSenator);
      subsetOfOffices.splice(senatorArrIdx + 1, 0, noSenator);

      return subsetOfOffices;
    }

    senators.officialIndices.forEach((senatorIndices, index) => {
      const senatorObjPlacement = 2 + index;

      subsetOfOffices.splice(senatorObjPlacement, 0, {
        title: 'U.S. Senator',
        hasMember: true,
        ...state.civicData.officials[senatorIndices]
      });
    });

    return subsetOfOffices;
  };

  state.partialOffices = checkForMissingTitles();

  // Slice the members names to pass to wiki api for their image
  const getWikiNameParams = () => {
    const params = state.partialOffices.map((office) => {
      if (!office.hasMember) { return ''; }
      const wikiURL = office.urls[1];
      const wikiName = wikiURL.slice(30);

      return wikiName;
    });

    return params;
  };

  // Fetch current member images
  state.nameParams = getWikiNameParams();
  state.promises = [];

  const fetchWikiMemberData = async () => {
    for (const name of state.nameParams) {
      const uri = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${name}`;

      state.promises.push(useFetch(uri));
    }

    state.responses = await Promise.all(state.promises);
  };

  await fetchWikiMemberData();

  const attachImgSrc = () => {
    for (const [index, response] of state.responses.entries()) {
      const { data } = response;
      const picture = ref(data);

      state.partialOffices[index].portrait = picture.value?.query?.pages[0].original ||
        state.partialOffices[index]?.photoUrl || {
          source: `https://images.unsplash.com/photo-1611010638643-051de75362ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2865&q=80`
        };
    }
  };

  attachImgSrc();

</script>

<style scoped>
h1 {
font-size: 5rem;
font-weight: 300;
}
</style>
