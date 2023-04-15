export default defineEventHandler(async () => {
  const { ipStackKey } = useRuntimeConfig();
  const uri = `http://api.ipstack.com/check?access_key=${ipStackKey}`;
  const response = await $fetch(uri);

  return response;
});
