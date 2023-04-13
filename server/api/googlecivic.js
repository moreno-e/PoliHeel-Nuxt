export default defineEventHandler(async () => {
  const { googleCivicKey } = useRuntimeConfig();
  const uri = `https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=27514&key=${googleCivicKey}`;
  const response = await $fetch(uri);

  return response;
});
