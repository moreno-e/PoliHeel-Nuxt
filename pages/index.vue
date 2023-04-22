<template>
  <div>
    <h1 class="text-center">Welcome to PoliHeel</h1>
    <p class="mt-6 mb-6 text-center text-xl">
      Below contains your current executive and legislative members. Along with
      your state governor
    </p>
    <members-display :partial-offices="state.partialOffices" />
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
    queriedState: '',
  });

  // if there is an error with IPStack call use default zipcode
  const defaultZipCodes = [
    { stateOfZip: 'Texas', zipCode: 77449 },
    { stateOfZip: 'New York', zipCode: 11368 },
    { stateOfZip: 'Illinois', zipCode: 60629 },
    { stateOfZip: 'California', zipCode: 9001 },
  ];

  const defaultRandomZipCode = () => {
    const rndInt = Math.floor(Math.random() * 3) + 1;

    return defaultZipCodes[rndInt];
  };

  // ipstack call
  try {
    // reduce amount of calls for dev
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
    // will have to pull zip code & state
    const defaultStateZip = defaultRandomZipCode();

    const { stateOfZip, zipCode } = defaultStateZip;

    state.queriedZipCode = state.ipStackData || zipCode;
    state.queriedState = stateOfZip;
  }

  // google civic api call to fetch members of zipcode
  try {
    const { data } = await useFetch(`/api/googlecivic/`, {
      params: { zip: state.queriedZipCode },
    });

    state.civicData = data;
  } catch (error) {
    console.error(error);
  }

  const checkForMissingTitles = () => {
    const subsetOfOffices = [];

    [
      'President of the United States',
      'Vice President of the United States',
      'U.S. Representative',
      `Governor of ${state.queriedState}`,
    ].forEach((title) => {
      const office = state.civicData.offices.find(
        (office) => office.name === title
      );

      if (!office) {
        subsetOfOffices.push({ title, hasMember: false });
      } else {
        const officialIndices = office.officialIndices;

        subsetOfOffices.push({
          title,
          hasMember: true,
          ...state.civicData.officials[officialIndices[0]],
        });
      }
    });

    const senators = state.civicData.offices.find(
      (office) => office.name === 'U.S. Senator'
    );

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
        ...state.civicData.officials[senatorIndices],
      });
    });

    return subsetOfOffices;
  };

  state.partialOffices = checkForMissingTitles();

  // slice the members names to pass to wiki api for their image
  const getWikiNameParams = () => {
    const params = state.partialOffices.map((office) => {
      if (!office.hasMember) return '';
      const wikiURL = office.urls[1];
      const wikiName = wikiURL.slice(30);

      return wikiName;
    });

    return params;
  };

  // fetch current member images
  state.nameParams = getWikiNameParams();
  state.promises = [];

  for (const name of state.nameParams) {
    const uri = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${name}`;

    state.promises.push(useFetch(uri));
  }

  state.responses = await Promise.all(state.promises);

  for (const [index, response] of state.responses.entries()) {
    const { data } = response;
    const picture = ref(data);

    state.partialOffices[index].portrait =
      picture.value?.query?.pages[0].original ||
      state.partialOffices[index]?.photoUrl ||
      `assets/default-member-photo.jpg`;
  }
</script>

<style scoped>
  h1 {
    font-size: 5rem;
    font-weight: 300;
  }
</style>
