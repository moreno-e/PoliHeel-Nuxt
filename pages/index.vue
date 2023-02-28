<template>
  <div>
    <h1 class="text-center">
      Welcome to PoliHeel
    </h1>
    <img :src="imgs[0].source" alt="hi">
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    const { data } = await useFetch('/api/googlecivic');
    const civicData = ref(data);

    const getPartialOffices = () => {
      let { officialIndices: [lastOfficeIdx] } =
        civicData.value.offices.find(office => office.name.includes('Governor of'));

      const adjustedIdx = lastOfficeIdx += 1;
      const partialOffices = civicData.value.officials.slice(0, adjustedIdx);

      return partialOffices;
    };

    const partialOffices = getPartialOffices();

    const getWikiNameParams = () => {
      const srcs = partialOffices.map((office) => {
        const wikiURL = office.urls[1];
        const wikiName = wikiURL.slice(30);

        return wikiName;
      });

      return srcs;
    };

    const nameParams = getWikiNameParams();
    const promises = [];

    for (const name of nameParams) {
      const uri = `https://en.wikipedia.org/w/api.php?action=query&format=json&formatversion=2&prop=pageimages|pageterms&piprop=original&titles=${name}`;

      promises.push(useFetch(uri));
    }

    const responses = await Promise.all(promises);
    const imgs = [];

    for (const response of responses) {
      const { data } = response;
      const picture = ref(data);

      imgs.push(picture.value.query.pages[0].original);
    }

</script>

<style scoped>
h1 {
    font-size: 5rem;
    font-weight: 300;
}
</style>
