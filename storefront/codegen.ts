import { config as loadEnv } from "dotenv";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnv({ path: ".env.local" });

const config: CodegenConfig = {
  overwrite: true,
  schema:
    process.env.NEXT_PUBLIC_SALEOR_API_URL ?? "https://demo.saleor.io/graphql/",
  documents: ["graphql/**/*.graphql"],
  generates: {
    "lib/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
