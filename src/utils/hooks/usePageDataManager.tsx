import { BasePage } from "@/app/types";
import { DeepKeys, DeepValue } from "@/types/deep-object";
import { useState } from "react";
import useUpdatePage from "./useUpdatePage";
import { getDeepValue } from "../get-deep-value";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const usePageDataManager = <PageProps extends BasePage<any>>(
  data: PageProps,
) => {
  const [pageData, setPageData] = useState<PageProps>(data);

  const { isSaving, updatePage } = useUpdatePage<PageProps>(data.slug);

  const handleSave = async () => {
    await updatePage(pageData);
  };

  const getData = <T,>(key?: DeepKeys<PageProps>) => {
    if (!key) return undefined;
    return getDeepValue(pageData, key) as T;
  };

  const handleChange = <K extends DeepKeys<PageProps>>(
    field: K,
    value: DeepValue<PageProps, K>,
  ) => {
    setPageData((prev) => {
      const clone = structuredClone(prev) as PageProps;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const keys = field.split(".") as (keyof any)[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let target: any = clone;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      return clone;
    });
  };
  return {
    pageData,
    isSaving,
    getData,
    handleChange,
    handleSave,
  };
};

export default usePageDataManager;
