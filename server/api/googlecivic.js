export default defineEventHandler(async (event) => {
  const { googleCivicKey } = useRuntimeConfig();
  const { zip } = getQuery(event);

  const uri = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${zip}&key=${googleCivicKey}`;
  const response = await $fetch(uri);

  return response;
});
