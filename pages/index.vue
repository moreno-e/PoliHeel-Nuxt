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

  const defaultZipCodes = [77449, 11368, 60629, 79936, 90011];
  const defaultZipCode = () => {
    const rndInt = Math.floor(Math.random() * 5) + 1;

    return defaultZipCodes[rndInt];
  };

  try {
    if (process.env.NODE_ENV === processProd) {
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

  const { data } = await useFetch(`/api/googlecivic/`, {
    params: { zip: state.queriedZipCode },
  });

  state.civicData = data;

  // get a users members
  const getPartialOffices = () => {
    let {
      officialIndices: [lastOfficeIdx],
    } = state.civicData.offices.find((office) =>
      office.name.includes('Governor of')
    );

    const adjustedIdx = (lastOfficeIdx += 1);
    const partialOffices = state.civicData.officials.slice(0, adjustedIdx);

    return partialOffices;
  };

  state.partialOffices = getPartialOffices();

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
      picture.value.query.pages[0].original;
  }
</script>

<style scoped>
  h1 {
    font-size: 5rem;
    font-weight: 300;
  }
</style>
