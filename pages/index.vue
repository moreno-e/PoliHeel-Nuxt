<template>
  <div>
    <h1 class="text-center">
      Welcome to PoliHeel
    </h1>
    <p class="text-xl text-center mt-6 mb-6">
      Below contains your current executive and legislative members. Along with your state governor
    </p>
    <members-display :partial-offices="partialOffices" />
  </div>
</template>

<script setup>
    const { data: civicData } = await useFetch('/api/googlecivic');
    const civicDataRef = ref(civicData);

    // get a users members
    const getPartialOffices = () => {
      let { officialIndices: [lastOfficeIdx] } =
        civicDataRef.value.offices.find(office => office.name.includes('Governor of'));

      const adjustedIdx = lastOfficeIdx += 1;
      const partialOffices = civicDataRef.value.officials.slice(0, adjustedIdx);

      return partialOffices;
    };

    const partialOffices = getPartialOffices();

    // slice the members names to pass to wiki api for their image
    const getWikiNameParams = () => {
      const params = partialOffices.map((office) => {
        const wikiURL = office.urls[1];
        const wikiName = wikiURL.slice(30);

        return wikiName;
      });

      return params;
    };

    // fetch current member images
    const nameParams = getWikiNameParams();
    const promises = [];

    for (const name of nameParams) {
      const uri = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${name}`;

      promises.push(useFetch(uri));
    }

    const responses = await Promise.all(promises);

    for (const [index, response] of responses.entries()) {
      const { data } = response;
      const picture = ref(data);

      partialOffices[index].portrait = picture.value.query.pages[0].original;
    }
</script>

<style scoped>
h1 {
    font-size: 5rem;
    font-weight: 300;
}
</style>
