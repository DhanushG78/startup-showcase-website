import Contentstack from "contentstack";

// All credentials are loaded from .env.local — never hard-coded here.
const apiKey = process.env.CONTENTSTACK_API_KEY;
const deliveryToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
const environment = process.env.CONTENTSTACK_ENVIRONMENT ?? "development";

/** Stub that returns empty results when credentials are missing (e.g. CI or preview). */
function createQueryStub(): any {
  return {
    includeReference: () => createQueryStub(),
    where: () => createQueryStub(),
    toJSON: () => createQueryStub(),
    find: async () => [[], []],
  };
}

const Stack =
  apiKey && deliveryToken
    ? Contentstack.Stack({ api_key: apiKey, delivery_token: deliveryToken, environment })
    : { ContentType: () => ({ Query: createQueryStub }) };

export default Stack;
