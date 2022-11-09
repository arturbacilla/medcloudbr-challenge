const parseResult = (result) => {
  try {
    const parsed = {
      ...result,
      body: JSON.parse(result.body),
    };
    return parsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return error;
  }
};

export default parseResult;
