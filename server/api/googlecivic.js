/* eslint-disable no-undef */
export default defineEventHandler(async () => {
    const { googleCivicKey } = useRuntimeConfig();
    const uri = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=27514&key=${googleCivicKey}`;
    const { offices, officials } = await $fetch(uri);

    let { officialIndices: [lastOfficeIdx] } =
        offices.find(office => office.name.includes('Governor of'));

    const adjustedIdx = lastOfficeIdx += 1;
    const partialOffices = officials.slice(0, adjustedIdx);

    // returning only a portion of the offices for the home page
    return partialOffices;
});
