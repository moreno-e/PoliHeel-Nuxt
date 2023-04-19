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
  });

  // if there is an error with IPStack call use default zipcode
  const defaultZipCodes = [77449, 11368, 60629, 79936, 90011];
  const defaultZipCode = () => {
    const rndInt = Math.floor(Math.random() * 5) + 1;

    // return defaultZipCodes[rndInt];

    return 27614;
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
    state.queriedZipCode = state.ipStackData || defaultZipCode();
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

  // console.log('*** state.civicData ***'.toUpperCase(), state.civicData);

  const getPartialOffices = () => {
    // const officesSubset = [];
    // for (const office of state.civicData.offices) {
    //   if (office.name.includes('Governor')) break;
    //   officesSubset.push({
    //     name: office.name,
    //     officialIndices: office.officialIndices,
    //   });
    // }
    // return officesSubset;
  };

  const checkForMissingTitles = () => {
    const subsetOfOffices = [];

    [
      'President of the United States',
      'Vice President of the United States',
      'U.S. Representative',
      'Governor',
    ].forEach((title, index) => {
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

    console.log('*** senators ***'.toUpperCase(), senators);

    if (!senators) {
      const noSenator = { title: 'U.S. Senator', hasMember: false };

      return subsetOfOffices.push(noSenator, noSenator);
    }

    senators.officialIndices.forEach((senatorIndices) => {
      subsetOfOffices.push({
        title: 'U.S. Senator',
        hasMember: true,
        ...state.civicData.officials[senatorIndices],
      });
    });

    return subsetOfOffices;
  };

  state.partialOffices = checkForMissingTitles();
  console.log(
    '*** state.partialOffices ***'.toUpperCase(),
    state.partialOffices
  );

  // slice the members names to pass to wiki api for their image
  const getWikiNameParams = () => {
    const params = state.partialOffices.map((office) => {
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
      picture.value.query.pages[0].original ||
      state.partialOffices[index].photoUrl ||
      `assets/default-member-photo.jpg`;
  }
</script>

<style scoped>
  h1 {
    font-size: 5rem;
    font-weight: 300;
  }
</style>
