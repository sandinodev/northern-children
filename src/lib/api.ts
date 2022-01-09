import { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { print } from "graphql/language/printer";
import { isObject, isString } from "lodash";
import { PreviewData } from "next";

const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL!, {
  headers: {
    authorization: `Bearer ${process.env.API_TOKEN}`,
  },
});

export const fetchData = async <R = Record<string, unknown>>(
  query: DocumentNode | string,
  vars?: Record<string, unknown>,
  previewData?: PreviewData
): Promise<R> => {
  const queryString = isString(query) ? query : print(query);
  const token = isString(previewData)
    ? previewData
    : isObject(previewData)
    ? (previewData as { previewToken: string }).previewToken
    : "";

  const url = `${process.env.NEXT_PUBLIC_API_URL!}${token ? `?token=${token}` : ""}`;

  // @ts-expect-error
  graphQLClient.url = url;

  try {
    const data = await graphQLClient.request<R>(queryString, vars);
    return data;
  } catch (e) {
    console.error(e);
    return {} as R;
  }
};
